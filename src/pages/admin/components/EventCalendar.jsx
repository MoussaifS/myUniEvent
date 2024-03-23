

import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, getDay , parse ,  startOfWeek } from "date-fns";

import enUS from 'date-fns/locale/en-US'




const EventCalender = () =>{
    const locales = {
        'en-US': enUS,
      }

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
      })


      return(
        <div>
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
      )
}


export default EventCalender 













