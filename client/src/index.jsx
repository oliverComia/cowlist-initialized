import React from "react";
import ReactDOM from "react-dom";
import CowList from "./components/CowList.jsx";
import CowInfo from "./components/CowInfo.jsx";
const axios = require("axios");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cows: [],
      cowName: "",
      cowDesc: "",
      cowDetails: {},
      showCow: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setStateKeyAndValue = this.setStateKeyAndValue.bind(this);
    this.setShowCow = this.setShowCow.bind(this);
  }
  componentDidMount() {
    axios
      .get("/api/cows")
      .then((res) => {
        this.setState({
          cows: res.data,
        });
      })
      .catch((err) => console.log("Error in GET: ", err));
  }

  setStateKeyAndValue(key, value) {
    this.setState({
      [key]: value,
    });
  }

  setShowCow(info) {
    let tagValue, cowName, cowDetails;
    tagValue = Object.values(info.target);
    cowName = tagValue[1].children;
    this.state.cows.forEach((cow) => {
      if (cow.name === cowName) cowDetails = cow;
    });
    console.log("cowDetails", cowDetails);
    this.setStateKeyAndValue("cowDetails", cowDetails);
    this.setStateKeyAndValue("showCow", true);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post("/api/cows", {
        name: this.state.cowName,
        description: this.state.cowDesc,
      })
      .then((res) => {
        this.setStateKeyAndValue("cowName", "");
        this.setStateKeyAndValue("cowDesc", "");
        this.componentDidMount();
      })
      .catch((err) => {
        console.log("Error in POST: ", err);
      });
  }

  render() {
    return (
      <div>
        {this.state.showCow ? (
          <CowInfo cowDetails={this.state.cowDetails} />
        ) : null}
        <h1>Enter Cow Information:</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="cowName"
              value={this.state.cowName}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="cowDesc"
              value={this.state.cowDesc}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <ul>
          {this.state.cows.map((cow, index) => {
            return (
              <CowList cow={cow} key={index} setShowCow={this.setShowCow} />
            );
          })}
        </ul>
      </div>
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
