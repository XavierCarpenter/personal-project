import React, { Component } from "react";
import DatePicker from "material-ui/DatePicker";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controlledDate: null
    };
  }

  handleChange = (event, date) => {
    this.setState({
      controlledDate: date
    });
  }

  disableWeekends(date) {
  return date.getDay() === 0 || date.getDay() === 6;
}

  render() {
    return (
     
      <DatePicker
        hintText="Pick a Day"
        shouldDisableDate={this.disableWeekends}
        value={this.state.controlledDate}
        onChange={this.handleChange}
      />
    );
  }
}
export default Calendar;
