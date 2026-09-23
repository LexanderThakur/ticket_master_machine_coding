import {
  Box,
  Stack,
  Typography,
  Tooltip,
  Chip,
  Paper,
  Divider,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { useNavigate } from "react-router-dom";
const api = import.meta.env.VITE_API_URL;

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [selected, setSelected] = useState([]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const [event, setEvent] = useState({
    id: "1",
    name: "Event",
    description: "des",
    venue: "MSG",
    performer: "Tame Impala",
  });

  const [venue, setVenue] = useState({
    id: 1,
    name: "Madison Square Garden",
    location: "The greatest venue just look it up.",
    seat_map: {
      A: ["A1", "A2", "A3"],
    },
  });

  const ticketMap = {};

  for (const ticket of tickets) {
    ticketMap[ticket.seat] = ticket;
  }

  function toggleSeat(seat) {
    setSelected((prev) => {
      if (prev.includes(seat)) {
        return prev.filter((s) => s !== seat);
      }

      return [...prev, seat];
    });
  }

  async function handle_reserve() {
    try {
      let tickets = [];

      for (const s of selected) {
        tickets.push(ticketMap[s].id);
      }
      console.log(ticketMap);
      console.log(tickets);
      const response = await axios.post(
        api + "/tickets/reserve/",
        {
          tickets,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        },
      );

      setSnackbar({
        open: true,
        severity: "success",
        message: "Seats reserved",
      });
    } catch (error) {
      console.log(error);
      setSnackbar({
        open: true,
        severity: "error",
        message: "Please try again later",
      });
    }
  }

  async function sync_tickets() {
    try {
      const response = await axios.get(api + "/events/" + id + "/");

      setEvent(response.data.event);
      setTickets(response.data.tickets);
    } catch (error) {
      console.log(error);
    }
  }

  async function get_venue() {
    try {
      const response = await axios.get(api + "/venues/" + id);

      setVenue(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    get_venue();
    sync_tickets();
  }, [id]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "#f5f5f5",
        p: { xs: 2, md: 5 },
      }}
    >
      <ArrowBackIcon
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => navigate("/")}
      ></ArrowBackIcon>
      <Stack
        spacing={4}
        sx={{
          maxWidth: 1100,
          mx: "auto",
        }}
      >
        {/* Event information */}
        <Paper
          elevation={2}
          sx={{
            p: 4,
            borderRadius: 3,
          }}
        >
          <Stack spacing={1}>
            <Typography variant="h3" fontWeight={700}>
              {event.name}
            </Typography>

            <Typography color="text.secondary">{event.description}</Typography>

            <Stack direction="row" spacing={3} sx={{ pt: 1 }}>
              <Typography variant="body1">🎤 {event.performer}</Typography>

              <Typography variant="body1">📍 {event.venue}</Typography>
            </Stack>
          </Stack>
        </Paper>

        {/* Seat map */}
        <Paper
          elevation={2}
          sx={{
            p: { xs: 2, md: 5 },
            borderRadius: 3,
          }}
        >
          <Stack spacing={3} alignItems="center">
            <Typography variant="h5" fontWeight={600}>
              Select Your Seats
            </Typography>

            {/* Stage */}
            <Box
              sx={{
                width: "70%",
                maxWidth: 500,
                textAlign: "center",
                py: 1,
                borderRadius: 1,
                bgcolor: "#eeeeee",
              }}
            >
              <Typography variant="caption" fontWeight={700} letterSpacing={2}>
                STAGE
              </Typography>
            </Box>

            {/* Seats */}
            <Stack spacing={1.5} alignItems="center">
              {Object.entries(venue.seat_map).map(([row, seats]) => (
                <Stack
                  key={row}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <Typography
                    sx={{
                      width: 25,
                      fontWeight: 600,
                    }}
                  >
                    {row}
                  </Typography>

                  {seats.map((seat) => {
                    const available = ticketMap[seat]?.status === "available";

                    const isSelected = selected.includes(seat);

                    return (
                      <Tooltip key={seat} title={seat} placement="top">
                        <EventSeatIcon
                          fontSize="large"
                          onClick={() => {
                            if (available) {
                              toggleSeat(seat);
                            }
                          }}
                          sx={{
                            fontSize: 40,

                            color: !available
                              ? "#e53935"
                              : isSelected
                                ? "#1976d2"
                                : "#66bb6a",

                            transition: "0.15s",

                            "&:hover": {
                              cursor: available ? "pointer" : "not-allowed",

                              transform: available ? "scale(1.15)" : "none",
                            },
                          }}
                        />
                      </Tooltip>
                    );
                  })}
                </Stack>
              ))}
            </Stack>

            {/* Legend */}
            <Stack direction="row" spacing={3} sx={{ pt: 2 }}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <EventSeatIcon sx={{ color: "#66bb6a" }} />
                <Typography variant="body2">Available</Typography>
              </Stack>

              <Stack direction="row" spacing={0.5} alignItems="center">
                <EventSeatIcon sx={{ color: "#1976d2" }} />
                <Typography variant="body2">Selected</Typography>
              </Stack>

              <Stack direction="row" spacing={0.5} alignItems="center">
                <EventSeatIcon sx={{ color: "#e53935" }} />
                <Typography variant="body2">Unavailable</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Paper>

        {/* Selection summary */}
        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 3,
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight={600}>
              Selected Seats
            </Typography>

            <Divider />

            {selected.length === 0 ? (
              <Typography color="text.secondary">No seats selected</Typography>
            ) : (
              <Stack direction="row" flexWrap="wrap">
                {selected.map((seat) => (
                  <Chip
                    key={seat}
                    label={seat}
                    color="primary"
                    onDelete={() => toggleSeat(seat)}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Stack>
            )}

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ pt: 1 }}
            >
              <Typography>
                {selected.length} seat
                {selected.length !== 1 ? "s" : ""} selected
              </Typography>
            </Stack>
            <Button
              variant="contained"
              disabled={selected.length === 0}
              size="large"
              onClick={() => handle_reserve()}
            >
              Reserve & Pay
            </Button>
          </Stack>
        </Paper>
      </Stack>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => {
          setSnackbar((prev) => ({ ...prev, open: false }));
        }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
