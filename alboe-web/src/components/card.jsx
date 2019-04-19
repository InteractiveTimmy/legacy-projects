import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/card.scss';

class Card extends Component
{
  render ( )
  {
    return (
      <div className='card'
        direction={this.props.direction}
        hover={this.props.hover}
        style={{
          backgroundImage: `url(${this.props.background})`
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

Card.propTypes = {
  direction: PropTypes.string,
  hover: PropTypes.string
};

Card.defaultProps = {
  direction: 'vertical',
  hover: 'none',
  background: 'none'
};

export default Card;