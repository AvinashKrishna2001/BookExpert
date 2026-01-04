import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          width: "100%",
          px: { xs: 2, md: 4 },
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* LEFT: BRAND */}
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            color="primary"
          >
            Employee Management
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
          >
            Dashboard
          </Typography>
        </Box>

        {/* RIGHT: ACTION */}
        <Button
          onClick={handleLogout}
          startIcon={<LogoutOutlinedIcon />}
          sx={{
            textTransform: "none",
            fontWeight: 500,
            color: "text.primary",
            "&:hover": {
              backgroundColor: "#f5f7fa",
            },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
