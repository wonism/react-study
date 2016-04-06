# react-tutorial

__LINK__
## __[About React JS](https://github.com/wonism/react-study/blob/master/study/about-react.md)__
## __[JSX](https://github.com/wonism/react-study/blob/master/study/jsx.md)__
## __[State & Props](https://github.com/wonism/react-study/blob/master/study/state-and-props.md)__

__Example Code__
```html
<!-- index.html -->
<html>
  <head>
    <meta charset="utf-8" />
    <title>React Tutorial</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.8/react.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.8/react-dom.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
  </head>
  <body>
    <div id="example"></div>
    <script type="text/babel">
      class HelloWorld extends React.Component {
        propTypes: {
          name: React.PropTypes.string
        }

        render() {
          return <h1>Hello, { this.props.name }!</h1>
        }
      };

      HelloWorld.defaultProps = {
        name: "Jaewonism"
      };

      ReactDOM.render(
        <HelloWorld name="World"/>, document.getElementById('example')
      );
    </script>
  </body>
</html>
```

- React 를 사용하기 위해서는 react.js와 react-dom.js를 불러와야 한다.
- babel 은 ECMAScript 2015 를 사용 가능하게 해주는 라이브러리이다.
- HelloWorld 클래스를 만들고, propTypes를 통해 속성의 타입을 지정해준다.
  (name은 String 속성이다.)
- defaultProps 를 통해 name의 default 값을 "Jaewonism"으로 지정한다.
  (name이 초기화되지 않을 경우 Jaewonism)이 출력된다.
- ReactDOM.render 를 통해 컴퍼넌트를 렌더링한다.

