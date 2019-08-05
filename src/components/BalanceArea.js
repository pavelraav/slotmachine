import React from 'react';

class BalanceArea extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
        <div>
          <input className="balance-area" value={this.props.balance} type="number" readOnly />
        </div>
    )
  }
}

export default BalanceArea;