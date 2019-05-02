import React from "react";
import "./App.css";
import BarChartComponent from "./BarChart/BarChartComponent";
import ReportGenerator from "./ReportGenerator/ReportGenerator";
import html2canvas from "html2canvas";
class App extends React.Component {
  state = {
    text: [
      " <b>Bullet 1</b>: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteursint occaecat cupidatat non proident, sunt in culpa qui officiadeserunt mollit anim id est laborum.",

      " <b>Bullet 2</b>: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit ."
    ],
    report: "",
    domImage: ""
  };

  componentDidMount = () => {
    this.convertDomToImage();
  };

  componentDidUpdate = () => {
    this.convertDomToImage();
  };

  convertDomToImage = () => {
    let props = {
      canvas: ""
    };

    html2canvas(document.getElementById("chart"), { logging: false })
      .then(canvas => {
        props.canvas = canvas;
        this.setState({
          report: <ReportGenerator {...props} />
        });
      })
      .catch(function(error) {
        console.error("oops, something went wrong!", error);
      });
  };

  render() {
    return (
      <div
        className="container-fluid"
        id="container"
        style={{ marginTop: "15px" }}
      >
        <div className="row" id="chart">
          <div className="col-md-6">
            <BarChartComponent />
          </div>

          <div className="col-md-5" id="text">
            <ul>
              {this.state.text.map((txt, index) => {
                return <li key={index}>{txt}</li>;
              })}
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">{this.state.report}</div>{" "}
        </div>
      </div>
    );
  }
}

export default App;
