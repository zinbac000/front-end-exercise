import React, { Component } from "react";

export default class IntroComponent extends Component {
  render() {
    return (
      <section id="intro" className="jumbotron container" style={{ marginTop: "80px" }}>
        <h1 class="display-3">A Warm Welcome!</h1>
        <p class="lead">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, ipsam, eligendi, in quo sunt possimus non incidunt odit vero aliquid
          similique quaerat nam nobis illo aspernatur vitae fugiat numquam repellat.
        </p>

        <a class="btn btn-primary btn-lg lead" href="#" role="button">
          Call to action!
        </a>
      </section>
    );
  }
}
