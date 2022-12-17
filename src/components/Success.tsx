import { Box, Button, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

type SuccessProps = {
  hideForm: Dispatch<SetStateAction<boolean>>;
};

export default function Success({ hideForm }: SuccessProps) {
  return (
    <>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Thanks for signing up!
      </Typography>
      <Box my={2}>
        <Button
          onClick={(e) => {
            e.preventDefault();
            hideForm(false);
          }}
          variant="contained"
        >
          Start Over
        </Button>
      </Box>
    </>
  );
}
