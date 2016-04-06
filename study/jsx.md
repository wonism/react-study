__JSX__
- react 는 일반 JSX 문법을 사용하여 UI 를 템플릿으로 만든다. JSX 의
  사용은 필수는 아니지만, 사용하게 되면 여러가지 이점이 있다.
  - 컴파일되면서 최적화가 된다.
  - Type-safe 하다.
  - HTML 과 비슷한 형태를 가지므로, 비엔지니어도 이해하기 쉽다.

__JSX 사용__
```js
var React = require('react');

var Hello = React.createClass({
  render: function () {
    return (
      <div className="container">Hello { this.props.name }</div>
    );
  }
});

React.render(
  <Hello name="React" />,
  document.getElementById("app")
);
```
이 코드를 브라우저에서 실행하기 위해서는 react-tools를 사용하여 사전에 컴파일하거나, JSXTransformer를 불러와야 한다.
또는 browserify와 reactify를 조합해서 사용하는 방법도 있다.
&lt;div&gt;...&lt;/div&gt;' 부분은 HTML의 마크업이 아니라, JSX 문법이다.
- [JSX Specification](https://facebook.github.io/jsx/)에서 자세한 내용을
볼 수 있다.
  - 이 때, 중요한 점은 &lt;div&gt;...&lt;/div&gt;는 HTML 마크업이 아니므로 'container'라는 클래스를 지정하기 위해서 &lt;div class="container"&gt;...&lt;/div&gt;가 아닌 &lt;div className="container"&gt;...&lt;/div&gt;와 같은 방식을 사용해야 한다.
  - Java Script의 Keyword 문제에서 벗어나기 위해 이런 방식으로 고안되었다.
  - label 태그의 for는 htmlFor로 작성해야 한다.

__JSX 미사용__
```js
var React = require('react');

var Hello = React.createClass({
  render: function () {
    return React.DOM.div({ className: 'container', 'Hello ' + this.props.name);
  }
});

React.render(
  React.createFactory(Hello)({ name: 'React' }),
  document.getElementById("app")
);
```
Hello 컴퍼넌트의 render 메소드 및 컴퍼넌트 전달 방식이 바뀌었다.

__JSX 사용 방법__
- JSX Transformer
  - JSX Transformer 를 이용하면 실시간 변환이 가능하다. 하지만, production 환경에서 사용하는 것은 성능면에서 좋지 않기 때문에 development 환경에서만 사용하길 권장한다.

- Precompile
  - 먼저, react-tools를 설치하면 jsx 명령을 사용할 수 있다.
  - '--watch' 옵션을 사용하면 파일을 감시하는 것도 가능하다.
```bash
$ npm install -g react-tools
```

```bash
$ jsx src/build/
```

```bash
$ jsx --watch src/build/
```

- browserify / webpack
```js
"browserify": {
  "transform": [
    ["reactify", {"harmony": true} ]
  ]
}
```

- node-jsx
  - Node.js 환경에서 변환하고 싶은 경우에는 node-jsx를 사용하면 된다.


__JSX 사용 예제 with ES6__
```js
/***** App.js *****/
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

ReactDOM.render(<Hello name="jaewon" />,
document.getElementById('example'));
```
- import XXX from 'xxx';
  - var XXX = require('xxx');와 같다.
- class XXX extends xxx
  - Prototype 을 사용하지 않고도, 객체 지향적으로 코딩을 할 수 있게끔
    해준다.
- render
  - 컴퍼넌트에 렌더링될 데이터를 정의한다.
- return ( &lt;Components&gt; );
  - JSX 문법을 native Java Script 로 변환해준다.
  - * div, h1 등은 Tag가 아니라 react 에서 미리 정의된 컴퍼넌트다.
- 컴퍼넌트 중첩
  - 렌더링할 컴퍼넌트를 return 하는 과정에서 n 개의 동위 레벨의 노드하기
    위해서는 반드시 parent node 로 이 n 개의 노드들을 감싸야 한다.
  - 그렇지 않을 경우, JSX 변환 과정에서 에러가 발생한다.
```js
/***** Nested-element.js *****/
import React from 'react';
import ReactDOM from 'react-dom';

class NestedElement extends React.Component {
  render() {
    return (
      <h1>first element</h1>
      <h2>last element</h2>
    );
  };
};
```
```js
ERROR in ./src/js/Nested-element.js
Module build failed: SyntaxError:
/Users/wonism/project/react/react-tutorial/code/react-example/src/js/Nested-element.js:
Adjacent JSX elements must be wrapped in an enclosing tag (line:column)
    return (
      <h1>first element</h1>
      <h2>last element</h2>
    );
  };
};
```
```js
/***** Nested-element.js *****/
import React from 'react';
import ReactDOM from 'react-dom';

class NestedElement extends React.Component {
  render() {
    return (
      <div>
        <h1>first element</h1>
        <h2>last element</h2>
      </div>
    );
  };
};
```
- Java Script Expression
  - Java Script 의 값이나 객체들을 사용하려면 '{ }'로 감싸면 된다.
```js
/***** Java-script-expression.js *****/
import React from 'react';
import ReactDOM from 'react-dom';

class JavaScriptExpression extends React.Component {
  render() {
    var text = text';
    return  (
      <div>
        <h1> I am a { text }.</h1>
      </div>
    );
  };
};
```
- Method
  - onClick property를 추가하여 해당 컴퍼넌트 클릭 시 함수가 실행되도록 할
  수 있다.
  - react 의 모든 이벤트는 통합적인 이벤트 시스템의 구현으로 모든
  브라우저에서 같은 행동이 보장된다.
  - 코드를 고성능으로 유지하고 이해하기 쉽게 하기 위해, react 는 보이지
    않는 곳에서 몇 가지 일을 수행한다.
    - 오토바인딩: JavaScript에서 콜백을 만들 때, 보통은 this의 값이 정확하도록 명시적으로 메소드를 인스턴스에 바인드해야 하는데, react 에서는 모든 메소드가 자동으로 react 의 컴포넌트 인스턴스에 바인드된다.
    - react 가 바인드 메소드를 캐시하기 때문에 매우 CPU와 메모리에
      효율적이다.
    - 이벤트 델리게이션 : react 는 실제로는 노드자신에게 이벤트 핸들러를 붙이지 않는다. react 가 시작되면 react 는 탑 레벨의 단일 이벤트 리스너로 모든 이벤트를 리스닝하기 시작한다.
    - react 는 자동으로 최상위 요소에만 이벤트를 등록하고 그곳에서
      이벤트를 취합하여 내부에서 관리하며 이벤트를 발행한다.
    - 이 때, 캡쳐링 버블링이 되는데 각 리스너마다 SyntheticEvent 의
      객체가 만들어지기 때문에 메모리의 allocate 를 여러번 할 필요가
있다.
    - 이 문제를 해결하기 위해 react 는 객체를 pool 로 관리하고
      재사용하여 GC의 횟수를 줄이도록 구현되었다.
    - * DOM 에 설정된 data-reactid 를 사용해서 매핑하고 있는 것 같다.
      (개인적인 생각)
```js
/***** Use-method.js *****/
import React from 'react';
import ReactDOM from 'react-dom';

class UseMethod extends React.Component {
  fireOnClick() {
     alert("hey");
  };

  render() {
    return  (
      <div>
        <h1> Click The Button !</h1>
        <button onClick={ this.fireOnClick }>Click Me</button>
      </div>
    );
  };
};
```
- If &#8208; Else
  - JSX 안의 Java Script Expresssion 에서는 If, Else 사용이 불가능하다.
  - 대신, 삼중연산자를 이용한다.
```js
/***** Hello.js *****/
import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';

class Hello extends React.Component {
  render() {
    return (
      <div className='greeting'>
        <List name={ false ? this.props.name : "I'm false" } />
      </div>
    );
  };
};

ReactDOM.render(
  <Hello name="jaewon" />,
  document.getElementById('example')
);
```
- Inline Style
  - react 에서 inline style 을 지정하기 위해서는 Object 를 사용한다.
  - Object 의 key 로는 background&#8208;color 나 font&#8208;size 등과 같이 spinal&#8208;case 를 사용하는 대신 camelCase를 사용한다.
```js
/***** InlineStyle.js *****/
import React from 'react';
import ReactDOM from 'react-dom';

class InlineStyle extends React.Component {
  render(){
    var styleObj = {
      color: '#f00',
      backgroundColor: '#000'
    };

    return  (
      <div>
        <h1 style={ styleObj }>Inline Style</h1>
      </div>
    );
  };
};
```

