/**
 * Formats employee data for printing
 */
export const formatEmployeesForPrint = (employees) => {
  return employees.map((emp, index) => ({
    ...emp,
    serialNo: index + 1,
    status: emp.isActive ? "Active" : "Inactive",
  }));
};
