import React, { Component } from "react";
import firebase from "../../fire";
import { connect } from "react-redux";
import { updateBusPic } from "../../ducks/reducer";
import { withRouter } from "react-router-dom";

class BusPic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreview: "",
      profileUrl: ""
    };

    this.handlePreview = this.handlePreview.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handlePreview(file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        file: file[0],
        imagePreview: reader.result
      });
    };
    reader.readAsDataURL(file[0]);
  }

  handleUpload() {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef
      .child(`profilePictures/${this.state.file.name}`)
      .put(this.state.file);
    uploadTask.on(
      "state_changed",
      snapshot => {
        console.log(snapshot);
      },
      error => {},
      success => {
        this.props.updateBusPic(uploadTask.snapshot.downloadURL);
      }
    );
  }

  render() {
    return (
      <div>
        <h1>Edit Profile Picture</h1>

        {this.state.imagePreview && <img src={this.state.imagePreview} />}

        <input
          placeholder="ImageUpload"
          type="file"
          onChange={event => {
            this.handlePreview(event.target.files);
          }}
        />

        <button onClick={this.handleUpload}>Upload Image</button>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { updateBusPic })(BusPic)
);
