import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState, useEffect } from "react";
import "moment/locale/nb";
import { fetchAll } from "./RestRequest";

//setup localizer
const localizer = momentLocalizer(moment);

//main calendar object
const FitnessCalendar = (props) => {
  const [events, setEvents] = useState([]);

  //fetch and store trainings data
  useEffect(() => {
    fetchAll("trainings").then((data) =>
      setEvents(
        data.content.map((training, index) => ({
          id: index + 1,
          start: moment(training.date).toDate(),
          end: new moment(training.date)
            .add(training.duration, "minutes")
            .toDate(),
          title: training.activity,
          allDay: false,
        }))
      )
    );
  }, []);

  //render to schedule tab
  return (
    <div>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "80vh", margin: "1rem" }}
        events={events}
      />
    </div>
  );
};

export default FitnessCalendar;
