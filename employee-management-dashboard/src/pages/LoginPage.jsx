import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
  Divider,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(username, password);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1.3fr 1fr" },
        background:
          "linear-gradient(135deg, #1e3c72 0%, #2a5298 35%, #6f86d6 70%, #a5cafc 100%)",
        color: "#fff",
      }}
    >
      {/* LEFT PANEL – BRAND / CONTEXT */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          px: 8,
          py: 6,
          background:
            "radial-gradient(circle at top left, rgba(255,255,255,0.2), transparent 45%)",
        }}
      >
        <Typography variant="h3" fontWeight={700} mb={2}>
          Employee Management System
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 4,
            maxWidth: 460,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          Manage employee records, status, and workflows in a
          simple, secure, and visually rich **dashboard**.
        </Typography>

        <Box sx={{ display: "grid", rowGap: 1 }}>
          <Typography
            variant="body1"
            sx={{ color: "rgba(255,255,255,0.9)" }}
          >
            ✔ Add, edit, and manage employees effortlessly.
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "rgba(255,255,255,0.9)" }}
          >
            ✔ Track active and inactive status in real time.
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "rgba(255,255,255,0.9)" }}
          >
            ✔ Search, filter, and export records with ease.
          </Typography>
        </Box>
      </Box>

      {/* RIGHT PANEL – LOGIN */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 3, sm: 4 },
        }}
      >
        <Paper
          elevation={10}
          sx={{
            width: "100%",
            maxWidth: 420,
            borderRadius: 4,
            p: 4,
            backdropFilter: "blur(18px)",
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(245,247,255,0.98))",
            boxShadow:
              "0 18px 45px rgba(8, 35, 85, 0.45)",
          }}
        >
          {/* HEADER */}
          <Box textAlign="center" mb={3}>
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 54,
                height: 54,
                mx: "auto",
                mb: 1.5,
                background:
                  "linear-gradient(135deg, #1e3c72, #6f86d6)",
                boxShadow:
                  "0 8px 20px rgba(111,134,214,0.6)",
              }}
            >
              <LockOutlinedIcon />
            </Avatar>

            <Typography variant="h5" fontWeight={700} mb={0.5}>
              Welcome back
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "text.secondary" }}
            >
              Sign in to access your **workspace**.
            </Typography>
          </Box>

          {/* FORM */}
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputLabelProps={{ sx: { fontSize: 13 } }}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ sx: { fontSize: 13 } }}
            />

            {error && (
              <Typography
                color="error"
                variant="body2"
                sx={{ mt: 1 }}
              >
                {error}
              </Typography>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 1,
                mb: 1,
              }}
            >
              
              
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                py: 1.2,
                fontWeight: 600,
                borderRadius: 2.5,
                textTransform: "none",
                fontSize: 15,
                background:
                  "linear-gradient(135deg, #1e3c72, #6f86d6)",
                boxShadow:
                  "0 10px 24px rgba(30,60,114,0.45)",
                ":hover": {
                  background:
                    "linear-gradient(135deg, #182c4f, #5b6fc4)",
                  boxShadow:
                    "0 12px 28px rgba(24,44,79,0.55)",
                },
              }}
            >
              Login
            </Button>
          </form>

          <Divider sx={{ my: 3 }} />

          {/* FOOTER */}
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            textAlign="center"
          >
            © {new Date().getFullYear()} Employee Management System ·
            Crafted for modern **teams**
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
