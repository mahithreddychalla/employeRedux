import axios from 'axios';
import * as config from '../app.config';

export const RECEIVE_EMPLOYEES_LIST = 'RECEIVE_EMPLOYEES_LIST';
export const RECEIVE_EMPLOYEES_LIST_ERROR = 'RECEIVE_EMPLOYEES_LIST_ERROR';
export const GET_NAME = 'GET_NAME';

const list_of_employees_url = config.getEmployeesListUrl();

export function receiveEmployeesList(employeesList) {
  return {
    type: RECEIVE_EMPLOYEES_LIST,
    employeesList,
  };
}

export function receiveEmployeesListError(error) {
  return {
    type: RECEIVE_EMPLOYEES_LIST_ERROR,
    error,
  };
}

export function fetcheEmployeesList() {
  return dispatch => {
    axios.get(list_of_employees_url, {
    }).then((response) => {
      dispatch(receiveEmployeesList(response.data));
    })
      .catch((err) => {
        dispatch(receiveEmployeesListError(err));
      });
  };
}

export function getName(name) {
  return {
    type: GET_NAME,
    employeeName: name,
  };
}
