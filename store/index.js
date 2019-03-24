import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import rootReducer from "../reducers";

const middlewares = [thunk];

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["likedJobs"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(
    persistedReducer,
    {},
    compose(applyMiddleware(...middlewares))
  );
  const persistor = persistStore(store);

  return { store, persistor };
};
