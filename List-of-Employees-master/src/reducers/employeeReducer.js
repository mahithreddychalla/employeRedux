import {
    RECEIVE_EMPLOYEES_LIST,
    RECEIVE_EMPLOYEES_LIST_ERROR,
    GET_NAME,
  }
from '../actions/employeeAction';

export default function reducer(
    state = // Initial State
      {
        employeesList: [],
        error: null,
        empName: null,
      }, action) {
  switch (action.type) {
    case RECEIVE_EMPLOYEES_LIST: {
      return {
        ...state,
        employeesList: action.employeesList,
        error: null,
      };
    }
    case RECEIVE_EMPLOYEES_LIST_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    case GET_NAME: {
      return {
        ...state,
        empName: action.employeeName,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
    //  return state;
}
