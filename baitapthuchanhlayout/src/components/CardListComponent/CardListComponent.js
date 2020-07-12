import React, { Component } from "react";
import CardComponent from "./CardComponent/CardComponent";

export default class CardListComponent extends Component {
  render() {
    return (
      <section id="cardList" className="container mt-3 p-md-0">
        <div className="row">
          <div className="col-12 col-md">
            <CardComponent />
          </div>
          <div className="col-12 col-md">
            <CardComponent />
          </div>
          <div className="col-12 col-md">
            <CardComponent />
          </div>
          <div className="col-12 col-md">
            <CardComponent />
          </div>
        </div>
      </section>
    );
  }
}
