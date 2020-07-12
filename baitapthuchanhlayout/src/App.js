import React from "react";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import IntroComponent from "./components/IntroComponent/IntroComponent";
import CardListComponent from "./components/CardListComponent/CardListComponent";
import FooterComponent from "./components/FooterComponent/FooterComponent";

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <IntroComponent />
      <CardListComponent />
      <FooterComponent />
    </div>
  );
}

export default App;
