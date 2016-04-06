import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Content from './Content';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header title={ this.props.title } />
        <Content content={ this.props.content } text={ this.props.text } />
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

