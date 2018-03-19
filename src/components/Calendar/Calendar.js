import React, { Component } from "react";
import DatePicker from "material-ui/DatePicker";
import TimePicker from "material-ui/TimePicker";
import moment from "moment";
// import DatePickerDialog from "material-ui/DatePicker/DatePickerDialog";
// import TimePickerDialog from "material-ui/TimePicker/TimePickerDialog";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../ducks/reducer";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      time: null
    };
    this.setDate = this.setDate.bind(this);
    this.setTime = this.setTime.bind(this);
    this.addAppt = this.addAppt.bind(this);
    this.disableWeekends = this.disableWeekends.bind(this);
  }
  componentDidMount() {
    this.props.getUser();
  }

  setDate(event, date) {
    this.setState({ date: date });
  }
  setTime(event, time) {
    this.setState({ time: time });
  }
  addAppt() {
    //change format of date and time
    let newDate = `${this.state.date}`
      .split(" ")
      .splice(0, 4)
      .join(" ");
    let temp = `${this.state.time}`.split(" ")[4];
    let newTime = moment(temp, "HH:mm:ss").format("hh:mm a");
    let body = {
      busid: this.props.match.params.id,
      date: newDate,
      time: newTime
    };

    axios.post(`api/appointment/${this.props.user.id}`, body).then(response => {
      // console.log(response.data);
      alert("Appointment Booked");
      this.props.appActive();
    });
  }

  disableWeekends(date) {
    return date.getDay() === 0 || date.getDay() === 6;
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <DatePicker
          hintText="What Day?"
          value={this.state.date}
          onChange={this.setDate}
          shouldDisableDate={this.disableWeekends}
          style={{ color: "#c3073f", backgroundColor: "#6D6D70" }}
        />
        <TimePicker
          format="ampm"
          hintText="What time?"
          value={this.state.time}
          onChange={this.setTime}
          style={{ color: "#c3073f", backgroundColor: "#6D6D70" }}
        />
        <button onClick={this.addAppt}>Confirm</button>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser })(Calendar));
