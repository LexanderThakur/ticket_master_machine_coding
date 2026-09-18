import { Paper, Typography, Stack, Box } from "@mui/material";

export default function EventCard({
  id = 1,
  name = "Event Name",
  description = "Event description goes here.",
  venue = "Venue",
  performer = "Performer",
}) {
  return (
    <Paper
      elevation={4}
      sx={{
        width: 320,
        minHeight: 180,
        p: 3,
        borderRadius: 3,
        transition: "0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 8,
          cursor: "pointer",
        },
      }}
    >
      <Stack spacing={2}>
        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            Event #{id}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </Typography>

        <Box>
          <Typography variant="body2" fontWeight={600}>
            📍 {venue}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            🎤 {performer}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
