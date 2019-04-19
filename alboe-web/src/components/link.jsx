import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/link.scss';

class Link extends Component
{
  render ( )
  {
    return (
      <div className='link'>
        {this.props.children}
      </div>
    );
  }
}

export default Link;