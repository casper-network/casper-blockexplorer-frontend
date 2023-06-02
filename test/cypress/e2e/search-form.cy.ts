import reactSelectSelectors from '../fixtures/react-select-selectors.json';
import { searchFormTestData } from './test-data/search-form-test-data';

const {
  publicKey,
  deployHash,
  blockHash,
  blockHeight,
  hashContainingSpaces,
  hashContainingNonHexadecimalCharacters,
  hashContainingTooManyCharacters,
} = searchFormTestData();

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
        .type(publicKey)
        .getByData('submit-button')
        .click()
        .location('pathname')
        .should('eq', `/account/${publicKey}`);
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

    it('renders an error message if invalid block hash is submitted while Block Hash is selected', () => {
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

    it('renders an error message if invalid block height is submitted while Block Height is selected', () => {
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

    it('renders an error message if hash contains spaces', () => {
      cy.getByData('search-input')
        .type(hashContainingSpaces)
        .getByData('submit-button')
        .click()
        .getByData('search-form-error-message')
        .should('contain', 'Please enter a valid public key');
    });

    it('renders an error message if hash contains non hexadecimal characters', () => {
      cy.getByData('search-input')
        .type(hashContainingNonHexadecimalCharacters)
        .getByData('submit-button')
        .click()
        .getByData('search-form-error-message')
        .should('contain', 'Please enter a valid public key');
    });

    it('renders an error message if hash contains spaces', () => {
      cy.getByData('search-input')
        .type(hashContainingTooManyCharacters)
        .getByData('submit-button')
        .click()
        .getByData('search-form-error-message')
        .should('contain', 'Please enter a valid public key');
    });
  });
});
