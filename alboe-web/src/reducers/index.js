import { combineReducers } from 'redux';

// custom reducers here

export default combineReducers( {
  
} );

/* reducer example
import { MY_REDUCER, MY_OTHER_REDUCER } from '../actions/types.js';

const initialState = {
  items: [ ],
  item: { }
}

export default function ( state = initialState, action )
{
  switch( action.type )
  {
    case MY_REDUCER:
      return Object.assign(
        { },
        initialState,
        {
          "data": action.data
        }
      );

    case MY_OTHER_REDUCER:
      return Object.assign(
        { },
        initialState,
        {
          "data": action.data
        }
      );

    default:
      return state;
      break;
  }
}
*/
