import React from 'react';

/***** Using State in Counter Component *****/
/*
class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };
  };

  _incrementCounter() {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
      <span>{ this.state.count }</span>
      <button onClick={ this._incrementCounter.bind(this) }>Update</button>
      </div>
    );
  };
};
*/

/***** Using State in Root Component *****/
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this._increment = this._increment.bind(this);
  };

  _increment() {
    this.props.incrementCounter();
  };

  render() {
    return (
      <div>
        <span> { this.props.count }</span>
        <button onClick={ this._increment }>Click !</button>
      </div>
    );
  };
};

export default Counter;

