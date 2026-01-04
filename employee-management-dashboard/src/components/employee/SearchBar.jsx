import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

//Search employees by name
// - Icon based
// - Clean UX
const SearchBar = ({ value, onChange }) => {
  return (
    <TextField
      placeholder="Search employee by name…"
      size="small"
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
