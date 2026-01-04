/**
 * employeeService
 * ----------------
 * Acts like a mock backend.
 * All employee CRUD operations go through this layer.
 */

const STORAGE_KEY = "employees";

/**
 * Fetch all employees from localStorage
 */
export const getEmployees = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * Save employees array to localStorage
 */
const saveEmployees = (employees) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
};

/**
 * Add a new employee
 */
export const addEmployee = (employee) => {
  const employees = getEmployees();
  const updatedEmployees = [...employees, employee];
  saveEmployees(updatedEmployees);
  return updatedEmployees;
};

/**
 * Update an existing employee
 */
export const updateEmployee = (updatedEmployee) => {
  const employees = getEmployees();

  const updatedEmployees = employees.map((emp) =>
    emp.id === updatedEmployee.id ? updatedEmployee : emp
  );

  saveEmployees(updatedEmployees);
  return updatedEmployees;
};

/**
 * Delete an employee by ID
 */
export const deleteEmployee = (id) => {
  const employees = getEmployees();
  const updatedEmployees = employees.filter((emp) => emp.id !== id);
  saveEmployees(updatedEmployees);
  return updatedEmployees;
};
