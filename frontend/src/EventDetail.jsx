import { Box, Stack, Typography, Tooltip } from "@mui/material";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import EventSeatIcon from "@mui/icons-material/EventSeat";
const api = import.meta.env.VITE_API_URL;
export default function EventDetail() {
  const { id } = useParams();
  const [tickets, setTickets] = useState([]);

  const [selected, setSelected] = useState([]);
  const map = {};
  for (const ticket of tickets) {
    map[ticket.seat] = ticket;
  }

  const [venue, setVenue] = useState({
    id: 1,
    name: "Madison Square Garden",
    location: "The greatest venue just look it up.",
    seat_map: {
      A: ["A1", "A2", "A3"],
    },
  });

  async function sync_tickets() {
    try {
      const response = await axios.get(api + "/events/" + id + "/");

      setTickets(response.data.tickets);
      console.log(response.data.tickets);
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

  const [event, setEvent] = useState({
    id: "1",
    name: "Event",
    description: "des",
    venue: "MSG",
    performer: "Tame Impala",
  });

  useEffect(() => {
    get_venue();
    sync_tickets();
  }, [id]);
  return (
    <Stack sx={{ height: "100vh", width: "100vw", padding: 2 }}>
      <Stack spacing={3}>
        <Typography variant="h3">{event.name}</Typography>
        <Typography variant="subtitle">{event.description}</Typography>
        <Typography variant="body1">{event.performer}</Typography>
        <Typography variant="body1">{event.venue}</Typography>
      </Stack>

      {/* Making The Seat Map */}
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid black",
        }}
      >
        {Object.entries(venue.seat_map).map(([row, seats]) => {
          return (
            <Stack direction={"row"}>
              {seats.map((ele, idx) => {
                return (
                  <Tooltip title={ele} placement="top">
                    <EventSeatIcon
                      sx={{
                        color:
                          map[ele]?.status === "available"
                            ? "rgb(128, 201, 82)"
                            : "rgb(230, 17, 17)",
                        "&:hover": {
                          cursor:
                            map[ele]?.status === "available"
                              ? "pointer"
                              : "not-allowed",
                        },
                      }}
                      fontSize="large"
                    ></EventSeatIcon>
                  </Tooltip>
                );
              })}
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}
