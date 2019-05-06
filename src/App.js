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

        key: "Scarlett"
      },

      {
        key: "Dr Susan Cream",
        value:
          " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit ."
      }
    ],
    reportOrientation: "p"
  };

  componentDidMount = () => {
    this.setState({
      exportButton: (
        <button
          className="btn btn-primary"
          onClick={() => this.generateMultiPageReport()}
        >
          Export as PDF
        </button>
      )
    });
  };

  generateMultiPageReport = () => {
    html2canvas(document.getElementById("charts"), {
      logging: false,
      scale: 1
    }).then(canvas => {
      var contentWidth = canvas.width;
      var contentHeight = canvas.height;
      //One page pdf shows the canvas height generated by html pages.
      var pageHeight = (contentWidth / 592.28) * 841.89;
      //html page height without pdf generation
      var leftHeight = contentHeight;
      //Page offset
      var position = 0;
      //a4 paper size [595.28, 841.89], html page generated canvas in pdf picture width

      var imgWidth = 555.28;
      var imgHeight = (555.28 / contentWidth) * contentHeight;
      var pageData = canvas.toDataURL("image/jpeg", 1.0);
      var pdf = new jsPDF("", "pt", "a4");
      //There are two heights to distinguish, one is the actual height of the html page, and the page height of the generated pdf (841.89)
      //When the content does not exceed the range of pdf page display, there is no need to paginate
      if (leftHeight < pageHeight) {
        pdf.addImage(pageData, "JPEG", 20, 0, imgWidth, imgHeight);
      } else {
        while (leftHeight > 0) {
          pdf.addImage(pageData, "JPEG", 20, position, imgWidth, imgHeight);
          leftHeight -= pageHeight;
          position -= 841.89;
          //Avoid adding blank pages
          if (leftHeight > 0) {
            pdf.addPage();
          }
        }
      }
      let date = new Date().toISOString();
      pdf.save(`Report_${date}.pdf`);
    });
  };

  generateReport = () => {
    html2canvas(document.getElementById("charts"), { logging: false, scale: 1 })
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
        if (this.state.reportOrientation === "l") imgWidth = 310;
        let pageHeight = 295;
        let imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let doc = new jsPDF(this.state.reportOrientation, "mm");
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
    let chartBorder = {
      borderStyle: "ridge",
      borderRadius: "60px",
      margin: "10px",
      borderColor: "#bad3f9",
      paddingTop: "20px",
      paddingBottom: "20px",
      /* border-width: medium; */
      borderWidth: "5px 5px 5px 5px"
    };
    return (
      <div
        className="container-fluid"
        id="container"
        style={{ marginTop: "15px" }}
      >
        <div id="charts">
          <h1
            style={{
              textAlign: "center",
              marginBottom: "30px",
              marginTop: "20px"
            }}
          >
            PERSONAL CARE - SHOPEE
          </h1>
          <div className="row" id="chart1" style={chartBorder}>
            <div className="col-md-1 box">
              <div>Body Lotions & Butter</div>
            </div>
            <div className="col-md-6">
              <div className="graphHeader"> Share Amongt Best Sellers</div>
              <BarChartComponent />
            </div>

            <div className="col-md-5">
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

          <div className="row" id="chart2">
            <div className="col-md-6">
              <LineChartComponent />
            </div>

            <div className="col-md-5">
              <textarea
                placeholder="click here to type...."
                style={{ border: "0px", marginLeft: "25px" }}
                value={this.state.value}
                onChange={this.handleChange}
                cols={65}
                rows={10}
              />
            </div>
          </div>
          <div className="row" id="chart3">
            <div className="col-md-6">
              <BarChartComponent />
            </div>

            <div className="col-md-5">
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
          <div className="row" id="chart4">
            <div className="col-md-6">
              <BarChartComponent />
            </div>

            <div className="col-md-5">
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
          <div className="row" id="chart5">
            <div className="col-md-6">
              <LineChartComponent />
            </div>

            <div className="col-md-5">
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
          <div className="row" id="chart6">
            <div className="col-md-6">
              <LineChartComponent />
            </div>

            <div className="col-md-5">
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
          <div className="row" id="chart7">
            <div className="col-md-6">
              <LineChartComponent />
            </div>

            <div className="col-md-5">
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
          <div className="row" id="chart8">
            <div className="col-md-6">
              <BarChartComponent />
            </div>

            <div className="col-md-5">
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

        <div className="row" id="chart9">
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
