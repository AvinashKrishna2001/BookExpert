import {
  Box,
  Button,
  MenuItem,
  TextField,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearIcon from "@mui/icons-material/Clear";


const FilterPanel = ({
  gender,
  status,
  onGenderChange,
  onStatusChange,
}) => {
  const clearFilters = () => {
    onGenderChange("");
    onStatusChange("");
  };

  return (
    <Box
      display="flex"
      gap={2}
      alignItems="center"
      flexWrap="wrap"
    >
      <TextField
        label="Gender"
        select
        size="small"
        value={gender}
        onChange={(e) => onGenderChange(e.target.value)}
        sx={{ minWidth: 140 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
      </TextField>

      <TextField
        label="Status"
        select
        size="small"
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        sx={{ minWidth: 160 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="inactive">Inactive</MenuItem>
      </TextField>

      {(gender || status) && (
        <Button
          size="small"
          color="secondary"
          startIcon={<ClearIcon />}
          onClick={clearFilters}
        >
          Clear
        </Button>
      )}
    </Box>
  );
};

export default FilterPanel;
