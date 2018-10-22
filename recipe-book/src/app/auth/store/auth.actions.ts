import {Action} from '@ngrx/store';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const SIGNUP = 'SIGNUP';

export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGNIN = 'SIGNIN';

export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';


export const ERROR = 'ERROR';



export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;
  constructor(public payload: {username: string, password: string}) {
  }
}

export class Signup implements Action {
  readonly type = SIGNUP;
}

export class TrySignin implements Action {
  readonly type = TRY_SIGNIN;
  constructor(public payload: {username: string, password: string}) {
  }
}

export class Signin implements Action {
  readonly type = SIGNIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) {
  }
}



export class Fail implements Action {
  readonly type = ERROR;

  constructor(public payload: any) {
    console.log('failed');
  }
}




export type AuthActions =
  Signup |
  Signin |
  Logout |
  SetToken |
  TrySignup |
  TrySignin |
  Fail;
