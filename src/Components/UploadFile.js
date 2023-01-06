import React from "react";
import axios from "axios";
import "./Upload.css";

class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file1: "" };
    this.state = { msg: "" };
    this.state = { file2: "" };
    this.state = { error: "" };
    this.state = { disabled: true };
  }

  onFileChange1 = (event) => {
    this.setState({
      file1: event.target.files[0],
    });
  };
  onFileChange2 = (event) => {
    this.setState({
      file2: event.target.files[0],
    });
  };

  uploadFileData = (event) => {
    event.preventDefault();
    this.setState({ msg: "" });

    let data = new FormData();
    data.append("file1", this.state.file1);
    data.append("file2", this.state.file2);

    axios
      .post("http://localhost:9090/upload2", data)
      .then((response) => {
        console.log(response);
        this.setState({ msg: "File successfully uploaded" });
        this.setState({ disabled: false });
        // alert("Uploaded Successfully");
      })
      .catch((err) => {
        this.setState({ error: err });
      });
  };

  // fetch("http://localhost:9090/upload2", {
  //   method: "POST",
  //   body: data,
  // })
  //   .then((response) => {
  //     console.log(response);
  //     this.setState({ msg: "File successfully uploaded" });
  //     // alert("Uploaded Successfully");
  //     this.setState({ disabled: false });
  //   })
  //   .catch((err) => {
  //     this.setState({ error: err });
  //   });

  // if (this.state.msg == "File successfully uploaded") {
  //   this.setState({ disabled: false });
  // }
  //   };

  downloadFileData = (event) => {
    fetch("http://localhost:9090/download", {
      method: "GET",
    })
      .then((response) => {
        this.setState({ msg: "File successfully downloaded" });
      })
      .catch((err) => {
        this.setState({ error: err });
      });
  };

  render() {
    return (
      <div id="container">
        <h1>File Upload Example using React</h1>
        <h3>Upload a File</h3>
        <h4>{this.state.error}</h4>
        <h4>{this.state.msg}</h4>
        <input onChange={this.onFileChange1} type="file"></input>
        <input onChange={this.onFileChange2} type="file"></input>
        <button onClick={this.uploadFileData}>Upload</button>
        <a href="http://localhost:9090/download">
          <button
            disabled={this.state.disabled}
            onClick={this.downloadFileData}
          >
            Download
          </button>
        </a>
      </div>
    );
  }
}

export default UploadFile;
