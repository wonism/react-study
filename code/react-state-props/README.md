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
  };
};

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
  - [more informations](https://facebook.github.io/react/docs/reusable-components.html#prop-validation)
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

__state__
- state 는 텍스트 필드 같은 컴퍼넌트 내에서 사용자 인터렉션에 따라
  변경되는 값을 관리할 때 주로 사용한다.
- state 를 사용하는 컴퍼넌트의 개수는 최소화해야 한다.
- (n 개의 유동적인 데이터를 사용할 경우, 각 데이터에서 state 를 사용하는게 아닌, n 개의 props 와 이를 포함하는 container 컴퍼넌트에 state 를 사용하는게 좋다. 최상위 컴포넌트만 State를 갖게 하고, 하위 컴포넌트는 전부 Prop만을 가지는 Immutable한 컴포넌트로 구성하여 어떤 변경이 있을 때 최상위 컴포넌트에서 setState()하여 rerender 하는 설계가 가능하기 때문)
- AJAX 로 데이터를 요청하고 성공 시 콜백 함수에서 응답 데이터를
  setState() 하는 방식으로도 사용함.
- state 값을 프로퍼티로 접근하여 변경하면 안 되고, 반드시 setState()를
  통해 갱신해야 한다.
- (setState() 가 호출되어야 rerender 되기 때문)
- (만약, this.state.list 라는 배열이 있고 list 에 요소를 추가하고 싶은 경우도 push() 하고 setState() 하는 것이 아니라 this.setState({ list: this.state.list.concat([value] }) 로 새로운 값(배열)을 지정하는 것이 좋다. 이 방법이 shouldComponentUpdate() 로 성능 최적화 할 때와 undo 의 구현 시에 좀 더 유용하기 때문)
```js
import React from 'react';

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
      <button onClick={ this._incrementCounter.bind(this)
}>Update</button>
      </div>
    );
  };
};

export default Counter;
```
- state 의 초기 값을 설정할 때는 class 생성자 메소드(constructor) 에서 this.state = { } 를 사용한다.
- state 를 렌더링 할 때는 { this.state.stateName } 을 사용한다.
- state 를 업데이트 할 때는 this.setState() 를 사용한다.

__State & Props__
```js
/***** Counter.js *****/
import React from 'react';

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
```
- 위 컴퍼넌트에서는 2가지의 props을 사용한다.
  - count : 카운트
  - incrementCounter : App 컴퍼넌트에 정의된 메소드를 수행할 수 있는 prop.
- 버튼을 클릭하면 &#95;increment를 수행한다.
```js
/***** App.js *****/
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
        <Content content={ this.props.content } text={ this.props.text }
/>
        <Counter count={ this.state.count } incrementCounter={
this._incrementCounter } />
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
```
- &#95;incrementCounter() 메소드에서 this.setState 에 접근할 수 있도록 bind 한다.

