// action
const OPEN_NAV = 'nav/OPEN_NAV';
const CLOSE_NAV = 'nav/CLOSE_NAV';

export const openNav = () => {
  return {
    type : OPEN_NAV
  }
}

export const closeNav = () => {
  return {
    type : CLOSE_NAV
  }
}

// reducer
const initialvalue = {
  isNavOpened : false
}

const reducer = (state = initialvalue, action) => {
  switch(action.type){
    case OPEN_NAV:
      return { ...state, isNavOpened : true };
    case CLOSE_NAV:
      return { ...state, isNavOpened : false };
    default :
      return state;
  }
}

export default reducer
