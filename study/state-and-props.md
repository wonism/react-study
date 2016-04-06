__State와 Props__
- State :
  - state는 텍스트 필드 같은 컴퍼넌트 내에서 사용자 인터랙션에 따라 변경되는 값을 관리하는 경우에 가장 많이 사용되며, AJAX로 데이터를 요청하고 성공 시 콜백 함수에서 응답 데이터를 setState() 하는 방식으로도 사용된다. state의 값은 property로 접근해서 직접 변경하면 안 되고, 반드시 setState()를 통해 변경해야한다. 왜냐하면, setState()가 호출되어야 rerender 되기 때문이다. 만약, this.state.list라는 배열이 있고, list에 배열을 추가하고 싶은 경우에는 push() 수행 뒤, setState()하는 것이 아닌 새로운 값(배열)을 지정하는 것이 더 좋다. 이 방법이 shouldComponentUpdate()로 성능 최적화할 때와 undo의 구현 시에 더 유용하기 때문이다.

```js
this.setState({ list: this.state.list.concat([value])
```

- props :
  - Props는 컴퍼넌트의 속성(어트리뷰트)으로 정의하고 컴포넌트 내에서는 this.props.xxx로 참조해서 사용한다. Props에는 객체, 함수 등 어떤 타입이든 지정할 수 있다. Props는 외부에서 전달한 값이며, 그 컴퍼넌트가 자체적으로 관리하는 값이 아니다. Props는 Immutable하며 외부와 인터페이스로써 작용한다. 컴퍼넌트의 Props는 외부로부터 값을 지정받기 때문에 검증(벨리데이션)이 필요하다. 이때 React.js에서는 PropsTypes으로 Props에 대한 타입 제약을 지정할 수 있다.

- state & props :
  - Prop만 가지고 있는 Immutable한 컴포넌트가 조작하거나 이해하기 쉬우므로, 기본적으로는 Prop을 고려하고, State를 가진 컴포넌트는 최소화 하는 게 좋다. 최상위 컴퍼넌트만 State를 갖게 하고, 하위 컴퍼넌트는 전부 Props만을 가지는 Immutable한 컴퍼넌트로 구성하여 어떤 변경이 있을 때, 최상위 컴퍼넌트에서 setState()하여 rerender하는 설계가 가능하다.
