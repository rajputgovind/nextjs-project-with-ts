"use client";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

interface PersistantProviderProps {
  children: React.ReactNode;
}

const PersistantProvider: React.FC<PersistantProviderProps> = ({
  children,
}) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null}  persistor={persistor || {}}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default PersistantProvider;
