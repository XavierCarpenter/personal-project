import React, { Component } from "react";
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';

 
BigCalendar.momentLocalizer(moment);


class Calendar extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="calender-container">
        <BigCalendar
          events={this.props.tasks}
         StartAccessor='starDate'
         endAccessor='endDate'
        />
      </div>
    );
  }
}
export default Calendar;