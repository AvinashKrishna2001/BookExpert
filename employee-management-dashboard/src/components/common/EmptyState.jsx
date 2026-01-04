import { Box, Typography, Button } from '@mui/material';
import { PersonAddAlt } from '@mui/icons-material';

const EmptyState = ({ message, actionLabel, onAction }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="400px"
      gap={2}
      p={3}
    >
      <PersonAddAlt sx={{ fontSize: 80, color: 'text.disabled' }} />
      <Typography variant="h6" color="text.secondary">
        {message || 'No employees found'}
      </Typography>
      {actionLabel && onAction && (
        <Button variant="contained" onClick={onAction} sx={{ mt: 2 }}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;