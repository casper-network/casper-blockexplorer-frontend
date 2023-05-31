// eslint-disable-next-line import/extensions
import reactSelectSelectors from '../fixtures/react-select-selectors.json';

const accountHash =
  '018f84c6fc037284f189cc8cb49f89212ff434a5eb050e48cdd164ff3890fbff69';
const blockHash =
  'a03e3221106479c257c8c5e6cde1e279bb9e28e70c38ca2593cb3a7806e2090a';
const deployHash =
  '7e2cad6ae20875b6a3ffcbb4e743ab5e0fc0f8b5ecc444e222f0204a7ee9120f';
const blockHeight = '1774040';
const hashContainingSpaces =
  'a 3e 3221106479c257c8c5e6cde1e279bb9e28e70c38ca2593cb3a7806e2090a';
const hashContainingWrongCharacters =
  '%&18f84c6fc037284f189cc8cb49f89212ff434a5eb050e48cdd164ff3890fbff69';
const hashContainingTooManyCharacters =
  '018f84c6fc037284f189cc8cb49f89212ff434a5eb050e48cdd164ff3890fbff69ff3890fbff69';

describe('Search Form', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('Select menu', () => {
    it('should open the menu on click and display options', () => {
      cy.getByData('custom-select')
        .contains('Account')
        .find(reactSelectSelectors.menu)
        .should('not.exist')
        .getByData('custom-select')
        .find(reactSelectSelectors.indicatorDropdown)
        .should('be.visible')
        .click()
        .getByData('custom-select')
        .find(reactSelectSelectors.menu)
        .should('exist')
        .should('be.visible')
        .should('contain', 'Deploy')
        .should('contain', 'Block Hash')
        .should('contain', 'Block Height');
    });

    it('should close the menu after selecting an option', () => {
      cy.getByData('custom-select')
        .find(reactSelectSelectors.indicatorDropdown)
        .click()
        .getByData('custom-select')
        .find(reactSelectSelectors.menu)
        .should('contain', 'Deploy')
        .contains('Deploy')
        .click()
        .getByData('custom-select')
        .find(reactSelectSelectors.singleValue)
        .should('contain', 'Deploy')
        .getByData('custom-select')
        .find(reactSelectSelectors.menu)
        .should('not.exist');
    });
  });

  context('Search-Form submission ', () => {
    it('allows users to navigate to /account/:id using a public key', () => {
      cy.getByData('custom-select')
        .should('contain', 'Account')
        .getByData('search-input')
        .type(accountHash)
        .getByData('submit-button')
        .click()
        .location('pathname')
        .should('eq', `/account/${accountHash}`);
    });

    it('allows users to navigate to /deploy/:id using a deploy hash', () => {
      cy.getByData('custom-select')
        .find(reactSelectSelectors.indicatorDropdown)
        .click()
        .getByData('custom-select')
        .find(reactSelectSelectors.menu)
        .should('contain', 'Deploy')
        .contains('Deploy')
        .click()
        .getByData('search-input')
        .type(deployHash)
        .getByData('submit-button')
        .click()
        .location('pathname')
        .should('eq', `/deploy/${deployHash}`);
    });

    it('allows users to navigate to /block/:id using a block hash', () => {
      cy.getByData('custom-select')
        .find(reactSelectSelectors.indicatorDropdown)
        .click()
        .getByData('custom-select')
        .find(reactSelectSelectors.menu)
        .should('contain', 'Block Hash')
        .contains('Block Hash')
        .click()
        .getByData('search-input')
        .type(blockHash)
        .getByData('submit-button')
        .click()
        .location('pathname')
        .should('eq', `/block/${blockHash}`);
    });

    it('allows users to navigate to /block/:id using a block height', () => {
      cy.getByData('custom-select')
        .find(reactSelectSelectors.indicatorDropdown)
        .click()
        .getByData('custom-select')
        .find(reactSelectSelectors.menu)
        .should('contain', 'Block Height')
        .contains('Block Height')
        .click()
        .getByData('search-input')
        .type(blockHeight)
        .getByData('submit-button')
        .click()
        .location('pathname')
        .should('eq', `/block/${blockHeight}`);
    });
  });

  context('Error Messages', () => {
    it('renders an error message if invalid public key is submitted while Account is selected', () => {
      cy.getByData('custom-select')
        .should('contain', 'Account')
        .getByData('search-input')
        .type(blockHash)
        .getByData('submit-button')
        .click()
        .getByData('search-form-error-message')
        .contains('Please enter a valid public key');
    });

    it('renders an error message if invalid deploy hash is submitted while Deploy is selected', () => {
      cy.getByData('custom-select')
        .find(reactSelectSelectors.indicatorDropdown)
        .click()
        .getByData('custom-select')
        .find(reactSelectSelectors.menu)
        .should('contain', 'Deploy')
        .contains('Deploy')
        .click()
        .getByData('search-input')
        .type(blockHash)
        .getByData('submit-button')
        .click()
        .getByData('error-content')
        .should('contain', 'Request failed with status code 500');
    });

    it('renders an error message if invalid deploy hash is submitted while Block Hash is selected', () => {
      cy.getByData('custom-select')
        .find(reactSelectSelectors.indicatorDropdown)
        .click()
        .getByData('custom-select')
        .find(reactSelectSelectors.menu)
        .should('contain', 'Block Hash')
        .contains('Block Hash')
        .click()
        .getByData('search-input')
        .type(deployHash)
        .getByData('submit-button')
        .click()
        .getByData('error-content')
        .should('contain', 'Request failed with status code 500');
    });

    it.only('renders an error message if invalid block height is submitted while Block Height is selected', () => {
      cy.getByData('custom-select')
        .find(reactSelectSelectors.indicatorDropdown)
        .click()
        .getByData('custom-select')
        .find(reactSelectSelectors.menu)
        .should('contain', 'Block Height')
        .contains('Block Height')
        .click()
        .getByData('search-input')
        .type(blockHash)
        .getByData('submit-button')
        .click()
        .getByData('search-form-error-message')
        .contains('Please enter a valid block height');
    });

    it('renders an error message if hash contains spaces, is too long, or contains characters other than numbers and letters ', () => {
      cy.getByData('search-input')
        .type(blockHash)
        .getByData('submit-button')
        .click()
        .getByData('search-input')
        .type(hashContainingSpaces)
        .getByData('submit-button')
        .click()
        .getByData('search-input')
        .type(hashContainingSpaces)
        .getByData('submit-button')
        .click()
        .getByData('search-input')
        .type(hashContainingTooManyCharacters)
        .getByData('submit-button')
        .click()
        .getByData('search-input')
        .type(hashContainingWrongCharacters)
        .getByData('submit-button')
        .click()
        .getByData('search-form-error-message')
        .should('exist');
    });
  });
});
