import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage/sessionStorage for persistence
import authReducer from "./slice/authSlice";
import propertiesReducer from "./slice/propertyMetaDataSlice";
import recentSearchReducer from "./slice/recentSearchSlice";
import chatbotReducer from "./slice/chatbotSlice";
import propertyReducer from "./slice/propertySlice";
// Redux Persist Configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "properties", "property"],
};

// Combine all reducers into a rootReducer
const rootReducer = combineReducers({
  auth: authReducer,
  properties: propertiesReducer,
  recentSearch: recentSearchReducer,
  chatbot: chatbotReducer,
  property: propertyReducer,
});

// Persisted reducer wrapping the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Define a custom store type with `__persistor`
interface CustomStore extends ReturnType<typeof makeConfiguredStore> {
  __persistor?: ReturnType<typeof persistStore>;
}

// Function to create the store
const makeConfiguredStore = () =>
  configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

// Function to create the store with server/client-side handling
export const makeStore = (): CustomStore => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    // If it's server-side, return a store without persistence
    return configureStore({
      reducer: rootReducer,
      devTools: process.env.NODE_ENV !== "production",
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    }) as CustomStore;
  } else {
    // Client-side, return a store with persistence
    const store = makeConfiguredStore() as CustomStore;
    store.__persistor = persistStore(store); // Attach persistor to the store
    return store;
  }
};

// Create the store instance for usage
export const store = makeStore();

// Ensure persistor is only created on the client-side
// export const persistor = typeof window !== "undefined" ? persistStore(store) : null;
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
