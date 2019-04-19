import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/logo.scss';

class Logo extends Component
{
  render ( )
  {
    return (
      <div className='logo'>
        <div className='image'>
          <img src={this.props.image}></img>
        </div>
        <div className='title'>
          {this.props.title}
        </div>
      </div>
    );
  }
}

export default Logo;