import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { Button , Input ,  Container ,TextField } from '@mui/material';
import { useFormControl } from '@mui/material/FormControl';


const Form = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      eventName: '',
      eventDescription: '',
      eventFilters: '',
      date: '',
      time: '',
      duration: '',
      location: '',
      sendNotification: {},
      photo: '',
    }
  });
  const onSubmit = data => console.log(data);

  return (
    <Container fixed>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="eventName"
        control={control}
        render={({ field }) => <TextField id="event-name" label="Event Name" variant="outlined" {...field} />}
      /><br/>

      <Controller
        name="eventDescription"
        control={control}
        render={({ field }) => <TextField id="event-description" label="Description" variant="outlined" {...field} />}
      /><br/>
      <Controller
        name="eventFilters"
        control={control}
        render={({ field }) => <TextField id="event-Filters" label="Filters" variant="outlined" {...field} />}
      /><br/>
      <Controller
        name="date"
        control={control}
        render={({ field }) => <TextField id="event-Filters" label="Filters" variant="outlined" {...field} />}
      /><br/>
      <Controller
        name="time"
        control={control}
        render={({ field }) => <TextField id="event-Filters" label="Filters" variant="outlined" {...field} />}
      /><br/>
      <Controller
        name="duration"
        control={control}
        render={({ field }) => <TextField id="event-Filters" label="Filters" variant="outlined" {...field} />}
      /><br/>
      <Controller
        name="sendNotification"
        control={control}
        render={({ field }) => <TextField id="event-Filters" label="Filters" variant="outlined" {...field} />}
      /><br/>
      <Controller
        name="photo"
        control={control}
        render={({ field }) => <TextField id="event-Filters" label="Filters" variant="outlined" {...field} />}
      /><br/>

      
    
      <Button type="submit" variant="outlined"> Post Event </Button>
    </form>
    </Container>
    
  );
};

export default Form