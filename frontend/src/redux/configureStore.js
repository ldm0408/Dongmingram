import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import users from "redux/modules/users";

const env = process.env.NODE_ENV;

const middlewares = [thunk];

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
} // logger는 redux 액션에 대한 log를 확인할수 있는 라이브러리 이다.
// 이 app 에선 'development' 환경에서만 사용되게 설정 했다. 배포 하면 쓸모없는 기능이기에..

const reducer = combineReducers({
  users
}); // 하나의 app에 여러 reducer 를 사용할 때 필요하다.

let store = initialState =>
  createStore(reducer, applyMiddleware(...middlewares));

export default store();
