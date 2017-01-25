import React from 'react';
import { Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { updateRow, fetchIssue } from '../actions';

class UpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issue: this.props.issue
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateRow = this.handleUpdateRow.bind(this);
  }
  componentWillMount() {
    this.props.fetchIssue(this.props.params.id);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      issue: nextProps.issue
    });
  }
  handleChange(e) {
    const changeIssue = this.state.issue;
    changeIssue[e.target.name] = e.target.value;
    this.setState({ issue: changeIssue });
  }
  handleUpdateRow() {
    const issue = {
      seq: this.state.issue.seq,
      status: this.statusInput.value,
      category: this.categoryInput.value,
      title: this.titleInput.value,
      owner: this.ownerInput.value,
      priority: this.priorityInput.value,
      isUpdate: true
    };
    this.props.updateRow(issue);
  }
  render() {
    return (
      <div className='container' style={{ border: '2px solid', 'text-align': 'center' }}>
        <h2>Update Issue</h2>
        <form>
          seq: {this.state.issue.seq}<br /><br />
          Status: <input type='text' name='status' value={this.state.issue.status} ref={input => this.statusInput = input} onChange={this.handleChange} /><br /><br />
          Category: <input type='text' name='category' value={this.state.issue.category} ref={input => this.categoryInput = input} onChange={this.handleChange} /><br /><br />
          Title: <input type='text' name='title' value={this.state.issue.title} ref={input => this.titleInput = input} onChange={this.handleChange} /><br /><br />
          Owner: <input type='text' name='owner' value={this.state.issue.owner} ref={input => this.ownerInput = input} onChange={this.handleChange} /><br /><br />
          Priority: <input type='text' name='priority' value={this.state.issue.priority} ref={input => this.priorityInput = input} onChange={this.handleChange} /><br /><br />
          <Link to='/'><Button>Cancel</Button></Link>
          <Link to='/'><Button onClick={this.handleUpdateRow}>Save</Button></Link><br /><br />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  issue: state.issue
});

const mapDispatchToProps = dispatch => ({
  updateRow: bindActionCreators(updateRow, dispatch),
  fetchIssue: bindActionCreators(fetchIssue, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateForm);

UpdateForm.propTypes = {
  issue: React.PropTypes.shape({
    seq: React.PropTypes.number,
    status: React.PropTypes.string,
    category: React.PropTypes.string,
    title: React.PropTypes.string,
    owner: React.PropTypes.string,
    priority: React.PropTypes.string,
    onDropRow: React.PropTypes.func
  }),
  updateRow: React.PropTypes.func,
  fetchIssue: React.PropTypes.func,
  params: React.PropTypes.shape({
    id: React.PropTypes.string
  })
};
