import React from 'react';

class List extends React.Component {
  render () {
    return (
      <div>
        This Is List!<br />
        Hello, { this.props.name }!
      </div>
    );
  };
};

module.exports = List;

