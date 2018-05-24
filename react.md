# React

```React provides you with a framework for creating HTML documents. Components are in a way representing a particular part of the document. Methods associated with a component can then manipulated the very particular part of the document.```

### What's the diff state vs props

- State is inside a component
- Props is in the entire app ?

## Components

```Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.
Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.```

Component Class need to extend `React.Component` and have (_optional_) functions : 

- `constructor(props) { }` Constructor where props are defined.
- `componentWillMount() { }` : Called before the component is loaded.
- `componentDidMount() { }` : Called after the component is loaded
- `render() { }` return the html of the component.

Component is like a View in MVC : 
```Define Component as an only presentational component where we will pass the data to it and it will only render that view with the data. Component should not think about how data came to it/logic or API behind it.```

You can have different kind of component, more infos here https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0

# Flux

# Redux 

```Redux is a framework which prescribes to a specific philosphy for storing and managing data in JS environments. It a one big JS object with certain methods defined, best use case comes in the form of state management of a web app.```

## Why using redux ?

```Since React prescribes that all the data should flow down from root to leaves, it becomes tedious to main all the props, defining props in components and then passing props to certain props to children. It also makes the entire application state vulnerable.```

## Reducer

The reducer is a pure function that takes the previous state and an action, and returns the next state.
A reducer is basically telling redux a state to store (user, config...)

They are used :
- When configuring redux to define reducer (usually `reducer.js`)
- When an action is dispatch (from a containers)

Usually, you define your actions with strings (which looks like an enum) : `'USER_LOGGED_IN'`, `'USER_UPDATED'`, 'USER_LOGGED_OUT'...

### Example with userReducer.js

```const initialState = {
  data: null
}

const userReducer = (state = initialState, action) => {
  if (action.type === 'USER_LOGGED_IN' || action.type === 'USER_UPDATED')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  if (action.type === 'USER_LOGGED_OUT')
  {
    return Object.assign({}, state, {
      data: null
    })
  }

  return state
}

export default userReducer
```

## Containers (or smart component)

Note : Containers are not only used with redux :
```Component which is responsible for fetching data and displaying it is called smart or container components. Data can be come from redux, props or any network call.```

Containers is a _type_ of component. Containers are __functionals__. They do not render any html on their own, and then you also have presentational components, where you write the actual html. The purpose of the container is to map the state and dispatch to props for the presentational component.

With Redux, a good architecture is to have 3 files, one for the actions, one for the presentational component, one for the container. Let's take a `SignUpForm` container as example.

### Presentational component
SignUpForm
```
import React, { Component } from 'react'

class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: ''
    }
  }

  onInputChange(event) {
    this.setState({ name: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.name.length < 2)
    {
      return alert('Please fill in your name.')
    }

    this.props.onSignUpFormSubmit(this.state.name)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" value={this.state.name} onChange={this.onInputChange.bind(this)} placeholder="Name" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <button type="submit" className="pure-button pure-button-primary">Sign Up</button>
        </fieldset>
      </form>
    )
  }
}

export default SignUpForm
```

### Actions
SignUpFormActions include the action functions :
```
import { loginUser } from '../loginbutton/LoginButtonActions'
import store from '../../../store'

const contract = require('truffle-contract')

export function signUpUser(name) {
	// logic for signup (POST request etc...)
}
```

### Container
`SignUpFormContainer` include connect (react-redux) what it makes the connection, and the functions mapStateToProps and mapDispatchToProps :


```
import { connect } from 'react-redux'
import SignUpForm from './SignUpForm'
import { signUpUser } from './SignUpFormActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUpFormSubmit: (name) => {
      dispatch(signUpUser(name))
    }
  }
}

const SignUpFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm)

export default SignUpFormContainer
```

# Links

## React

https://medium.freecodecamp.org/learn-react-js-in-5-minutes-526472d292f4
https://www.cronj.com/blog/difference-container-component-react-js/


## React with web3

https://medium.com/taipei-ethereum-meetup/create-a-simple-decentralized-application-with-react-ee8557d6f821
https://www.codeooze.com/blockchain/ethereum-block-explorer-react-01/
(with next.js) https://medium.com/@adrianli/rapid-ethereum-dapp-development-with-next-js-f6354400e4d4

### Truffle boxes 

http://truffleframework.com/boxes/react
http://truffleframework.com/boxes/react-auth
http://truffleframework.com/boxes/truffle-next