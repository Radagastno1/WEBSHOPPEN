import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      Ojdå, det verkar som att denna sida inte finns.
      <Link to="/">
        <Typography
          fontWeight={"bold"}
          sx={{
            backgroundColor: "lightgrey",
            borderRadius: "2px",
            padding: 1,
          }}
        >
          Till startsidan
        </Typography>
      </Link>
    </Box>
  );
}
