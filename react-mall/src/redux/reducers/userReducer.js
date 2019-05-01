import {USER_LOGIN, TOGGLE_MODAL} from "../actions/userAction";

const initialState = {
  login: false,
  displayName: '',
  loginForm: {
    username: '',
    password: '',
  },
  loading: false,
  modalShow: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN: {
      console.log(action);
      return {
        ...state,
        login: true,
        loginForm: {...action.payload},
        displayName: action.payload.username,
        modalShow: false
      }
    }
    case TOGGLE_MODAL: {
      return {
        ...state,
        modalShow: !state.modalShow
      }
    }

    default:
      return state;
  }
}