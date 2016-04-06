# react-tutorial

__props__
- 컴퍼넌트에서 immutable 한 데이터가 필요할 때, props 를 사용한다.
- render 메소드 안에 { this.props.propsName } 형식으로 사용하고,
  컴퍼넌트를 사용할 때에는 &lt; &gt; 안에 propsName = value 로써 값을
초기화한다.
```js
import React from 'react';

class Header extends React.Component {
  render(){
    return (
      <h1>{ this.props.title }</h1>
    );
  }
}

export default Header;
```
- props 값을 지정해주지 않을 경우 사용될 default 값을 설정하기 위해서는
  ClassName.defaultProps = { propsName: propsValue } 을 사용한다.
```js
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
  content: 'default content',
  text: 'default text'
};

ReactDOM.render(<App />, document.getElementById('example'));
```
- Type Validation
  - 컴퍼넌트에서 props 의 Type 과 실제 전달된 Type 이 일치하지 않을 때,
    에러를 발생시키려면 propTypes 를 설정한다.
  - propTypes 는 Type 지정 뿐만 아니라, 'isRequired'를 통해 필수 props 를 지정할 수도 있다.
  - title 의 propTypes 는 number
  - text 는 isRequired 지정을 하면,
  - Warning: Failed propType: Invalid prop `content` of type `string`
    supplied to `Content`, expected `number`. Check the render method of
`App`.
  - Warning: Failed propType: Required prop `text` was not specified in
    `Content`. Check the render method of `App`.
  - 와 같은 에러가 발생한다.
```js
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
```

