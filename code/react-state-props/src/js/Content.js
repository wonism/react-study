import React from 'react';

class Content extends React.Component {
  render() {
    return (
      <div>
        <h4 className='container'>{ this.props.content }</h4>
        <span>{ this.props.text }</span>
      </div>
    );
  };
};

Content.propTypes = {
  content: React.PropTypes.number,
  text: React.PropTypes.string.isRequired
};

export default Content;

