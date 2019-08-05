import React from 'react';
import cherry from '../assets/Cherry.png';
import seven from '../assets/7.png';
import threebar from '../assets/3xBAR.png';
import twobar from '../assets/2xBAR.png';
import bar from '../assets/BAR.png';

class PayTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
        <div className={`paytable-container`}>
            <div className={`cherry-container`}>
                <div className={this.props.winSums.includes(2000) ? `cherry-text-blink`: `cherry-text`}>3x <img className="paytable-image" src={cherry} alt="Cherry" />TOP LINE = $2000 </div>
                <div className={this.props.winSums.includes(1000) ? `cherry-text-blink`: `cherry-text`}>3x <img className="paytable-image" src={cherry} alt="Cherry" />CENTER LINE = $1000 </div>
                <div className={this.props.winSums.includes(4000) ? `cherry-text-blink`: `cherry-text`}>3x <img className="paytable-image" src={cherry} alt="Cherry" />BOTTOM LINE = $4000 </div>
            </div>
            <div>
                <div className={this.props.winSums.includes(150) ? `paytable-text-blink`: `paytable-text`}>3x <img className="paytable-image" src={seven} alt="seven" /> = $150 </div>
                <div className={this.props.winSums.includes(75) ? `paytable-text-blink`: `paytable-text`}>?x <img className="paytable-image" src={seven} alt="seven" /> + ?x <img className="paytable-image" src={cherry} alt="cherry" /> = $75 </div>
                <div className={this.props.winSums.includes(50) ? `paytable-text-blink`: `paytable-text`}>3x <img className="paytable-image" src={threebar} alt="3bar" /> = $50 </div>
            </div>
            <div>
                <div className={this.props.winSums.includes(20) ? `paytable-text-blink`: `paytable-text`}>3x <img className="paytable-image" src={twobar} alt="2bar" /> = $20 </div>
                <div className={this.props.winSums.includes(10) ? `paytable-text-blink`: `paytable-text`}>3x <img className="paytable-image" src={bar} alt="1bar" /> = $10 </div>
                <div className={this.props.winSums.includes(5) ? `paytable-text-blink`: `paytable-text`}>?x <img className="paytable-image" src={threebar} alt="3bar" /> + ?x <img className="paytable-image" src={twobar} alt="2bar" /> + ?x <img className="paytable-image" src={bar} alt="bar" /> = $5 </div>
            </div>
        </div>
    )
  }
}

export default PayTable;