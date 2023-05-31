import React from 'react';
import {  Container , TextField, Switch,Radio , RadioGroup, FormLabel ,FormControlLabel, FormGroup, Grid, Button, colors } from '@mui/material';
import Select from 'react-select';
import PublishIcon from '@mui/icons-material/Publish';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import { useForm } from "react-hook-form";


const Form = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const eventTag = [
    { value: "Academic Events", label: "Academic Events" },
    { value: "Career Development", label: "Career Development" },
    { value: "Arts and Culture", label: "Arts and Culture" },
    { value: "Sports and Recreation", label: "Sports and Recreation" },
    { value: "Social Impact", label: "Social Impact" },
    { value: "Student Organizations", label: "Student Organizations" },
    { value: "Campus Life", label: "Campus Life" },
    { value: "Guest Speakers", label: "Guest Speakers" },
    { value: "Alumni Events", label: "Alumni Events" },
    { value: "Festivals and Celebrations", label: "Festivals and Celebrations" },
  ];

  const EventInvitations = [
    { value: "Local Student", label: "Local Student" },
    { value: "Outsider Student", label: "Outsider Student" },
    { value: "Invitation Only", label: "Invitation Only" },
    { value: "Open for All", label: "Open for All" }
  ];

  const onSubmit = (data) => {
    console.log(data); // Do something with the form data
  };

  return (
    <Container maxWidth="sm" id='form-container' >
    <form onSubmit={handleSubmit(onSubmit)} >
      <Grid container spacing={2}>

        {/* Name */}
        <Grid item xs={12}>
          <TextField   
            placeholder="Enter Name Event" 
            variant="filled"
            label="Event Name" 
            required
            fullWidth
            {...register('name', { required: true })}
            error={!!errors.name}
            helperText={errors.name && 'Name is required'}
            />
        </Grid>

        {/* Description */}
        <Grid item xs={12}>
          <TextField
            variant="filled"
            multiline
            required
            minRows={3}
            maxRows={5}
            placeholder="Event Description"
            fullWidth
            {...register('description')}  
          />
        </Grid>

        {/* Tags */}
        <Grid item xs={12}>
        <Select
          {...register('eventTag')}
          menuPortalTarget={document.body} 
          name="eventTag"
          required
          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
          isMulti
          options={eventTag}
          variant="filled"
          placeholder="Type Of Event"
        />
        </Grid>

        {/* Start Time */}
        <Grid item xs={6}>
          <TextField
          {...register('stratTime', { required: true })}
            label="Start Time"
            required
            type="datetime-local"
            variant="filled"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* End Time */}
        <Grid item xs={6}>
          <TextField
          {...register('endTime', { required: true })}
            variant="filled"
            required
            label="End Time"
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* target audience*/}
        <Grid item xs={12}>
          <Select
            {...register('invitation-tag')}
            menuPortalTarget={document.body} 
            required
            name="invitationTag"
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
            isMulti
            options={EventInvitations}
            variant="filled"
            placeholder="Type Of Invitation"
          />
        </Grid>
















        {/* Photo */}
        <Grid item xs={12}>
        
          <Button 
            variant="outlined"
            endIcon={<PublishIcon />}
            component="label"
            fullWidth
            >
            Upload Photo
            <input 
            type="file"
            {...register("picture", {
              required: "Recipe picture is required",
            })}
            hidden />
          </Button>
        </Grid>

        <Grid item xs={12}>
        <Button
          fullWidth 
          id='btn-publish'
          type="submit"
          variant="contained" 
          endIcon={<SendSharpIcon/>} color="primary"
          >
            Publish Event
        </Button>
      </Grid>
      </Grid>

      
    </form>
  </Container>
  );
};

export default Form;
