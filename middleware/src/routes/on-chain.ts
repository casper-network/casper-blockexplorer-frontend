import { CasperServiceByJsonRPC } from "casper-js-sdk";
import express from "express";
import { param, query } from "express-validator";
import { StatusCodes } from "http-status-codes";

import { PORT, SIDECAR_IS_RUNNING, SIDECAR_REST_URL } from "../config";
import { validate } from "../middlewares";
import { ExtendedSidecar, RpcClient } from "../services";
import { Sort } from "../types";
import { GetDeploy } from "../types/on-chain";
import { ApiError, catchAsync, isValidHash, isValidPublicKey } from "../utils";

const router = express.Router();
const sidecar = new ExtendedSidecar(SIDECAR_REST_URL || "");

// Using our stable node
const jsonRpc = new CasperServiceByJsonRPC(`http://localhost:${PORT}/rpc`);
const rpcClient = new RpcClient(jsonRpc);

/**
 * @openapi
 * /status:
 *  get:
 *    description: Returns the node status.
 *    responses:
 *      200:
 *        description: Returns status of node
 */
router.get(
  "/status",
  catchAsync(async (req, res) => {
    const { peers: _, ...rest } = await rpcClient.getStatus();
    res.json(rest);
  })
);

/**
 * @openapi
 * /latest-block:
 *  get:
 *    description: Returns the latest generated block.
 *    responses:
 *      200:
 *        description: Returns `Block` object.
 */
router.get(
  "/latest-block",
  catchAsync(async (req, res) => {
    if (SIDECAR_IS_RUNNING) {
      const latestBlock = await sidecar.getLatestBlock();
      res.json(latestBlock);
    } else {
      const latestBlock = await rpcClient.getLatestBlock();
      res.json(latestBlock);
    }
  })
);

/**
 * @openapi
 * /block/{hashOrHeight}:
 *  get:
 *    description: Returns block by height or hash
 *    responses:
 *      200:
 *        description: Returns `Block` object.
 *      404:
 *        description: Not found block
 *  parameters:
 *  - name: hashOrHeight
 *    in: path
 *    required: true
 *    description: block hash or height
 */
router.get(
  "/block/:hashOrHeight",
  validate([
    param("hashOrHeight")
      .exists()
      .custom(
        (hashOrHeight: string) =>
          /^\d+$/.test(hashOrHeight) || isValidHash(hashOrHeight)
      ),
  ]),
  catchAsync(async (req, res) => {
    const { hashOrHeight } = req.params;
    if (SIDECAR_IS_RUNNING) {
      const block = await sidecar.getBlock(hashOrHeight);
      res.json(block);
    } else {
      if (/^\d+$/.test(hashOrHeight)) {
        const block = await rpcClient.getBlockByHeight(parseInt(hashOrHeight));
        res.json(block);
      } else {
        const block = await rpcClient.getBlock(hashOrHeight);
        res.json(block);
      }
    }
  })
);

/**
 * @openapi
 * /blocks:
 *    get:
 *      description: Returns blocks
 *      responses:
 *        200:
 *          description: Returns blocks and total block count.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  blocks:
 *                    type: array
 *                    items:
 *                      schema:
 *                      type: object
 *                  count:
 *                    type: integer
 *    parameters:
 *    - name: from
 *      in: query
 *      description: start block height to fetch
 *    - name: count
 *      in: query
 *      description: block count to fetch
 *    - name: sort_by
 *      in: query
 *      description: sort parameter, currently support only `height`
 *    - name: order_by
 *      in: query
 *      description: order parameter, possible values:`asc`, `desc`.
 */
router.get(
  "/blocks",
  validate([
    query("from").optional().isInt().toInt().withMessage("Invalid number"),
    query("count")
      .optional()
      .isInt()
      .toInt()
      .default(10)
      .withMessage("Invalid number"),
    query("sort_by").optional().isString(),
    query("order_by")
      .optional()
      .isString()
      .toUpperCase()
      .isIn(["ASC", "DESC"])
      .withMessage("Invalid order,possible asc,desc"),
  ]),
  catchAsync(async (req, res) => {
    const { from, count, sort_by, order_by } = req.query as unknown as {
      from?: number;
      count: number;
      sort_by?: string;
      order_by?: Sort;
    };

    const orderByHeight =
      sort_by && sort_by === "height" ? order_by : undefined;
    if (SIDECAR_IS_RUNNING) {
      const result = await sidecar.getBlocks(from, count, orderByHeight);
      res.json(result);
    } else {
      const result = await rpcClient.getBlocks(from, count, orderByHeight);
      res.json(result);
    }
  })
);

/**
 * @openapi
 * /deploy/{hash}:
 *  get:
 *    description: Returns deploy by hash
 *    responses:
 *      200:
 *        description: Returns `Deploy` object.
 *      404:
 *        description: Not found deploy
 *  parameters:
 *  - name: hash
 *    in: path
 *    required: true
 *    description: deploy hash
 */
router.get(
  "/deploy/:hash",
  validate([
    param("hash")
      .exists()
      .custom((hash: string) => isValidHash(hash))
      .withMessage("Invalid hash"),
  ]),
  catchAsync(async (req, res) => {
    const { hash } = req.params;
    if (SIDECAR_IS_RUNNING) {
      const deploy = (await sidecar.getDeploy(hash)) as GetDeploy;

      if (!deploy.deploy_accepted)
        throw new ApiError(StatusCodes.NOT_FOUND, "Not found deploy");

      const execution_results = deploy.deploy_processed
        ? [
            {
              block_hash: deploy.deploy_processed.block_hash,
              result: deploy.deploy_processed.execution_result,
            },
          ]
        : [];

      res.json({ ...deploy.deploy_accepted, execution_results });
    } else {
      const deploy = await rpcClient.getDeploy(hash);
      res.json(deploy);
    }
  })
);

/**
 * @openapi
 * /account/{accountHashOrPublicKey}:
 *  get:
 *    description: Returns account by account hash or public key
 *    responses:
 *      200:
 *        description: Returns `Account` object.
 *      404:
 *        description: Not found account
 *  parameters:
 *  - name: accountHashOrPublicKey
 *    in: path
 *    required: true
 *    description: account hash or public key
 */
router.get(
  "/account/:accountHashOrPublicKey",
  validate([
    param("accountHashOrPublicKey")
      .exists()
      .custom(
        (accountHashOrPublicKey: string) =>
          isValidPublicKey(accountHashOrPublicKey) ||
          isValidHash(accountHashOrPublicKey)
      )
      .withMessage("Invalid hash/public key"),
  ]),
  catchAsync(async (req, res) => {
    const { accountHashOrPublicKey } = req.params;

    const account = await rpcClient.getAccount(accountHashOrPublicKey);
    res.json(account);
  })
);

/**
 * @openapi
 * /faults/{publicKey}:
 *  get:
 *    description: Returns faults by validator's public key
 *    responses:
 *      200:
 *        description: Returns faults
 *  parameters:
 *  - name: publicKey
 *    in: path
 *    required: true
 *    description: validator's public key
 */
router.get(
  "/faults/:publicKey",
  validate([
    param("publicKey")
      .exists()
      .custom((publicKey: string) => isValidPublicKey(publicKey))
      .withMessage("Invalid public key"),
  ]),
  catchAsync(async (req, res) => {
    const { publicKey } = req.params;
    const faults = await sidecar.getFaultsByPublicKey(publicKey);
    res.json(faults);
  })
);

/**
 * @openapi
 * /signatures/{hash}:
 *  get:
 *    description: Returns finality signatures in given block by hash
 *    responses:
 *      200:
 *        description: Returns `Block` object.
 *      404:
 *        description: Not found block
 *  parameters:
 *  - name: hash
 *    in: path
 *    required: true
 *    description: block hash
 */
router.get(
  "/signatures/:hash",
  validate([
    param("hash")
      .exists()
      .custom((hash: string) => isValidHash(hash))
      .withMessage("Invalid hash"),
  ]),
  catchAsync(async (req, res) => {
    const { hash } = req.params;
    const signatures = await sidecar.getFinalitySignaturesByBlock(hash);
    res.json(signatures);
  })
);

/**
 * @openapi
 * /step/{eraId}:
 *  get:
 *    description: Returns step event emitted at the end of an era
 *    responses:
 *      200:
 *        description: Returns step event
 *  parameters:
 *  - name: eraId
 *    in: path
 *    required: true
 *    description: era id
 */
router.get(
  "/step/:eraId",
  validate([
    param("eraId")
      .exists()
      .custom((eraId: string) => /^\d+$/.test(eraId))
      .withMessage("Invalid era id"),
  ]),
  catchAsync(async (req, res) => {
    const { eraId } = req.params;
    const signatures = await sidecar.getStepByEra(eraId);
    res.json(signatures);
  })
);

router.get(
  "/validators",
  catchAsync(async (req, res) => {
    const validators = await rpcClient.getValidators();
    res.json({ validators });
  })
);

export default router;
