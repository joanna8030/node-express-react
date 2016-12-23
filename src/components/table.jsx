import React from 'react';
import { Table, tbody } from 'react-bootstrap';
import IssueRow from './row';

export default class TrackingTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleDropRow = this.handleDropRow.bind(this);
    this.showModal = this.showModal.bind(this);
  }
  showModal(title, seq) {
    this.props.showModal(title, seq);
  }
  handleDropRow(seq) {
    this.props.onDropRow(seq);
  }
  render() {
    var issues;
    if (this.props.issues) {
      issues = this.props.issues.map(issue => (
        <IssueRow
          key={issue.seq}
          issue={issue}
          showModal={this.showModal}
          onDropRow={this.handleDropRow}
        />
      ));
    }
    return (
      <Table responsive striped bordered condensed hover>
        <thead>
          <tr>
            <th>seq</th>
            <th>Status</th>
            <th>Category</th>
            <th>Title</th>
            <th>Owner</th>
            <th>Priority</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {issues}
        </tbody>
      </Table>
    );
  }
}

TrackingTable.propTypes = {
  issues: React.PropTypes.arrayOf(React.PropTypes.object),
  onDropRow: React.PropTypes.func,
  showModal: React.PropTypes.func
};
