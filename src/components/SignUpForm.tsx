import { Dispatch, SetStateAction } from "react";
import {
  Stack,
  TextField,
  MenuItem,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import useSWR from "swr";
import User from "../interfaces/User";
import ApiReturn from "../interfaces/ApiReturn";

type SignUpFormProps = {
  hideForm: Dispatch<SetStateAction<boolean>>;
};

export default function SignUpForm({ hideForm }: SignUpFormProps) {
  const { data, isLoading } = useSWR<ApiReturn>(
    `https://frontend-take-home.fetchrewards.com/form`
  );

  const blankUser: User = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    occupation: "",
    state: "",
  };

  const handleSubmit = async (values: User, actions: any) => {
    const { name, email, password, occupation, state } = values;
    return axios
      .post("https://frontend-take-home.fetchrewards.com/form", {
        name,
        email,
        password,
        occupation,
        state,
      })
      .then(() => {
        hideForm(true);
        actions.resetForm();
      });
  };

  if (isLoading)
    return (
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Sign up for Fetch Rewards
      </Typography>
    );
  const { occupations, states } = data || {
    occupations: [],
    states: [],
  };
  return (
    <>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Sign up for Fetch Rewards
      </Typography>
      <Box width={"100%"} maxWidth={250}>
        <Formik
          initialValues={blankUser}
          onSubmit={handleSubmit}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Required"),
            email: Yup.string()
              .email("Please enter a valid email.")
              .required("Required"),
            password: Yup.string()
              .min(8, "Your Password must be at least 8 characters")
              .required("Required"),
            passwordConfirmation: Yup.string().oneOf(
              [Yup.ref("password"), null],
              "Passwords must match"
            ),
            occupation: Yup.string().required("Required"),
            state: Yup.string().required("Required"),
          })}
          validateOnMount
        >
          {({
            submitForm,
            values,
            handleChange,
            errors,
            touched,
            isValid,
            handleBlur,
          }) => (
            <Form>
              <Stack spacing={2}>
                <TextField
                  name="name"
                  label="Name"
                  variant="outlined"
                  value={values?.name}
                  onChange={handleChange}
                  fullWidth
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  onBlur={handleBlur}
                />
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={values?.email}
                  onChange={handleChange}
                  fullWidth
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  type="email"
                  onBlur={handleBlur}
                />
                <TextField
                  name="password"
                  label="Password"
                  variant="outlined"
                  value={values?.password}
                  onChange={handleChange}
                  fullWidth
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  type="password"
                  onBlur={handleBlur}
                />
                <TextField
                  name="passwordConfirmation"
                  label="Confirm your Password"
                  variant="outlined"
                  value={values?.passwordConfirmation}
                  onChange={handleChange}
                  fullWidth
                  error={
                    touched.passwordConfirmation &&
                    Boolean(errors.passwordConfirmation)
                  }
                  helperText={
                    touched.passwordConfirmation && errors.passwordConfirmation
                  }
                  type="password"
                  onBlur={handleBlur}
                />
                <TextField
                  name="occupation"
                  label="Occupation"
                  variant="outlined"
                  value={values?.occupation}
                  onChange={handleChange}
                  fullWidth
                  error={touched.occupation && Boolean(errors.occupation)}
                  helperText={touched.occupation && errors.occupation}
                  select={!!occupations.length}
                  onBlur={handleBlur}
                >
                  {occupations.length &&
                    occupations.map((occupationItem, idx) => (
                      <MenuItem
                        value={occupationItem}
                        key={`occupation-${idx}`}
                      >
                        {occupationItem}
                      </MenuItem>
                    ))}
                </TextField>
                <TextField
                  name="state"
                  label="State"
                  variant="outlined"
                  value={values?.state}
                  onChange={handleChange}
                  fullWidth
                  error={touched.state && Boolean(errors.state)}
                  helperText={touched.state && errors.state}
                  select={!!states.length}
                  onBlur={handleBlur}
                >
                  {states.length &&
                    states.map((stateItem, idx) => (
                      <MenuItem
                        value={stateItem.abbreviation}
                        key={`state-${idx}`}
                      >
                        {stateItem.name}
                      </MenuItem>
                    ))}
                </TextField>
                <Box textAlign="center" mb={1}>
                  <Button
                    onClick={submitForm}
                    disabled={!isValid}
                    variant="contained"
                  >
                    Submit
                  </Button>
                </Box>
                <Typography
                  variant="body1"
                  component="p"
                  align="center"
                  gutterBottom
                >
                  All fields are required.
                </Typography>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}
