import React from "react";
import jsPDF from "jspdf";
class ReportGenerator extends React.Component {
  state = {};

  generateReport = () => {
    let canvas = this.props.canvas;
    let wid, hgt;
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
  };
  render() {
    return (
      <div>
        <button
          className="btn btn-primary"
          onClick={() => this.generateReport()}
        >
          Export as PDF
        </button>
      </div>
    );
  }
}

export default ReportGenerator;
