import React from 'react';

class DebugButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleClick = this.handleClick.bind(this);
  }

  //Sends info about the clicked symbol to parent component (DebugArea)  
  handleClick = (reel, symbol) => {
      this.props.handleImageClick(reel, symbol);
  }

  render() {
    const reel = this.props.reel;
    const image = this.props.image;
    const alternate = this.props.alternate;
    return (
        <button onClick={this.handleClick.bind(this, reel, alternate)} ><img className="debug-button" src={image} alt={alternate} /></button>
    )
  }
}

export default DebugButton;