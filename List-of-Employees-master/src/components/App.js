import React from 'react';
import { fetcheEmployeesList, getName } from '../actions/employeeAction';
import * as selectors from '../selectors/employeeSelector';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(fetcheEmployeesList());
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(name) {
    this.props.dispatch(getName(name));
  }

  render() {
    const empName1 = this.props.employeesList.map(employee => (
      <li
        className="listItem"
        style={{
          margin: '5px',
          padding: '10px',
          background: '#7489d6',
          color: '#fff',
          border: '1px solid #000',
          cursor: 'pointer',
          width: '25%',
        }}
        key={employee.id}
        onClick={() => this.handleClick(employee.name)}
      >
        {employee.name}
      </li>
    ));

    return (
      <div>
        <ul>
          <h2>List of Employees:- </h2>
          {empName1 !== undefined ? empName1 : 'Not Available'}
        </ul>
        {this.props.empName !== null ? <p>{this.props.empName}</p> : ''}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    employeesList: selectors.getEmployeesList(state),
    empName: state.empName,
  };
}

export default connect(mapStateToProps)(App);

