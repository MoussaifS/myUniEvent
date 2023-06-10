import { Container, TextField, Grid, Button } from "@mui/material";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { auth } from "../../FireBase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const { control, handleSubmit, register } = useForm();

  const institutions = [
    { name: "University of Malaya", label: "University of Malaya" },
    { name: "University Putra Malaysia", label: "University Putra Malaysia" },
    {
      name: "University of Science, Malaysia",
      label: "University of Science, Malaysia",
    },
    {
      name: "National University of Malaysia",
      label: "National University of Malaysia",
    },
    {
      name: "University of Technology, Malaysia",
      label: "University of Technology, Malaysia",
    },
    {
      name: "International Islamic University Malaysia",
      label: "International Islamic University Malaysia",
    },
    {
      name: "Petronas University of Technology",
      label: "Petronas University of Technology",
    },
    {
      name: "University of Malaysia, Pahang",
      label: "University of Malaysia, Pahang",
    },
    { name: "Universiti Teknologi MARA", label: "Universiti Teknologi MARA" },
    { name: "Monash University Malaysia", label: "Monash University Malaysia" },
    {
      name: "University of Malaysia, Perlis",
      label: "University of Malaysia, Perlis",
    },
    {
      name: "Tun Hussein Onn University of Malaysia",
      label: "Tun Hussein Onn University of Malaysia",
    },
    { name: "Taylors University", label: "Taylors University" },
    {
      name: "International Medical University",
      label: "International Medical University",
    },
    {
      name: "University of Nottingham, Malaysia Campus",
      label: "University of Nottingham, Malaysia Campus",
    },
    {
      name: "Curtin University, Malaysia",
      label: "Curtin University, Malaysia",
    },
    {
      name: "University of Malaysia Sabah",
      label: "University of Malaysia Sabah",
    },
    {
      name: "Swinburne University of Technology, Sarawak Campus",
      label: "Swinburne University of Technology, Sarawak Campus",
    },
    { name: "AIMST University", label: "AIMST University" },
    {
      name: "University Tunku Abdul Rahman",
      label: "University Tunku Abdul Rahman",
    },
    { name: "Tenaga National University", label: "Tenaga National University" },
    {
      name: "University of Malaysia, Sarawak",
      label: "University of Malaysia, Sarawak",
    },
    {
      name: "University Malaysia Terengganu",
      label: "University Malaysia Terengganu",
    },
    { name: "Multimedia University", label: "Multimedia University" },
    { name: "Sunway University", label: "Sunway University" },
    {
      name: "Technical University of Malaysia, Melaka",
      label: "Technical University of Malaysia, Melaka",
    },
    {
      name: "Heriot-Watt University Malaysia",
      label: "Heriot-Watt University Malaysia",
    },
    { name: "UCSI University", label: "UCSI University" },
    { name: "University of Kuala Lumpur", label: "University of Kuala Lumpur" },
    {
      name: "University of Malaysia Kelantan",
      label: "University of Malaysia Kelantan",
    },
    {
      name: "Sultan Idris University of Education",
      label: "Sultan Idris University of Education",
    },
    {
      name: "Northern University of Malaysia",
      label: "Northern University of Malaysia",
    },
    {
      name: "National Defence University of Malaysia",
      label: "National Defence University of Malaysia",
    },
    {
      name: "Sultan Zainal Abidin University",
      label: "Sultan Zainal Abidin University",
    },
    {
      name: "Melaka Manipal Medical College",
      label: "Melaka Manipal Medical College",
    },
    { name: "SEGi University", label: "SEGi University" },
    {
      name: "Islamic Science University of Malaysia",
      label: "Islamic Science University of Malaysia",
    },
    {
      name: "Lincoln University College, Kuala Lumpur",
      label: "Lincoln University College, Kuala Lumpur",
    },
    {
      name: "Management and Science University",
      label: "Management and Science University",
    },
    {
      name: "Tunku Abdul Rahman University College",
      label: "Tunku Abdul Rahman University College",
    },
    {
      name: "INTI International University & Colleges",
      label: "INTI International University & Colleges",
    },
    {
      name: "Asia Pacific University of Technology and Innovation",
      label: "Asia Pacific University of Technology and Innovation",
    },
  ];

  const roles = [
    { role: "Professor" },
    { role: "Lecturer" },
    { role: "Dean" },
    { role: "Student Advisor" },
    { role: "Academic Advisor" },
    { role: "Facilities Manager" },
    { role: "Student Club Advisor" },
    { role: "Student Club President" },
  ];

  const onSubmit = (e) => {
    console.log(e);
    createUserWithEmailAndPassword(auth, e.email, e.password)
      .then((userCredential) => {
        console.log(userCredential);
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

          {/* email */}
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
                  placeholder="Enter The Name Of The Institution "
                  options={institutions.map((institution) => ({
                    value: institution.name,
                    label: institution.label,
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
                  placeholder="Enter Your Role In This Institution "
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
