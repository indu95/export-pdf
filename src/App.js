import React from "react";
import "./App.css";
import BarChartComponent from "./BarChart/BarChartComponent";
import html2canvas from "html2canvas";

import jsPDF from "jspdf";
import LineChartComponent from "./LineChart/LineChartComponent";
class App extends React.Component {
  state = {
    text: [
      {
        value:
          " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteursint occaecat cupidatat non proident, sunt in culpa qui officiadeserunt mollit anim id est laborum.",

        key: "TEXT1"
      },

      {
        key: "TEXT2",
        value:
          " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit ."
      }
    ],
    reportOption: "p"
  };

  componentDidMount = () => {
    this.setState({
      exportButton: (
        <button
          className="btn btn-primary"
          onClick={() => this.generateReport()}
        >
          Export as PDF
        </button>
      )
    });
  };

  generateReport = () => {
    html2canvas(document.getElementById("chart"), { logging: false, scale: 1 })
      .then(canvas => {
        /* Alternate-1 let wid, hgt;
        let img = canvas.toDataURL(
          "image/png",
          (wid = canvas.width),
          (hgt = canvas.height)
        );
        let hratio = hgt / wid;
        let doc = new jsPDF("l", "pt", "a4");
        let width = doc.internal.pageSize.width;
        let height = width * hratio;

        doc.addImage(img, "JPEG", 20, 20, width, height);
        let date = new Date().toISOString();
        doc.save(`Report_${date}.pdf`);
 */

        /*  Alternate-2 //Returns the image data URL, parameter: image format and clarity (0-1)
  var pageData = canvas.toDataURL('image/jpeg', 1.0);

  //Default vertical direction, size ponits, format a4[595.28,841.89]
  var pdf = new jsPDF('', 'pt', 'a4');

  //Two parameters after addImage control the size of the added image, where the page height is compressed according to the width-height ratio column of a4 paper.
  pdf.addImage(pageData, 'JPEG', 0, 0, 595.28, 592.28/canvas.width * canvas.height );

  pdf.save('stone.pdf'); */

        let imgData = canvas.toDataURL("image/png");
        let imgWidth = 210;
        if (this.state.reportOption === "l") imgWidth = 310;
        let pageHeight = 295;
        let imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let doc = new jsPDF(this.state.reportOption, "mm");
        let position = 0;

        doc.addImage(imgData, "JPEG", 8, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, "JPEG", 8, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        let date = new Date().toISOString();
        doc.save(`Report_${date}.pdf`);
      })
      .catch(function(error) {
        console.error("oops, something went wrong!", error);
      });
  };

  render() {
    let lineChartProps = {
      color1: "",
      color2: ""
    };
    return (
      <div
        className="container-fluid"
        id="container"
        style={{ marginTop: "15px" }}
      >
        <div id="chart">
          <div className="row">
            <div className="col-md-6">
              <BarChartComponent />
            </div>

            <div className="col-md-5" id="text">
              <ul>
                {this.state.text.map((txt, index) => {
                  return (
                    <li key={index}>
                      <b>{txt.key}</b> : {txt.value}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <LineChartComponent />
            </div>

            <div className="col-md-5" id="text">
              <ul>
                {this.state.text.map((txt, index) => {
                  return (
                    <li key={index}>
                      <b>{txt.key}</b> : {txt.value}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <BarChartComponent />
            </div>

            <div className="col-md-5" id="text">
              <ul>
                {this.state.text.map((txt, index) => {
                  return (
                    <li key={index}>
                      <b>{txt.key}</b> : {txt.value}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <LineChartComponent />
            </div>

            <div className="col-md-5" id="text">
              <ul>
                {this.state.text.map((txt, index) => {
                  return (
                    <li key={index}>
                      <b>{txt.key}</b> : {txt.value}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <LineChartComponent />
            </div>

            <div className="col-md-5" id="text">
              <ul>
                {this.state.text.map((txt, index) => {
                  return (
                    <li key={index}>
                      <b>{txt.key}</b> : {txt.value}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <LineChartComponent />
            </div>

            <div className="col-md-5" id="text">
              <ul>
                {this.state.text.map((txt, index) => {
                  return (
                    <li key={index}>
                      <b>{txt.key}</b> : {txt.value}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <BarChartComponent />
            </div>

            <div className="col-md-5" id="text">
              <ul>
                {this.state.text.map((txt, index) => {
                  return (
                    <li key={index}>
                      <b>{txt.key}</b> : {txt.value}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 text-center">
            {" "}
            {this.state.exportButton}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
