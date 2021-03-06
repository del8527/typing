import React, { Component } from 'react';
import './App.css';
import Preview from './Preview';
import Speed from './Speed';
import textGen from './textGen';

const initialState = {
  text: textGen(),
  userInput: '',
  symbols: 0,
  sec: 0,
  started: false, 
  finished: false,
}

class App extends Component {
  // initial state
  state = initialState;

  // when user presses Restart
  onRestart = () => {
    this.setState(initialState)
  }

  // When user types something
  onUserInputChange = (e) => {
    const v = e.target.value;
    this.setTimer()
    this.onFinish(v)
    this.setState({
      userInput: v,
      symbols: this.countCorrectSymbols(v)
    })
  }


  onFinish(userInput) {
    if (userInput === this.state.text) {
      clearInterval(this.interval); // stops timer
      this.setState({
        finished: true
      })
    }
  }

  countCorrectSymbols(userInput) {
    const text = this.state.text.replace(' ', '');
    return userInput.replace(' ', '').split('').filter((s,i) => s === text[i]).length;
  }

  setTimer() {
    if (!this.state.started) {
      this.setState({started: true});
      this.interval = setInterval(() => {
        this.setState(prevProps => {
          return {sec: prevProps.sec + 1}
        })
      }, 1000)
    }
  }

  render() {
    return (
      <div className = "container mt-5 mb-5">
        <div className = "row">
          <div className = "col-md-6 offset-md-3">
  
            <Preview text={this.state.text} userInput={this.state.userInput}/>
            <textarea
            value = {this.state.userInput}
            onChange = {this.onUserInputChange}
            className = "form-control mb-3"
            placeholder = "Type Here!"
            readOnly = {this.state.finished}
            ></textarea>
            <Speed sec={this.state.sec} symbols={this.state.symbols}/>
            
            <div className = "text-right">
              <button className = "btn btn-light" onClick = {this.onRestart}> Restart </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
