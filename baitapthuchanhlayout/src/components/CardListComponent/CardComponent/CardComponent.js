import React, { Component } from "react";

export default class CardComponent extends Component {
  render() {
    return (
      <div className="card text-center">
        <img src="https://picsum.photos/500/325" alt="card" className="card-img-top" />
        <div className="card-body">
          <h3 className="card-title">Card title</h3>
          <p className="card-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo magni sapiente, tempore debitis beatae culpa natus architecto.
          </p>
        </div>
        <div className="card-footer">
          <a href="#" className="btn btn-primary" type="button">
            Find Out More!
          </a>
        </div>
      </div>
    );
  }
}
