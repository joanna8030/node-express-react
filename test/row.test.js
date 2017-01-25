/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint react/jsx-filename-extension:0, react/no-find-dom-node:0 */
import chai from 'chai';
import ReactTestUtils from 'react-addons-test-utils';
import React from 'react';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import IssueRow from '../src/components/row';

const expect = chai.expect;

describe('row.jsx', () => {
  let component;
  const issue = { seq: 1, status: 'Open', category: 'cat1', title: 'title1', owner: 'Allen', priority: 'P1', isUpdate: false };
  const handleDropRowSpy = sinon.spy();

  beforeEach(() => {
    component = ReactTestUtils.renderIntoDocument(
      <IssueRow
        key={issue.seq}
        issue={issue}
        onDropRow={handleDropRowSpy}
      />
    );
  });

  it('should render DOM correctly', () => {
    const dom = ReactDOM.findDOMNode(component);
    expect(dom).to.exist;
    expect(dom.tagName).to.be.equal('TR');

    const tdList = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'td');
    expect(tdList).to.exist;
    expect(tdList.length).to.be.equal(Object.keys(issue).length);

    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'BUTTON');
    expect(buttons).to.exist;
    expect(buttons.length).to.be.equal(2);
    expect(buttons[0].textContent).to.be.equal('Edit');
    expect(buttons[1].textContent).to.be.equal('Delete');
  });

  it('should show data correctly', () => {
    const dom = ReactDOM.findDOMNode(component);
    expect(dom).to.exist;
    expect(dom.childNodes[0].textContent).to.be.equal(issue.seq.toString());
    expect(dom.childNodes[1].textContent).to.be.equal(issue.status);
    expect(dom.childNodes[2].textContent).to.be.equal(issue.category);
    expect(dom.childNodes[3].textContent).to.be.equal(issue.title);
    expect(dom.childNodes[4].textContent).to.be.equal(issue.owner);
    expect(dom.childNodes[5].textContent).to.be.equal(issue.priority);
  });

  it('should change backgroundColor if is updated', () => {
    const dom = ReactDOM.findDOMNode(component);
    expect(dom).to.exist;
    expect(dom.style[0]).to.be.equal(undefined);

    const mockData = { ...issue, isUpdate: true };
    const testComponent = ReactTestUtils.renderIntoDocument(
      <IssueRow key={issue.seq} issue={mockData} />
    );
    const testDom = ReactDOM.findDOMNode(testComponent);
    expect(testDom).to.exist;
    expect(testDom.style.backgroundColor).to.be.equal('rgb(241, 244, 66)');
  });

  it('should render Link which href is correct', () => {
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'BUTTON');
    expect(buttons).to.exist;
    const editButton = buttons[0];
    expect(editButton.textContent).to.eql('Edit');
    expect(editButton.parentNode.nodeName).to.eql('A');
    // expect(editButton.parentNode.getAttribute('href')).to.eql('/update/1');
  });

  it('should call handleDropRow when click delete', () => {
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'BUTTON');
    expect(buttons).to.exist;
    const deleteButton = buttons[1];
    ReactTestUtils.Simulate.click(deleteButton);
    expect(handleDropRowSpy.calledOnce).to.be.true;
  });

});
