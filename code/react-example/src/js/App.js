import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';

class Hello extends React.Component {
  render() {
    return (
      <div className='greeting'>
        <List name={ this.props.name } />
      </div>
    );
  };
};

ReactDOM.render(
  <Hello name="jaewon" />,
  document.getElementById('example')
);

