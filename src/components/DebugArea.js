import React from 'react';
import DebugButton from './DebugButton';
import cherry from '../assets/Cherry.png';
import seven from '../assets/7.png';
import threebar from '../assets/3xBAR.png';
import twobar from '../assets/2xBAR.png';
import bar from '../assets/BAR.png';

class DebugArea extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show_line1: true,
      show_symbols1: false,
      show_line2: false,
      show_symbols2: false,
      show_line3: false,
      show_symbols3: false,
      selected: ""
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  //Sends info about the clicked line to parent component (App)  
  handleClick = (reel, line) => {
      this.props.getDebugInputs([reel,line]);
      this.updateState(reel, "line");
      let selected_line = this.state.selected + "Reel: " + reel + ", " + line + " line ";
      this.setState({selected: selected_line});

  }

  //Sends info about the clicked symbol to parent component (App)  
  handleImageClick = (reel, symbol) => {
     this.props.getDebugInputs([reel,symbol]); 
     this.updateState(reel, "symbol");  
     let selected_symbol = this.state.selected + " - " + symbol + ". ";
     this.setState({selected: selected_symbol});
  }

  updateState = (reel, item) => {
    if (reel === 1) {
      if (item === "line") {
        this.setState({show_line1: false});
        this.setState({show_symbols1: true});
      }
      else {
        this.setState({show_symbols1: false});
        this.setState({show_line2: true});
      }
    }
    else if (reel === 2) {
      if (item === "line") {
        this.setState({show_line2: false});
        this.setState({show_symbols2: true});
      }
      else {
        this.setState({show_symbols2: false});
        this.setState({show_line3: true});
      }     
    }
    else {
      if (item === "line") {
        this.setState({show_line3: false});
        this.setState({show_symbols3: true});
      }
      else {
        this.setState({show_symbols3: false});
      }     
    }
  } 

  //Ideally it would be good to create an extra component between DebugArea and DebugButton that would contain all the DebugButtons to avoid code repetition seen in this component. Similar approach would be nice for the line buttons.
  render() {
    return (
        <div className={`debug-container`}>
          {this.state.show_line1 ? <span>Select line and symbol for each reel. To select again - restart debug. Don't forget to disable debug if you want to spin normally again!</span> : null}
          {this.state.show_line1 ? <div className={`change`}> <button className={`debug-line-button`} onClick={this.handleClick.bind(this, 1, "top")} >Top</button><button className={`debug-line-button`} onClick={this.handleClick.bind(this, 1, "mid")} >Mid</button><button className={`debug-line-button`} onClick={this.handleClick.bind(this, 1, "bot")} >Bottom</button> </div> : null}
          {this.state.show_symbols1 ? <div className={`change`}> <DebugButton reel={1} image={cherry} alternate={"cherry"} handleImageClick={this.handleImageClick}/> <DebugButton reel={1} image={seven} alternate={"seven"} handleImageClick={this.handleImageClick}/> <DebugButton reel={1} image={threebar} alternate={"3bar"} handleImageClick={this.handleImageClick}/> <DebugButton reel={1} image={twobar} alternate={"2bar"} handleImageClick={this.handleImageClick}/> <DebugButton reel={1} image={bar} alternate={"1bar"} handleImageClick={this.handleImageClick}/></div> : null}
          {this.state.show_line2 ? <div className={`change`}> <button className={`debug-line-button`} onClick={this.handleClick.bind(this, 2, "top")} >Top</button><button className={`debug-line-button`} onClick={this.handleClick.bind(this, 2, "mid")} >Mid</button><button className={`debug-line-button`} onClick={this.handleClick.bind(this, 2, "bot")} >Bottom</button> </div> : null}
          {this.state.show_symbols2 ? <div className={`change`}> <DebugButton reel={2} image={cherry} alternate={"cherry"} handleImageClick={this.handleImageClick}/> <DebugButton reel={2} image={seven} alternate={"seven"} handleImageClick={this.handleImageClick}/> <DebugButton reel={2} image={threebar} alternate={"3bar"} handleImageClick={this.handleImageClick}/> <DebugButton reel={2} image={twobar} alternate={"2bar"} handleImageClick={this.handleImageClick}/> <DebugButton reel={2} image={bar} alternate={"1bar"} handleImageClick={this.handleImageClick}/></div> : null}
          {this.state.show_line3 ? <div className={`change`}> <button className={`debug-line-button`} onClick={this.handleClick.bind(this, 3, "top")} >Top</button><button className={`debug-line-button`} onClick={this.handleClick.bind(this, 3, "mid")} >Mid</button><button className={`debug-line-button`} onClick={this.handleClick.bind(this, 3, "bot")} >Bottom</button> </div> : null}
          {this.state.show_symbols3 ? <div className={`change`}> <DebugButton reel={3} image={cherry} alternate={"cherry"} handleImageClick={this.handleImageClick}/> <DebugButton reel={3} image={seven} alternate={"seven"} handleImageClick={this.handleImageClick}/> <DebugButton reel={3} image={threebar} alternate={"3bar"} handleImageClick={this.handleImageClick}/> <DebugButton reel={3} image={twobar} alternate={"2bar"} handleImageClick={this.handleImageClick}/> <DebugButton reel={3} image={bar} alternate={"1bar"} handleImageClick={this.handleImageClick}/></div> : null}
            <span>{this.state.selected}</span>
        </div>
    )
  }
}

export default DebugArea;