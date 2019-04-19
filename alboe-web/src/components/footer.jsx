import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/footer.scss';

class Footer extends Component
{
  render ( )
  {
    return (
      <div className='footer'>
        {this.props.children}
      </div>
    );
  }
}

export default Footer;