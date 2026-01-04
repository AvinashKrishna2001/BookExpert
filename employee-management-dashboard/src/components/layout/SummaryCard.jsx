import { Paper, Typography, Box } from "@mui/material";

/**
 * Dashboard Summary Card
 */
const SummaryCard = ({ title, value, color = "primary" }) => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2.5,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        gutterBottom
      >
        {title}
      </Typography>

      <Typography
        variant="h4"
        fontWeight={700}
        color={`${color}.main`}
      >
        {value}
      </Typography>
    </Paper>
  );
};

export default SummaryCard;
