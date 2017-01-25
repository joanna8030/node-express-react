import React from 'react';
import { Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TrackingTable from '../components/table';
import { dropRow, fetchData } from '../actions';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }
  render() {
    return (
      <div>
        <Link to='/new'><Button>New</Button></Link>
        <div style={{ color: 'red' }}>{this.props.errorMsg}</div>
        <TrackingTable issues={this.props.issues} onDropRow={this.props.dropRow} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  issues: state.operation.issues,
  errorMsg: state.errorHandler
});

const mapDispatchToProps = dispatch => ({
  dropRow: bindActionCreators(dropRow, dispatch),
  fetchData: bindActionCreators(fetchData, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  issues: React.PropTypes.arrayOf(React.PropTypes.object),
  errorMsg: React.PropTypes.string,
  dropRow: React.PropTypes.func,
  fetchData: React.PropTypes.func
};
