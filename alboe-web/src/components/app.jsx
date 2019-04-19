import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';

import store from '../store.js';

import '../styles/base.scss';
import { Card, Deck, Footer, Link, Logo } from './index.js';

class App extends Component
{
  render ( )
  {
    return (
      <Provider store={store}>
        <Fragment>
          <Deck>
            <Card direction='vertical' hover='expand'>Hello</Card>
            <Card direction='vertical' hover='expand'>World</Card>
            <Card direction='vertical' hover='expand' background='https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'>ILY</Card>
          </Deck>
          <Footer>
            <a href='http://www.google.com'>FooterA</a>
            <a href='http://www.google.com'>FooterB</a>
            <a href='http://www.google.com'>FooterC</a>
            <a href='http://www.google.com'>FooterD</a>
          </Footer>
        </Fragment>
      </Provider>
    );
  }
}

export default App;