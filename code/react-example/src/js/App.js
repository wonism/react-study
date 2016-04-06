var React = require("react");
var ReactDOM = require("react-dom");

var List = require("./List");
var Hello = React.createClass({
  render: function(){
    return (
      <div className="greeting">
        <List name={ this.props.name } />
      </div>
    )
  }
});

ReactDOM.render(
  <Hello name="Jaewon" />,
  document.getElementById("example")
);

