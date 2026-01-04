import { useMemo, useRef, useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { v4 as uuidv4 } from "uuid";

import EmployeeTable from "../components/employee/EmployeeTable";
import EmployeeForm from "../components/employee/EmployeeForm";
import SearchBar from "../components/employee/SearchBar";
import FilterPanel from "../components/employee/FilterPanel";
import ConfirmDialog from "../components/common/ConfirmDialog";
import PrintableEmployeeList from "../components/employee/PrintableEmployeeList";

import { useEmployees } from "../context/EmployeeContext";
import SummaryCard from "../components/layout/SummaryCard";

const Dashboard = () => {
  const {
    employees,
    loading,
    createEmployee,
    editEmployee,
    removeEmployee,
    toggleEmployeeStatus,
  } = useEmployees();

  const [formOpen, setFormOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Print ref
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Employee_List",
  });

  // Combined filtering
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch = emp.fullName
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesGender = !genderFilter || emp.gender === genderFilter;

      const matchesStatus =
        !statusFilter ||
        (statusFilter === "active" && emp.isActive) ||
        (statusFilter === "inactive" && !emp.isActive);

      return matchesSearch && matchesGender && matchesStatus;
    });
  }, [employees, searchText, genderFilter, statusFilter]);

  //Add / Edit handler
  const handleSubmit = (employee) => {
    if (employee.id) {
      editEmployee(employee);
    } else {
      createEmployee({
        ...employee,
        id: uuidv4(),
      });
    }
  };

  // Delete handlers
  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    removeEmployee(selectedEmployee.id);
    setConfirmOpen(false);
    setSelectedEmployee(null);
  };

  if (loading) {
    return <Typography>Loading employees...</Typography>;
  }

  return (
    <Box
      sx={{
        backgroundColor: "#f7f9fc",
        minHeight: "100vh",
        p: { xs: 2, md: 4 },
      }}
    >
      {/* PAGE HEADER */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
        }}
      >
      
        <Box>
          <Typography variant="h5" fontWeight={600} sx={{ lineHeight: 1.2 }}>
            Employee Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Manage employee records and status
          </Typography>
        </Box>

        <Box display="flex" gap={1.5}>
          <Button
            variant="contained"
            size="medium"
            onClick={() => {
              setSelectedEmployee(null);
              setFormOpen(true);
            }}
            sx={{
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Add Employee
          </Button>

          <Button
            variant="outlined"
            size="medium"
            onClick={handlePrint}
            sx={{
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Print
          </Button>
        </Box>
      </Box>

      {/* SUMMARY CARDS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(220px, 1fr))"
        gap={2}
        mb={3}
      >
        <SummaryCard title="Total Employees" value={employees.length} />
        <SummaryCard
          title="Active Employees"
          value={employees.filter((e) => e.isActive).length}
          color="success"
        />
        <SummaryCard
          title="Inactive Employees"
          value={employees.filter((e) => !e.isActive).length}
          color="warning"
        />
      </Box>

      {/* SEARCH & FILTER PANEL */}
      <Paper
        elevation={1}
        sx={{
          p: 2,
          borderRadius: 3,
          mb: 3,
        }}
      >
        <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
          <SearchBar value={searchText} onChange={setSearchText} />

          <FilterPanel
            gender={genderFilter}
            status={statusFilter}
            onGenderChange={setGenderFilter}
            onStatusChange={setStatusFilter}
          />
        </Box>
      </Paper>

      {/* TABLE CONTAINER */}
      <Paper
        elevation={2}
        sx={{
          borderRadius: 3,
          p: 2,
        }}
      >
        <EmployeeTable
          employees={filteredEmployees}
          onEdit={(emp) => {
            setSelectedEmployee(emp);
            setFormOpen(true);
          }}
          onDelete={handleDeleteClick}
          onToggleStatus={toggleEmployeeStatus}
        />
      </Paper>

      {/* FORMS & MODALS */}
      <EmployeeForm
        open={formOpen}
        initialData={selectedEmployee}
        onClose={() => {
          setFormOpen(false);
          setSelectedEmployee(null);
        }}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Employee"
        message={`Are you sure you want to delete ${selectedEmployee?.fullName}?`}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />

      <div style={{ display: "none" }}>
        <PrintableEmployeeList ref={printRef} employees={filteredEmployees} />
      </div>
    </Box>
  );
};

export default Dashboard;
