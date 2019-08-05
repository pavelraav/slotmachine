import React from 'react';
import Reel from './components/Reel.js';
import BalanceArea from './components/BalanceArea.js';
import PayTable from './components/PayTable.js';
import DebugArea from './components/DebugArea.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      final_state: false, //final_state: true = win,  final_state: false: loss. Used to disable and enable buttons.
      balance: 1,
      debug: false,
      debug_reel1: [],
      debug_reel2: [],
      debug_reel3: [],
      display_winline1: false,
      display_winline2: false,
      display_winline3: false,
      winSums: []
    }
    this.play = this.play.bind(this);
    this.finishHandler = this.finishHandler.bind(this)
    this.debugHandler = this.debugHandler.bind(this)
    this.getDebugInputs = this.getDebugInputs.bind(this)
    this.balanceInputHandler = this.balanceInputHandler.bind(this)
    this.calculateScore = this.calculateScore.bind(this)
    this.emptyArray = this.emptyArray.bind(this)
  }

  static finalResults= [];

  play = () => {
    if (this.state.balance > 0) {
      const updated_balance = this.state.balance - 1;
      this.setState({ balance: updated_balance });
      this.setState({ final_state: null });
      this.setState({ display_winline1: false });
      this.setState({ display_winline2: false });
      this.setState({ display_winline3: false });
      this.setState({ winSums: []});
      this.emptyArray();
      this._child1.spin();
      this._child2.spin();
      this._child3.spin();
    }
    else {
      alert("Out of coins! (Psst: You can add more by using the 'Add Balance' button ;))");
    }
  }

  //handles the spin results from each reel
  finishHandler = (value) =>{
    App.finalResults.push(value);
    if (App.finalResults.length === 3) {
      this.calculateScore();
      this.setState({debug_reel1: []});
      this.setState({debug_reel2: []});
      this.setState({debug_reel3: []});
    }
  }
  
  debugHandler = () => {
    this.setState({debug: !this.state.debug});
    this.setState({ winSums: []});
  }

  getDebugInputs = (input) => {
    if (input[0] === 1 ) {
      this.setState({debug_reel1: [...this.state.debug_reel1, input[1]]});
    }
    else if (input[0] === 2 ) {
      this.setState({debug_reel2: [...this.state.debug_reel2, input[1]]});
    } 
    else if (input[0] === 3 ) {
      this.setState({debug_reel3: [...this.state.debug_reel3, input[1]]});
    }
  }

  balanceInputHandler = () => {
    const input = prompt("Enter amount of coins (1 to 5000) to add to the slot machine");
    if (parseInt(input) >= 1 && parseInt(input) <= 5000) {
      const updated_balance = this.state.balance + parseInt(input);
      this.setState({balance: updated_balance});
    }
  }

  calculateScore = () =>  {
    const res = App.finalResults;
    //check if we have any lines
    if (res.every(element => element.length === res[0].length)) {
      //check if we have one line or two lines
      if (res[0].length === 1) {
        let winSum = 0;
        //Middle line winnings
        if (res.every(element => element[0] === "cherry")) {
          winSum = 1000;
        }
        else if (res.every(element => element[0] === "seven")) {
          winSum = 150;
        }
        else if (res.every(element => element[0] === "seven")) {
          winSum = 150;
        } 
        else if (res.every(element => element[0] === "cherry" || element[0] === "seven")) {
          winSum = 75;
        }
        else if (res.every(element => element[0] === "3bar")) {
          winSum = 50;
        }
        else if (res.every(element => element[0] === "2bar")) {
          winSum = 20;
        }  
        else if (res.every(element => element[0] === "1bar")) {
          winSum = 10;
        }
        else if (res.every(element => element[0] === "3bar" || element[0] === "2bar" || element[0] === "1bar")) {
          winSum = 5;
        }
        if (winSum > 0) {
          this.setState({final_state: true});
          this.setState({balance: this.state.balance += winSum});
          this.setState({winSums: [...this.state.winSums, winSum]});
          this.setState({display_winline2: true});
        }
        else {
          this.setState({final_state: false});
        }    
      }
      else {
        let top_winsum = 0;
        let bot_winsum = 0;
        //Top line winnings
        if (res.every(element => element[0] === "cherry")) {
          top_winsum = 2000;
        }
        else if (res.every(element => element[0] === "seven")) {
          top_winsum = 150;
        }
        else if (res.every(element => element[0] === "seven")) {
          top_winsum = 150;
        } 
        else if (res.every(element => element[0] === "cherry" || element[0] === "seven")) {
          top_winsum = 75;
        }
        else if (res.every(element => element[0] === "3bar")) {
          top_winsum = 50;
        }
        else if (res.every(element => element[0] === "2bar")) {
          top_winsum = 20;
        }  
        else if (res.every(element => element[0] === "1bar")) {
          top_winsum = 10;
        }
        else if (res.every(element => element[0] === "3bar" || element[0] === "2bar" || element[0] === "1bar")) {
          top_winsum = 5;
        }
        //Bottom line winnings
        if (res.every(element => element[1] === "cherry")) {
          bot_winsum = 4000;
        }
        else if (res.every(element => element[1] === "seven")) {
          bot_winsum = 150;
        }
        else if (res.every(element => element[1] === "seven")) {
          bot_winsum = 150;
        } 
        else if (res.every(element => element[1] === "cherry" || element[1] === "seven")) {
          bot_winsum = 75;
        }
        else if (res.every(element => element[1] === "3bar")) {
          bot_winsum = 50;
        }
        else if (res.every(element => element[1] === "2bar")) {
          bot_winsum = 20;
        }  
        else if (res.every(element => element[1] === "1bar")) {
          bot_winsum = 10;
        }
        else if (res.every(element => element[1] === "3bar" || element[1] === "2bar" || element[1] === "1bar")) {
          bot_winsum = 5;
        }

        if (top_winsum > 0) {
          this.setState({final_state: true});
          this.setState({balance: this.state.balance += top_winsum});
          this.setState({display_winline1: true});
        }
        if (bot_winsum > 0) {
          this.setState({final_state: true});
          this.setState({balance: this.state.balance += bot_winsum});
          this.setState({display_winline3: true});
        }
        if (top_winsum === 0 && bot_winsum === 0) {
          this.setState({final_state: false});
        }
        this.setState({winSums: [...this.state.winSums, top_winsum, bot_winsum]});
      }
    }
    else {
      this.setState({final_state: false});
    }
  }

  emptyArray = () => {
    App.finalResults = [];
  }

  render() {
    return (
      <div>
        <div><BalanceArea balance={this.state.balance} /><span className={`currency-symbol`}>$</span></div>
        <div><PayTable winSums={this.state.winSums} key={this.state.winSums}/></div>
        <div>
            <div>{this.state.final_state === null ? null : <button  className={`debug-activator`} onClick={this.debugHandler}>Debug on/off</button>}</div>
            <div>{this.state.debug ? <DebugArea getDebugInputs={this.getDebugInputs} /> : null}</div>
        </div>
            <div>{this.state.final_state === null ? null : <button className={`balance-input`} onClick={this.balanceInputHandler}>Add balance</button>}</div>
        <div className={`reel-container`}>
          <Reel debug={this.state.debug} debug_reel={this.state.debug_reel1} onFinish={this.finishHandler} ref={(child) => { this._child1 = child; }} timer="2000" />
          <Reel debug={this.state.debug} debug_reel={this.state.debug_reel2} onFinish={this.finishHandler} ref={(child) => { this._child2 = child; }} timer="2500" />
          <Reel debug={this.state.debug} debug_reel={this.state.debug_reel3} onFinish={this.finishHandler} ref={(child) => { this._child3 = child; }} timer="3000" />
          <div className="gradient-fade"></div>
        </div>
        <hr className={`winline1`}></hr>
        <hr className={`winline2`}></hr>
        <hr className={`winline3`}></hr>
        <hr className={`winline4`}></hr>
        <hr className={`winline5`}></hr>
        <hr className={`winline6`}></hr>
        {this.state.display_winline1 ? <hr className={`red-winline1`}></hr> : null }
        {this.state.display_winline2 ? <hr className={`red-winline2`}></hr> : null }
        {this.state.display_winline3 ? <hr className={`red-winline3`}></hr> : null }
        <div>{this.state.final_state === null ? null : <button className={`spin-button`} onClick={this.play}>Spin!</button>}</div>
      </div>
    );
  }
}  

export default App;
