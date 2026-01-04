import { createContext, useContext, useEffect, useState } from "react";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

//EmployeeContext manages all employee-related state
const EmployeeContext = createContext(null);

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]); //Employee list
  const [loading, setLoading] = useState(true); //Loading state

  //Load employees on first render
  useEffect(() => {
    const data = getEmployees();
    setEmployees(data);
    setLoading(false);
  }, []);

  // Create employee
  const createEmployee = (employee) => {
    const updatedEmployees = addEmployee(employee);
    setEmployees(updatedEmployees);
  };

  // Edit employee
  const editEmployee = (employee) => {
    const updatedEmployees = updateEmployee(employee);
    setEmployees(updatedEmployees);
  };

  // Remove employee
   
  const removeEmployee = (id) => {
    const updatedEmployees = deleteEmployee(id);
    setEmployees(updatedEmployees);
  };

  
  const toggleEmployeeStatus = (id) => {
    const employee = employees.find((emp) => emp.id === id);
    if (!employee) return;

    const updatedEmployee = {
      ...employee,
      isActive: !employee.isActive,
    };

    editEmployee(updatedEmployee);
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        createEmployee,
        editEmployee,
        removeEmployee,
        toggleEmployeeStatus,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

//Custom hook for EmployeeContext
export const useEmployees = () => {
  return useContext(EmployeeContext);
};
