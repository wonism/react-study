import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Content from './Content';
import Counter from './Counter';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };

    this._incrementCounter = this._incrementCounter.bind(this);
  };

  _incrementCounter() {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <Header title={ this.props.title } />
        <Content content={ this.props.content } text={ this.props.text } />
        <Counter count={ this.state.count } incrementCounter={ this._incrementCounter } />
      </div>
    );
  };
};

App.defaultProps = {
  title: 'default header',
  content: 111,
  text: 'default text'
};

ReactDOM.render(<App />, document.getElementById('example'));
// ReactDOM.render(<App title="This is Title !" content="Content Blah~ Blah~" text="I'm Jaewon."  />, document.getElementById('example'));

