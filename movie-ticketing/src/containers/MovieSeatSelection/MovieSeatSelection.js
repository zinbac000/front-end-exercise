import React, { Component } from "react";

import SeatMap from "../../components/SeatMap/SeatMap";

import classes from "./MovieSeatSelection.module.css";

import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";

class MovieSeatSelection extends Component {
  state = {
    controls: {
      name: {
        value: "",
        validation: {
          required: true
        },
        errors: []
      },
      seatNumbers: {
        value: "",
        validation: {
          required: true
        },
        errors: []
      }
    },
    submitted: false
  };

  validateControl = (value, rules) => {
    let errors = [];
    if (!rules) return errors;

    if (rules.required && value.trim() === "") {
      errors.push(`This field is required.`);
    }

    return errors;
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ controls: { ...this.state.controls, [name]: { ...this.state.controls[name], value } } });
  };

  handleStartSelecting = () => {
    if (this.state.submitted) {
      return;
    }
    const newControls = { ...this.state.controls };
    let isFormValid = true;

    Object.values(newControls).forEach((controlObj) => {
      let errors = this.validateControl(controlObj.value, controlObj.validation);
      controlObj.errors = errors;
      isFormValid &= errors.length === 0;
    });

    this.setState({
      controls: newControls
    });

    if (isFormValid) {
      this.props.submitInfo({ name: this.state.controls.name.value, seatNumbers: +this.state.controls.seatNumbers.value });
      this.setState({ submitted: true });
    }
  };

  renderErrors = (errors) => {
    return errors.map((error, index) => (
      <span key={index} className={classes.InvalidFeedback}>
        {error}
      </span>
    ));
  };

  render() {
    const { controls } = this.state;
    return (
      <div className={classes.MovieSeatSelection}>
        <header>
          <h1>MOVIE SEAT SELECTION</h1>
        </header>
        <main className={classes.Container}>
          <p className={classes.GuideDescription}>Fill The Required Details Below And Select Your Seats</p>
          <form className={classes.FormInline}>
            <div className={classes.FormGroup}>
              <label htmlFor="name">
                Name<span className={classes.Aterisk}>*</span>
              </label>
              <input
                className={[classes.FormControl, controls.name.errors.length > 0 ? classes.Invalid : null].join(" ")}
                type="text"
                name="name"
                id="#name"
                value={controls.name.value}
                onChange={this.handleInputChange}
                readOnly={this.state.submitted}
              />
              {this.renderErrors(controls.name.errors)}
            </div>
            <div className={classes.FormGroup}>
              <label htmlFor="seatNumbers">
                Number of Seats<span className={classes.Aterisk}>*</span>
              </label>
              <input
                className={[classes.FormControl, controls.seatNumbers.errors.length > 0 ? classes.Invalid : null].join(" ")}
                type="number"
                name="seatNumbers"
                id="#seatNumbers"
                value={controls.seatNumbers.value}
                onChange={this.handleInputChange}
                readOnly={this.state.submitted}
              />
              {this.renderErrors(controls.seatNumbers.errors)}
            </div>
          </form>
          <button className={classes.Button} onClick={this.handleStartSelecting}>
            Start Selecting
          </button>

          <SeatMap />

          <div style={{ textAlign: "center" }}>
            <button className={classes.Button} onClick={this.props.confirmSeat}>
              Confirm Selection
            </button>
          </div>

          <div className={classes.ResultWrapper}>
            <table className={classes.Result}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Number of Seats</th>
                  <th>Seats</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.props.confirmedTicket.name}</td>
                  <td>{this.props.confirmedTicket.seatNumbers}</td>
                  <td>{this.props.confirmedTicket.seats}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
        <footer>© 2018 Movie Seat Selection . All Rights Reserved | Design by W3layouts</footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  confirmedTicket: state.movieSeatSelection.confirmedTicket
});

const mapDispatchToProps = {
  submitInfo: actions.submitInfo,
  confirmSeat: actions.confirmSeat
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieSeatSelection);
