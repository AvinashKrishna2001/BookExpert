import {
  getEmployees,
  addEmployee,
  deleteEmployee,
} from "../services/employeeService";

describe("employeeService", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should add a new employee", () => {
    const employee = {
      id: "1",
      fullName: "John Doe",
      isActive: true,
    };

    addEmployee(employee);
    const employees = getEmployees();

    expect(employees.length).toBe(1);
    expect(employees[0].fullName).toBe("John Doe");
  });

  it("should delete an employee", () => {
    addEmployee({ id: "1", fullName: "A" });
    addEmployee({ id: "2", fullName: "B" });

    deleteEmployee("1");
    const employees = getEmployees();

    expect(employees.length).toBe(1);
    expect(employees[0].id).toBe("2");
  });
});
