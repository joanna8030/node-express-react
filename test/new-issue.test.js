/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint react/jsx-filename-extension:0, react/no-find-dom-node:0 */
import chai from 'chai';
import ReactTestUtils from 'react-addons-test-utils';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import NewForm from '../src/components/new-issue';

const expect = chai.expect;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('new-issue.jsx', () => {
  let component;
  const store = mockStore({});

  beforeEach(() => {
    component = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <NewForm />
      </Provider>
    );
  });

  it('should render DOM correctly', () => {
    const dom = ReactDOM.findDOMNode(component);
    expect(dom).to.exist;
    expect(dom.tagName).to.be.equal('DIV');
    expect(dom.className).to.eql('container');
    expect(dom.style.border).to.match(/\b2px solid\b/);
    expect(dom.style.textAlign).to.match(/\bcenter\b/);

    const heading = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'H2');
    expect(heading[0]).to.exist;
    expect(heading[0].textContent).to.eql('New Issue');

    const form = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'FORM');
    expect(form).to.exist;

    const inputColumns = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'INPUT');
    expect(inputColumns).to.have.length(5);
    expect(inputColumns[0].value).to.eql('');
    expect(inputColumns[1].value).to.eql('');
    expect(inputColumns[2].value).to.eql('');
    expect(inputColumns[3].value).to.eql('');
    expect(inputColumns[4].value).to.eql('');

    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'BUTTON');
    expect(buttons).to.exist;
    expect(buttons.length).to.be.equal(2);
    expect(buttons[0].textContent).to.be.equal('Cancel');
    expect(buttons[1].textContent).to.be.equal('Save');
  });

});
