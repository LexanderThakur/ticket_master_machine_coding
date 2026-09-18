import { Box, Stack, Typography } from "@mui/material";
import EventCard from "./EventCard";
import { useState, useEffect } from "react";
import axios from "axios";

const api = import.meta.env.VITE_API_URL;
export default function Home() {
  const [events, setEvents] = useState([]);

  async function get_events() {
    try {
      const response = await axios.get(api + "/events/");

      setEvents(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    get_events();
  }, []);
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Typography sx={{ textAlign: "center" }} variant="h2">
        Events
      </Typography>

      <Stack direction={"row"} spacing={2}>
        {events.map((ele, idx) => {
          return (
            <EventCard
              key={ele.id}
              id={ele.id}
              name={ele.name}
              description={ele.description}
              venue={ele.venue}
              performer={ele.performer}
            ></EventCard>
          );
        })}
      </Stack>
    </Box>
  );
}
