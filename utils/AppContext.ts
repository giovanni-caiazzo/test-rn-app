import { createContext, Dispatch, SetStateAction } from "react";
import { DataType } from "./global";

type DataContextType = {
  data: DataType;
  cognitoToken: string;
  error: boolean;
  isCurrentlyConnected: boolean;
};

const defaultDataContext: DataContextType = {
  data: { app_configuration: null },
  cognitoToken: null,
  error: false,
  isCurrentlyConnected: true,
};

export const DataContext = createContext(defaultDataContext);

type SetDataContextType = {
  setData: Function;
  setCognitoToken: Dispatch<string>;
  setError: Dispatch<SetStateAction<boolean>>;
};

const defaultSetDataContext: SetDataContextType = {
  setData: () => {},
  setCognitoToken: () => {},
  setError: () => {},
};
export const SetDataContext = createContext(defaultSetDataContext);
