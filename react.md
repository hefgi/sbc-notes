# React

```React provides you with a framework for creating HTML documents. Components are in a way representing a particular part of the document. Methods associated with a component can then manipulated the very particular part of the document.```

### Handling data : state vs props

- State is within a component
- Props are external

A component can change its internal state directly. It can not change its props directly.

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

# Flux : A design pattern

Flux eschews MVC design pattern in favor of a unidirectional data flow.
Flux applications have four major parts: the actions, the dispatcher, the stores, and the views.

This structure allows us to reason easily about our application in a way that is reminiscent of functional reactive programming, or more specifically data-flow programming or flow-based programming, where data flows through the application in a single direction — there are no two-way bindings. Application state is maintained only in the stores, allowing the different parts of the application to remain highly decoupled.

## Flux application flows

Action --> Dispatcher --> Store --> View
https://facebook.github.io/flux/img/flux-simple-f8-diagram-explained-1300w.png

The view dispatches actions that describe what happened. The store receives these actions and determines what state changes should occur. After the state updates, the new state is pushed to the View.


## Dispatchers

The dispatcher is the central hub that manages all data flow in a Flux application. It is essentially a registry of callbacks into the stores and has no real intelligence of its own — it is a simple mechanism for distributing the actions to the stores. 

Each store registers itself and provides a callback. When an action creator provides the dispatcher with a new action, all stores in the application receive the action via the callbacks in the registry.

## Stores

Stores contain the application state and logic. Their role is somewhat similar to a model in a traditional MVC, but they manage the state of many objects — they do not represent a single record of data like ORM models do.

A store registers itself with the dispatcher and provides it with a callback. This callback receives the action as a parameter. Within the store's registered callback, a switch statement based on the action's type is used to interpret the action and to provide the proper hooks into the store's internal methods. This allows an action to result in an update to the state of the store, via the dispatcher. After the stores are updated, they broadcast an event declaring that their state has changed, so the views may query the new state and update themselves.

## View

React provides the kind of composable and freely re-renderable views we need for the view layer.

When it receives the event from the store, it first requests the new data it needs via the stores' public getter methods. It then calls its own setState() or forceUpdate() methods, causing its render() method and the render() method of all its descendants to run.

## Actions

The dispatcher exposes a method that allows us to trigger a dispatch to the stores, and to include a payload of data, which we call an action. 

## Communicate with server with Actions

Actions may also come from other places, such as the server. This happens, for example, during data initialization. It may also happen when the server returns an error code or when the server has updates to provide to the application.

https://cdn-images-1.medium.com/max/1600/1*7qtRmuWoMmFyhpnyxoS3MA.png

# Redux 

Redux is an implementation of flux.

```Redux is a framework which prescribes to a specific philosphy for storing and managing data in JS environments. It a one big JS object with certain methods defined, best use case comes in the form of state management of a web app.```

## Why using redux ?

```Redux has gained widespread popularity and respect in the React community. The library has even won the endorsement of the creator of Flux.```

```Since React prescribes that all the data should flow down from root to leaves, it becomes tedious to main all the props, defining props in components and then passing props to certain props to children. It also makes the entire application state vulnerable.```

See also https://stackoverflow.com/a/32920459/1854104

## Redux key ideas

- All of your application's data is in a single data structure called the state which is held in the store
- Your app reads the state from this store
- The state is never mutated directly outside the store
- The views emit actions that describe what happened
- A new state is created by combining the old state and the action by a function called the reducer

## Differences with Flux ?

- With Flux it is a convention to have multiple stores per application; each store is a singleton object. In Redux, the convention is to have a single store per application.
- Flux has a single dispatcher and all actions have to pass through that dispatcher. It’s a singleton object. Redux has no dispatcher entity. A Redux store exposes a few simple API functions, one of them is to dispatch actions.


See here : https://edgecoders.com/the-difference-between-flux-and-redux-71d31b118c1

## Reducers

The reducer is a pure function that takes the previous state and an action, and returns the next state.
A reducer is basically updating the state to store (user, config...).
Only the store has access to the reducers.

Reducers are used :
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
https://medium.com/front-end-hacking/react-by-example-part-1-76d3e2137cf4
http://reactkungfu.com/react-by-example/

### React with web3

https://medium.com/taipei-ethereum-meetup/create-a-simple-decentralized-application-with-react-ee8557d6f821
https://www.codeooze.com/blockchain/ethereum-block-explorer-react-01/
(with next.js) https://medium.com/@adrianli/rapid-ethereum-dapp-development-with-next-js-f6354400e4d4

### Truffle boxes 

http://truffleframework.com/boxes/react
http://truffleframework.com/boxes/react-auth
http://truffleframework.com/boxes/truffle-next

## Flux

https://www.fullstackreact.com/p/intro-to-flux-and-redux/

## Redux

https://redux.js.org/introduction
https://medium.com/front-end-hacking/redux-by-example-part-1-4afca1b7bd58

## Webpack

https://medium.com/front-end-hacking/webpack-by-example-part-1-1d07bc42006a