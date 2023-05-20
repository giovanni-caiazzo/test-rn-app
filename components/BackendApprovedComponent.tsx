import { ReactNode, useContext } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { DataContext } from "../utils/AppContext";

type BackendApprovedComponentType = {
  children: ReactNode;
  field: string;
  style?: Record<string, string | number>;
};

const BackendApprovedComponent = ({
  children,
  field,
  style,
}: BackendApprovedComponentType) => {
  const appConfiguration = useContext(DataContext)?.data?.app_configuration;

  if (!appConfiguration) {
    return <ActivityIndicator />;
  }

  if (appConfiguration[field]) {
    return <View style={style}>{children}</View>;
  }

  return null;
};

export default BackendApprovedComponent;
