interface RpcRequestBody {
  id: string;
  jsonrpc: string;
  method: string;
  params?: any;
}
interface RpcResponseBody {
  id: string;
  jsonrpc: string;
  result: any;
}

describe('Block Page', () => {
  const middlewareUrl = Cypress.env('MIDDLEWARE_URL') as string;

  it('can visit at /block/:blockHeight?type=height', () => {
    const blockHeight = 1;
    cy.intercept('POST', `${middlewareUrl}/rpc`, req => {
      const body = req.body as RpcRequestBody;
      if (
        body.method === 'chain_get_block' &&
        body.params &&
        body.params.block_identifier
      ) {
        req.alias = 'blockFetch';
      }
    });

    cy.visit(`/block/${blockHeight}?type=height`);

    cy.wait('@blockFetch').its('response.statusCode').should('equal', 200);

    cy.wait('@blockFetch').then(interception => {
      const { result } = interception.response.body as RpcResponseBody;
      const blockHash = result.block.hash as string;
      const truncatedBlockHash = `${blockHash.slice(0, 5)}...${blockHash.slice(
        -5,
      )}`;
      cy.contains(truncatedBlockHash).should('be.visible');
    });
  });
});
