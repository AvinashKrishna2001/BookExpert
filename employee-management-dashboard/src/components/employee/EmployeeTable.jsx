import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";



const EmployeeTable = ({
  employees,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <TableContainer
      component={Paper}
      elevation={2}
      sx={{
        borderRadius: 3,
        overflowX: "auto",
      }}
    >
      <Table stickyHeader>
        {/* TABLE HEADER */}
        <TableHead>
          <TableRow>
            <TableCell><b>ID</b></TableCell>
            <TableCell><b>Employee</b></TableCell>
            {!isMobile && <TableCell><b>Gender</b></TableCell>}
            {!isMobile && <TableCell><b>DOB</b></TableCell>}
            {!isMobile && <TableCell><b>State</b></TableCell>}
            <TableCell><b>Status</b></TableCell>
            <TableCell align="right"><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>

        {/* TABLE BODY */}
        <TableBody>
          {employees.map((emp) => (
            <TableRow
              key={emp.id}
              hover
              sx={{
                "&:last-child td": { borderBottom: 0 },
              }}
            >
              {/* ID */}
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {emp.id.slice(0, 8)}
                </Typography>
              </TableCell>

              {/* PROFILE + NAME */}
              <TableCell>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    src={emp.profileImage}
                    sx={{ width: 40, height: 40 }}
                  >
                    {emp.fullName?.charAt(0)}
                  </Avatar>

                  <Box>
                    <Typography fontWeight={600}>
                      {emp.fullName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {emp.gender}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>

              {!isMobile && <TableCell>{emp.gender}</TableCell>}
              {!isMobile && <TableCell>{emp.dob}</TableCell>}
              {!isMobile && <TableCell>{emp.state}</TableCell>}

              {/* STATUS */}
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <Chip
                    size="small"
                    label={emp.isActive ? "Active" : "Inactive"}
                    color={emp.isActive ? "success" : "default"}
                    variant={emp.isActive ? "filled" : "outlined"}
                  />
                  <Switch
                    checked={emp.isActive}
                    onChange={() => onToggleStatus(emp.id)}
                    color="success"
                  />
                </Box>
              </TableCell>

              {/* ACTIONS */}
              <TableCell align="right">
                <Tooltip title="Edit Employee">
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(emp)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete Employee">
                  <IconButton
                    color="error"
                    onClick={() => onDelete(emp)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}

          {/* EMPTY STATE */}
          {employees.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                <Typography variant="h6" color="text.secondary">
                  No employees found
                </Typography>
               
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
