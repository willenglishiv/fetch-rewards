import { useState } from "react";
import { Paper, Container, Box } from "@mui/material";
import Copyright from "../src/components/Copyright";
import SignUpForm from "../src/components/SignUpForm";
import Success from "../src/components/Success";

export default function Home() {
  const [hideForm, setHideForm] = useState(false);

  return (
    <Container maxWidth="sm">
      <Paper elevation={1}>
        <Box
          sx={{
            my: 4,
            py: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {hideForm ? (
            <Success hideForm={setHideForm} />
          ) : (
            <SignUpForm hideForm={setHideForm} />
          )}
        </Box>
      </Paper>
      <Copyright />
    </Container>
  );
}
