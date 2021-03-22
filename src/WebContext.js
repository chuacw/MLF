
import React, { Component } from 'react';

export const AppContext = React.createContext();

class WebContext extends React.Component {

  //Now you can place all of your logic here
  //instead of cluttering your app component
  //using this components state as your context value
  //allows you to easily write funcitons to change
  //your context just using the native setState 
  //you can also place functions in your context value
  //to call from anywhere in your app

  constructor(props) {
      super(props)
      this.setWeb = this.setWeb.bind(this)
      this.setProvider = this.setProvider.bind(this)
      this.state = {provider: null}
  }

  setProvider(newProvider) {
      this.setState({provider: newProvider})
  }
  render() {
    return (
      <AppContext.Provider provider={this.state.provider}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default WebContext;