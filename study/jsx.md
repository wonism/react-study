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

