import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/deck.scss';

class Deck extends Component
{
  render ( )
  {
    return (
      <div className='deck'>
        {this.props.children}
      </div>
    );
  }
}

export default Deck;