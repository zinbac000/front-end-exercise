import React, { Component } from "react";

import SeatMap from "../../components/SeatMap/SeatMap";

import classes from "./MovieSeatSelection.module.css";

export default class MovieSeatSelection extends Component {
  render() {
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
              <input className={classes.FormControl} type="text" name="name" id="#name" />
            </div>
            <div className={classes.FormGroup}>
              <label htmlFor="seatNumbers">
                Number of Seats<span className={classes.Aterisk}>*</span>
              </label>
              <input className={classes.FormControl} type="number" name="seatNumbers" id="#seatNumbers" />
            </div>
          </form>
          <button className={classes.Button}>Start Selecting</button>

          <SeatMap />

          <div style={{ textAlign: "center" }}>
            <button className={classes.Button}>Confirm Selection</button>
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
                  <td>zinbac000</td>
                  <td>2</td>
                  <td>A3, A4</td>
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
