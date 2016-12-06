import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import TrackingTable from './table';
import issues from './constant';
import ModalDialog from './modal';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: issues,
      showModal: false,
      title: 'New Issue',
      issue: {}
    };
    this.handleDropRow = this.handleDropRow.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAddRow = this.handleAddRow.bind(this);
    this.handleUpdateRow = this.handleUpdateRow.bind(this);
  }
  handleShowModal(title, issue) {
    this.setState({ showModal: true, title, issue });
  }
  handleCloseModal() {
    console.log(this.state.issues)
    this.setState({ showModal: false });
  }
  handleDropRow(seq) {
    const issues = this.state.issues.filter(issue => issue.seq !== seq);
    this.setState({ issues });
  }
  handleAddRow(issue) {
    const issues = this.state.issues;
    issues.push(issue);
    this.setState({ issues });
  }
  handleUpdateRow(updateIssue) {
    const issues = this.state.issues.map((issue) => {
      let _issue = issue;
      if (_issue.seq === updateIssue.seq) {
        _issue = updateIssue;
      }
      return _issue;
    });
    this.setState({ issues });
  }
  render() {
    return (
      <div>
        <Button onClick={() => this.handleShowModal('New Issue', {})}>New</Button>
        <TrackingTable issues={this.state.issues} showModal={this.handleShowModal} onDropRow={this.handleDropRow} />
        <ModalDialog
          show={this.state.showModal}
          onHide={this.handleCloseModal}
          title={this.state.title}
          issues={this.state.issues}
          issue={this.state.issue}
          onAddRow={this.handleAddRow}
          onUpdateRow={this.handleUpdateRow}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
