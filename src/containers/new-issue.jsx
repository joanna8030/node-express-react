import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { addRow } from '../actions';

class NewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issue: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddRow = this.handleAddRow.bind(this);
  }
  handleChange(e) {
    const changeIssue = this.state.issue;
    changeIssue[e.target.name] = e.target.value;
    this.setState({ issue: changeIssue });
  }
  handleAddRow() {
    const issue = {
      status: this.statusInput.value,
      category: this.categoryInput.value,
      title: this.titleInput.value,
      owner: this.ownerInput.value,
      priority: this.priorityInput.value,
      isUpdate: false
    };
    this.props.addRow(issue);
  }
  render() {
    return (
      <div className='container' style={{ border: '2px solid', textAlign: 'center' }}>
        <h2>New Issue</h2><br />
        <form>
            Status: <input type='text' name='status' value={this.state.issue.status} ref={input => this.statusInput = input} onChange={this.handleChange} /><br /><br />
            Category: <input type='text' name='category' value={this.state.issue.category} ref={input => this.categoryInput = input} onChange={this.handleChange} /><br /><br />
            Title: <input type='text' name='title' value={this.state.issue.title} ref={input => this.titleInput = input} onChange={this.handleChange} /><br /><br />
            Owner: <input type='text' name='owner' value={this.state.issue.owner} ref={input => this.ownerInput = input} onChange={this.handleChange} /><br /><br />
            Priority: <input type='text' name='priority' value={this.state.issue.priority} ref={input => this.priorityInput = input} onChange={this.handleChange} /><br /><br />
          <Link to='/'><Button>Cancel</Button></Link>
          <Link to='/'><Button onClick={this.handleAddRow}>Save</Button></Link><br /><br />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addRow: bindActionCreators(addRow, dispatch)
});

export default connect(null, mapDispatchToProps)(NewForm);

NewForm.propTypes = {
  addRow: React.PropTypes.func
};
