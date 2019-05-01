export const USER_LOGIN = 'USER_LOGIN';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';

export function userLoginAction(payload) {
  return {
    type: USER_LOGIN,
    payload
  }
}
