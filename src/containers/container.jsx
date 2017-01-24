import React from 'react';
import { Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TrackingTable from '../components/table';
import ModalDialog from '../components/modal';
import * as actions from '../actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleShowNewModal = this.handleShowNewModal.bind(this);
  }
  componentDidMount() {
    this.props.actions.fetchData();
  }
  handleShowNewModal() {
    this.props.actions.handleShowModal('New Issue', {});
  }
  render() {
    return (
      <div>
        <Button onClick={() => this.handleShowNewModal()}>New</Button>
        <div style={{ color: 'red' }}>{this.props.errorMsg}</div>
        <TrackingTable issues={this.props.issues} showModal={this.props.actions.handleShowModal} onDropRow={this.props.actions.dropRow} />
        <ModalDialog
          show={this.props.showModal}
          onHide={this.props.actions.handleCloseModal}
          title={this.props.title}
          issue={this.props.issue}
          onAddRow={this.props.actions.addRow}
          onUpdateRow={this.props.actions.updateRow}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  issues: state.operation.issues,
  title: state.modalControl.title,
  issue: state.modalControl.issue,
  showModal: state.modalControl.showModal,
  errorMsg: state.errorHandler
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  issues: React.PropTypes.arrayOf(React.PropTypes.object),
  title: React.PropTypes.string,
  showModal: React.PropTypes.bool,
  issue: React.PropTypes.shape({
    seq: React.PropTypes.number,
    status: React.PropTypes.string,
    category: React.PropTypes.string,
    title: React.PropTypes.string,
    owner: React.PropTypes.string,
    priority: React.PropTypes.string,
    isUpdate: React.PropTypes.bool
  }),
  errorMsg: React.PropTypes.string,
  actions: React.PropTypes.shape({
    dropRow: React.PropTypes.func,
    handleShowModal: React.PropTypes.func,
    handleCloseModal: React.PropTypes.func,
    fetchData: React.PropTypes.func,
    addRow: React.PropTypes.func,
    updateRow: React.PropTypes.func
  })
};
