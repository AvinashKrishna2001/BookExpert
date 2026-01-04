import { forwardRef } from "react";

//Printable Employee List
//This component is ONLY used for printing
const PrintableEmployeeList = forwardRef(({ employees }, ref) => {
  return (
    <div ref={ref} style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Employee List</h2>

      <table
        width="100%"
        border="1"
        cellPadding="8"
        cellSpacing="0"
        style={{ borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Employee ID</th>
            <th>Full Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>State</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp, index) => (
            <tr key={emp.id}>
              <td>{index + 1}</td>
              <td>{emp.id}</td>
              <td>{emp.fullName}</td>
              <td>{emp.gender}</td>
              <td>{emp.dob}</td>
              <td>{emp.state}</td>
              <td>{emp.isActive ? "Active" : "Inactive"}</td>
            </tr>
          ))}

          {employees.length === 0 && (
            <tr>
              <td colSpan="7" align="center">
                No employees to print
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
});

export default PrintableEmployeeList;
