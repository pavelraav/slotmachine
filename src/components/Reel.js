import React from 'react';

class Reel extends React.Component {  
    constructor(props){
      super(props);
      this.state = {
        position: 0,
        lastPosition: null,
        speed: 0,
        timeRemaining: 0
      }
      this.spin = this.spin.bind(this);
      this.moveBackground = this.moveBackground.bind(this);
      this.tick = this.tick.bind(this);
      this.getSpeedModifier = this.getSpeedModifier.bind(this);
      this.getStartPosition = this.getStartPosition.bind(this);
      this.getPositionFromDebugReel = this.getPositionFromDebugReel.bind(this);
      this.debugHelper = this.debugHelper.bind(this);
      this.getSymbolFromFinalPosition = this.getSymbolFromFinalPosition.bind(this);
    };

    static iconHeight = 121;

    componentDidMount() {
      const startingPosition = this.getStartPosition();
      this.setState({
        position: startingPosition,
      });
    }
  
    spin = () => {
      if (this.props.debug) {
        let final_pos = this.getPositionFromDebugReel(this.props.debug_reel[0], this.props.debug_reel[1]);
        this.props.onFinish(this.getSymbolFromFinalPosition(final_pos));
        this.setState({ position: final_pos});
      }
      else {
        this.getSpeedModifier();
        if (this.timer) { 
          clearInterval(this.timer); 
        }     
        const start = this.getStartPosition();   
        this.setState({
          position: start,
          timeRemaining: this.props.timer        
        });
        this.timer = setInterval(() => {
          this.tick()
        }, 100);
      }     
    }

    //"Moves" the background to create a looping effect. This is achieved thanks to the repeat-y property in App.css which causes the background image to repeat infinitely.
    //Every "tick" we "move" downwards on the y axis with the final position on the axis used to calculate the current displayed symbol.
    moveBackground = () => {
      this.setState({
        position: this.state.position - this.state.speed,
        timeRemaining: this.state.timeRemaining - 100
      })
    }
  
    tick = () => {      
      if (this.state.timeRemaining <= 0) {
        clearInterval(this.timer);  
        this.props.onFinish(this.getSymbolFromFinalPosition(this.state.position));    
      } else {
        this.moveBackground();
      }      
    }

    getSpeedModifier = () => {
      const possible_speeds =  [1.5, 2.5, 3.5, 4.5];
      let result = Reel.iconHeight * possible_speeds[Math.floor(Math.random() * possible_speeds.length)];
      this.setState({speed: result});
    }
  
    getStartPosition = () => {
      const possible_starts =  [0, -60.5, -121, -181.5, -242, -302.5, -363, -423.5, -484, -544.5];
      let result = possible_starts[Math.floor(Math.random() * possible_starts.length)];
      return result;
    }

    //Gets the y-coordinate for the symbol selected in debug mode. Used to display correct symbol and calculate winnings.
    getPositionFromDebugReel = (line, symbol) => {
      if (symbol === "cherry") {
        return this.debugHelper(line, -363);
      }
      else if (symbol === "seven") {
        return this.debugHelper(line, -242);
      }
      else if (symbol === "3bar") {
        return this.debugHelper(line, -484);
      }
      else if (symbol === "2bar") {
        return this.debugHelper(line, -121);
      }
      else if (symbol === "1bar") {
        return this.debugHelper(line, 0);
      }
    }

    debugHelper = (line, symbol_position) => {
        if (line === "mid") {
          return symbol_position;
        }
        else if (line === "top") {
          return symbol_position -= 60.5;
        }
        else if (line === "bot") {
          if (symbol_position === 0) {
            return -544.5; //This is an edge case for 1bar being on bottom reel. Because if we add 60.5 to 0, we get the wrong result (look at getSymbolFromFinalPosition)
          }
          else {
            return symbol_position += 60.5;
          }
        }
    }

    /*Possible results are 0, 60.5, 121, 181.5, 242, 302.5, 363, 423.5, 484, 544.5
    Function gets symbol from the final y-coordinate after the reel has stopped spinning. To make it a bit more readable, 
    the y-coordinates here are translated into a positive number.*/
    getSymbolFromFinalPosition = (fin_position) => {
      const symbol = Math.abs(fin_position % 605);
      const result = [];
      switch (symbol) {
        case 0:
          result.push("1bar");
          break;
        case 60.5:
          result.push("1bar");
          result.push("2bar");
          break;
        case 121:
          result.push("2bar");
          break;
        case 181.5:
          result.push("2bar");
          result.push("seven");
          break;
        case 242:
          result.push("seven");
          break;
        case 302.5:
          result.push("seven");
          result.push("cherry");
          break;
        case 363:
          result.push("cherry");
          break;
        case 423.5:
          result.push("cherry");
          result.push("3bar");
          break;
        case 484:
          result.push("3bar");
          break;
        case 544.5:
          result.push("3bar");
          result.push("1bar");
      }
      return result;
    }

    render() {
      return (            
        <div 
          style={{backgroundPosition: '0px ' + this.state.position + 'px'}}
          className={`icons`}          
        />
      )
    }
  }

  export default Reel;