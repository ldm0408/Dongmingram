import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "redux/configureStore";
import "index.css";
import App from "components/App";
import I18n from "redux-i18n"; // 컴포넌트를 리덕스 스토어의 언어에 반영 / translations:컴포넌트에서 사용되는 언어를 체크 translasions.js 에 작성된 obj 에 따라 번역 됨
import { translations } from "translations";
import "ReactotronConfig"; // for dev tool

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <I18n translations={translations} initialLang="en" fallbackLang="en">
        <App />
      </I18n>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
