import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import combineReducers from "./reducer";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const configurationAppStore = () => {
  const store = configureStore({
    reducer: combineReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([...middleware, logger]),
    devTools: process.env.NODE_ENV === "development",
  });
  sagaMiddleware.run(rootSaga);
  return store;
};
export default configurationAppStore;
