import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { validateEmployee } from "../../utils/validation";

/**
 * Empty employee template
 */
const EMPTY_EMPLOYEE = {
  id: "",
  fullName: "",
  gender: "",
  dob: "",
  state: "",
  isActive: true,
  profileImage: "",
};

/**
 * EmployeeForm
 * - Add & Edit
 * - Modern UI
 * - Responsive
 */
const EmployeeForm = ({ open, onClose, onSubmit, initialData }) => {
  const [employee, setEmployee] = useState(EMPTY_EMPLOYEE);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState("");

  /**
   * Handle Add vs Edit mode
   */
  useEffect(() => {
    if (initialData) {
      setEmployee(initialData);
      setImagePreview(initialData.profileImage || "");
    } else {
      setEmployee(EMPTY_EMPLOYEE);
      setImagePreview("");
    }
  }, [initialData]);

  /**
   * Handle input changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handle image upload
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setEmployee((prev) => ({
        ...prev,
        profileImage: reader.result,
      }));
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  /**
   * Submit form
   */
  const handleSubmit = () => {
    const validationErrors = validateEmployee(employee);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    onSubmit(employee);
    handleClose();
  };

  /**
   * Reset & close
   */
  const handleClose = () => {
    setEmployee(EMPTY_EMPLOYEE);
    setErrors({});
    setImagePreview("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      {/* HEADER */}
      <DialogTitle
        sx={{
          backgroundColor: "#f7f9fc",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 36,
              height: 36,
            }}
          >
            <PersonIcon />
          </Avatar>

          <Box>
            <Typography variant="h6" fontWeight={700}>
              {employee.id ? "Edit Employee" : "Add Employee"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Employee information & status
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ backgroundColor: "#f7f9fc", p: 3 }}>
        {/* PROFILE SECTION */}
        <Box
          sx={{
            backgroundColor: "#fff",
            p: 2.5,
            borderRadius: 3,
            mb: 3,
          }}
        >
          <Typography fontWeight={600} gutterBottom>
            Profile Image
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src={imagePreview} sx={{ width: 72, height: 72 }}>
              {employee.fullName?.charAt(0)}
            </Avatar>

            <Box>
              <Button
                sx={{ textTransform: "none" }}
                variant="outlined"
                component="label"
              >
                Upload Image
                <input hidden type="file" onChange={handleImageChange} />
              </Button>
              {/* <Typography variant="caption" color="text.secondary">
              JPG / PNG • Preview supported
            </Typography> */}
            </Box>
          </Stack>
        </Box>

        {/* BASIC INFO */}
        <Box
          sx={{
            backgroundColor: "#fff",
            p: 2.5,
            borderRadius: 3,
            mb: 3,
          }}
        >
          <Typography fontWeight={600} gutterBottom>
            Basic Information
          </Typography>

          <TextField
            label="Full Name"
            name="fullName"
            fullWidth
            margin="normal"
            value={employee.fullName}
            onChange={handleChange}
            error={!!errors.fullName}
            helperText={errors.fullName}
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Gender"
              name="gender"
              select
              fullWidth
              value={employee.gender}
              onChange={handleChange}
              error={!!errors.gender}
              helperText={errors.gender}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>

            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={employee.dob}
              onChange={handleChange}
              error={!!errors.dob}
              helperText={errors.dob}
            />
          </Stack>

          <TextField
            label="State"
            name="state"
            fullWidth
            margin="normal"
            value={employee.state}
            onChange={handleChange}
            error={!!errors.state}
            helperText={errors.state}
          />
        </Box>

        {/* STATUS */}
        <Box
          sx={{
            backgroundColor: "#fff",
            p: 2.5,
            borderRadius: 3,
          }}
        >
          <Typography fontWeight={600} gutterBottom>
            Employment Status
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={employee.isActive}
                onChange={(e) =>
                  setEmployee((prev) => ({
                    ...prev,
                    isActive: e.target.checked,
                  }))
                }
                color="success"
              />
            }
            label={
              <Typography fontWeight={500}>
                {employee.isActive ? "Active" : "Inactive"}
              </Typography>
            }
          />
        </Box>
      </DialogContent>

      {/* ACTIONS */}
      <DialogActions
        sx={{
          backgroundColor: "#fff",
          borderTop: "1px solid #e0e0e0",
          px: 3,
          py: 2,
        }}
      >
        <Button onClick={handleClose}>Cancel</Button>
        <Button sx={{bckgroundColor:"#1976d2",textTransform:"none"}}
          variant="contained"
          onClick={handleSubmit}
          
        >
          Save Employee
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeForm;
