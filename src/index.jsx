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
      title: 'New Issue'
    };
    this.handleDropRow = this.handleDropRow.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  handleShowModal(title, issue) {
    this.setState({ title, showModal: true });
  }
  handleCloseModal() {
    this.setState({ showModal: false });
  }
  handleDropRow(seq) {
    const issues = this.state.issues.filter(issue => issue.seq !== seq);
    this.setState({ issues });
  }
  render() {
    return (
      <div>
        <Button onClick={() => this.handleShowModal('New Issue', {})}>New</Button>
        <TrackingTable issues={this.state.issues} showModal={this.handleShowModal} onDropRow={this.handleDropRow} />
        <ModalDialog show={this.state.showModal} onHide={this.handleCloseModal} title={this.state.title} issues={this.state.issues}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
