import express from "express";
import { param, query } from "express-validator";

import { SIDECAR_REST_URL } from "../config";
import { validate } from "../middlewares";
import { ExtendedSidecar } from "../services";
import { DeployProcessedEnum } from "../services/sidecar";
import { Sort } from "../types";
import { catchAsync, isValidHash, isValidPublicKey } from "../utils";

const router = express.Router();
const sidecar = new ExtendedSidecar(SIDECAR_REST_URL);

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
    const latestBlock = await sidecar.getTheLatestBlock();
    res.json(latestBlock);
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
    const block = await sidecar.getBlock(hashOrHeight);
    res.json(block);
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

    const result = await sidecar.getBlocks(from, count, orderByHeight);

    res.json(result);
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
    const deploy = await sidecar.getDeploy(hash);
    res.json(deploy);
  })
);

/**
 * @openapi
 * /deploy/{type}/{hash}:
 *  get:
 *    description: Returns deploy by hash
 *    responses:
 *      200:
 *        description: Returns `Deploy` object.
 *      404:
 *        description: Not found deploy
 *  parameters:
 *  - name: type
 *    in: path
 *    required: true
 *    description: deploy type
 *  - name: hash
 *    in: path
 *    required: true
 *    description: deploy hash
 */
router.get(
  "/deploy/:type/:hash",
  validate([
    param("type")
      .exists()
      .custom((type: string) => type.match(/^(accepted|processed|expired)$/))
      .withMessage(
        "Invalid type possible values are accepted, processed, expired"
      ),
    param("hash")
      .exists()
      .custom((hash: string) => isValidHash(hash))
      .withMessage("Invalid hash"),
  ]),
  catchAsync(async (req, res) => {
    const { hash, type } = req.params;
    const deploy = await sidecar.getDeploy(hash, type as DeployProcessedEnum);
    res.json(deploy);
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

export default router;
