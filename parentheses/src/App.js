import React, { Component } from "react";
import "./App.css";
import Valid from "./Valid";
import Invalid from "./Invalid";

class App extends Component {
  constructor() {
    super();
    this.state = {
      code: "",
      valid: null
    };
  }
  handleChange = e => {
    this.setState({ code: e.target.value });
  };
  checkParentheses = () => {
    var parenthesesValid;
    var parentheses = [];
    const charachters = ["{", "}", "[", "]", "(", ")"];
    var codeArray = this.state.code.split("");
    for (let i = 0; i < codeArray.length; i++) {
      var index = charachters.indexOf(codeArray[i]);
      if (index >= 0) {
        if (index % 2 === 0) {
          parentheses.push(codeArray[i]);
        } else if (parentheses.length === 0) {
          this.setState({
            valid: false
          });
          document.body.classList.remove("valid");
          document.body.classList.add("invalid");
          return parenthesesValid;
        } else if (
          charachters[index - 1] === parentheses[parentheses.length - 1]
        ) {
          parentheses.pop();
        }
      }
    }
    if (parentheses.length === 0) {
      this.setState({ valid: true });
      document.body.classList.remove("invalid");
      document.body.classList.add("valid");
    } else {
      this.setState({ valid: false });
      document.body.classList.remove("valid");
      document.body.classList.add("invalid");
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    this.checkParentheses();
  };
  whichCOmponent = () => {
    if (this.state.valid) {
      return <Valid />;
    } else if (this.state.valid == false) {
      return <Invalid />;
    }
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Code Validator</h1>
        </header>
        <form className="form" onSubmit={this.handleSubmit}>
          <label>Paste code to validate</label>
          <textarea
            name="code"
            onChange={this.handleChange}
            className="form-text"
          />
          <input type="submit" value="Submit" className="form-submit" />
        </form>
        {this.whichCOmponent()}
      </div>
    );
  }
}

export default App;
