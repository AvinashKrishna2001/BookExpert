import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

const ConfirmDialog = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
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
              bgcolor: "#fff3e0",
              color: "#f57c00",
              width: 36,
              height: 36,
            }}
          >
            <WarningAmberOutlinedIcon />
          </Avatar>

          <Typography fontWeight={600}>
            {title}
          </Typography>
        </Box>
      </DialogTitle>

      {/* CONTENT */}
      <DialogContent
        sx={{
          backgroundColor: "#f7f9fc",
          py: 3,
        }}
      >
        <Typography color="text.secondary">
          {message}
        </Typography>
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
        <Button
          onClick={onCancel}
          sx={{
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            minWidth: 120,
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
