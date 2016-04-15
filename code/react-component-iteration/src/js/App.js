import React from 'react';
import ReactDOM from 'react-dom';
import update from 'react-addons-update'

class App extends React.Component {
  render () {
    return (
      <Address />
    );
  };
};

class Address extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressDatas: [
        { name: 'Albert', phoneNumber: '010-0001-1234' },
        { name: 'Bob', phoneNumber: '010-0002-1234' },
        { name: 'Charles', phoneNumber: '010-0003-1234' },
        { name: 'David', phoneNumber: '010-0004-1234' }
      ],
      selectedKey: -1,
      selected: {
        name: "",
        phoneNumber: ""
      }
    };
  };

  _onSelect(key) {
    if (key === this.state.selectedKey) {
      console.log("key select cancelled");
      this.setState({
        selectedKey: -1,
        selected: {
          name: "",
          phone: ""
        }
      });

      return;
    } else {
      this.setState({
        selectedKey: key,
        selected: this.state.addressDatas[key]
      });

      console.log(key + " is selected");
    }
  };

  _insertAddress(name, phoneNumber) {
    console.log(name, phoneNumber, this);
    let newState = update(this.state, {
      addressDatas: {
        $push: [{ "name": name, "phoneNumber": phoneNumber }]
      }
    });
    this.setState(newState);
  };

  _editAddress(name, phoneNumber) {
    this.setState({
      addressDatas: update(
        this.state.addressDatas,
        {
          [this.state.selectedKey]: {
            name: { $set: name },
            phoneNumber: { $set: phoneNumber }
          }
        }
      ),
      selected: {
        name: name,
        phoneNumber: phoneNumber
      }
    });
  };


  _removeAddress() {
    if (this.state.selectedKey === -1) {
      console.log("Address not selected");

      return;
    } else {
      this.setState({
        addressDatas: update(this.state.addressDatas, { $splice: [[this.state.selectedKey, 1]] }),
        selectedKey: -1
      });
    }
  };

  _isSelected(key) {
    if (this.state.selectedKey === key) {
      return true;
    } else {
      return false;
    }
  };


  render () {
    return (
      <div>
        <h1>Address</h1>
        <ul>
          {
            this.state.addressDatas.map((address, index) => {
              return (
                <AddressData
                    name={ address.name } phoneNumber={ address.phoneNumber } key={ index }
                    addressKey={ index }
                    isSelected={ this._isSelected.bind(this)(index) }
                    onSelect={ this._onSelect.bind(this) }
                />
              );
            })
          }
        </ul>
        <AddressAdder onInsert={ this._insertAddress.bind(this) }/>
        <AddressRemover onRemove={this._removeAddress.bind(this)}/>
        <AddressEditor onEdit={ this._editAddress.bind(this) } isSelected={ (this.state.selectedKey !== -1) } address={ this.state.selected } />
      </div>
    );
  };
};

class AddressData extends React.Component {
  handleClick() {
    this.props.onSelect(this.props.addressKey);
  };

  shouldComponentUpdate(nextProps, nextState){
    return (JSON.stringify(nextProps) !== JSON.stringify(this.props));
  };

  render () {
    console.log(this.props.name);
    let getStyle = isSelect => {
      if (isSelect) {
        let style = {
          fontWeight: 'bold',
          color: '#f5a'
        };

        return style;
      } else {
        return;
      }
    };

    return (
      <li style={ getStyle(this.props.isSelected) } onClick={ this.handleClick.bind(this) }>{ this.props.name } { this.props.phoneNumber }</li>
    );
  };
};

class AddressAdder extends React.Component {
  constructor(props) {
    super(constructor);
    this.state = {
      name: "",
      phoneNumber: ""
    };
  }

  handleChange(e) {
    var nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  handleClick() {
    this.props.onInsert(this.state.name, this.state.phoneNumber);
    this.setState({
      name: "",
      phoneNumber: ""
    });
  };

  render () {
    return (
      <div>
        <div>
          <input type="text" name="name" placeholder="name" value={ this.state.name } onChange={ this.handleChange.bind(this) } />
          <input type="text" name="phoneNumber" placeholder="phone number" value={ this.state.phoneNumber } onChange={ this.handleChange.bind(this) } />
        </div>
        <div>
          <button onClick={ this.handleClick.bind(this) }>Save</button>
        </div>
      </div>
    );
  };
};

class AddressEditor extends React.Component {
  constructor(props) {
    super(constructor);
    this.state = {
      name: "",
      phoneNumber: ""
    };
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.address.name,
      phoneNumber: nextProps.address.phoneNumber
    });
  }

  handleClick() {
    if(!this.props.isSelected){
      console.log("Address not selected");

      return;
    } else {
      this.props.onEdit(this.state.name, this.state.phoneNumber);
    }
  };

  handleChange(e) {
    var nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  render() {
    return (
      <div>
        <div>
          <input type="text" name="name" placeholder="name" value={ this.state.name }
              onChange={this.handleChange.bind(this)}/>
          <input type="text" name="phoneNumber" placeholder="phoneNumber" value={ this.state.phoneNumber }
              onChange={this.handleChange.bind(this)}/>
        </div>
        <div>
          <button onClick={ this.handleClick.bind(this) }>
            Edit
          </button>
        </div>
      </div>
    );
  };
}

class AddressRemover extends React.Component {
  handleClick() {
    this.props.onRemove();
  };

  render() {
    return (
      <button onClick={ this.handleClick.bind(this) }>
        Delete
      </button>
    );
  };
};

ReactDOM.render(<App />, document.getElementById('example'));

