import { Container, TextField, Grid, Button } from "@mui/material";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { auth, db } from "../../FireBase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const SignUp = () => {
  const { control, handleSubmit, register } = useForm();

  const institutions = [
    { name: "Universiti Sains Islam Malaysia" },
    { name: "Manipal International University" },
    { name: "Nilai University" },
    { name: "INTI International University" },
  ];

  const roles = [
    { role: "Lecturer" },
    { role: "Dean" },
    { role: "Student Advisor" },
    { role: "Academic Advisor" },
    { role: "Facilities Manager" },
    { role: "Student Club Advisor" },
    { role: "Student Club President" },
  ];

  const onSubmit = (e) => {
    createUserWithEmailAndPassword(auth, e.email, e.password)
      .then(async (userCredential) => {
        delete e.password;
        await addDoc(collection(db, "organizers"), e);
      })
      .catch((error) => console.log(error));

    console.log(e); // Do something with the form data
  };

  return (
    <Container maxWidth="sm" id="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* fisrt Name */}
          <Grid item xs={12}>
            <TextField
              placeholder="Enter Your First Name "
              variant="filled"
              label="First Name"
              required
              fullWidth
              {...register("first-name")}
            />
          </Grid>

          {/* last name */}
          <Grid item xs={12}>
            <TextField
              placeholder="Enter Your Last Name"
              variant="filled"
              label="Last Name"
              required
              fullWidth
              {...register("last-name")}
            />
          </Grid>

          {/* phone */}
          <Grid item xs={12}>
            <TextField
              placeholder="Enter Your Phone number"
              variant="filled"
              label="Phone number"
              defaultValue="+60"
              type="number"
              required
              fullWidth
              {...register("phone")}
            />
          </Grid>

          {/* email */}
          <Grid item xs={12}>
            <TextField
              placeholder="Enter Your Email"
              variant="filled"
              label="Email"
              required
              fullWidth
              {...register("email")}
            />
          </Grid>

          {/* password */}
          <Grid item xs={12}>
            <TextField
              placeholder="Enter Your Password"
              variant="filled"
              label="Password"
              required
              fullWidth
              {...register("password")}
            />
          </Grid>

          {/* uni name */}
          <Grid item xs={12}>
            <Controller
              name="institution"
              placeholder="Institution Name"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Institution Name "
                  options={institutions.map((institution) => ({
                    value: institution.name,
                    label: institution.name,
                  }))}
                />
              )}
            />
          </Grid>

          {/* Role */}
          <Grid item xs={12}>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select
                  placeholder="Your Role In This Institution "
                  {...field}
                  options={roles.map((role) => ({
                    value: role.role,
                    label: role.role,
                  }))}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              id="btn-publish"
              type="submit"
              variant="contained"
              color="primary"
            >
              Create Account
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SignUp;
