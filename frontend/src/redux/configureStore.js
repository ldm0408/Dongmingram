import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk"; //리액트앱과 스토어 사이를 연결해준다,리덕스 스토어로 액션을 보낼수있다
import { connectRouter, routerMiddleware } from "connected-react-router";
import createHistory from "history/createBrowserHistory"; // 해쉬 히스토리도 있고, 히스토리의 종류 다양한듯
import users from "redux/modules/users";
import Reactotron from "ReactotronConfig";

const env = process.env.NODE_ENV;
const history = createHistory();

const middlewares = [thunk, routerMiddleware(history)];

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
} // logger는 redux 액션에 대한 log를 확인할수 있는 라이브러리 이다.
// 이 app 에선 'development' 환경에서만 사용되게 설정 했다. 배포 하면 쓸모없는 기능이기에..

const reducer = combineReducers({
  users
}); // 하나의 app에 여러 reducer 를 사용할 때 필요하다.

let store;

if (env === "deveopment") {
  store = initialState =>
    Reactotron.createStore(
      connectRouter(history)(reducer),
      compose(applyMiddleware(...middlewares))
    );
} else {
  store = initialState =>
    createStore(
      connectRouter(history)(reducer),
      compose(applyMiddleware(...middlewares))
    );
}

export { history };

export default store();
