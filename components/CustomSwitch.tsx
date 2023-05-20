import { useEffect, useState } from "react";
import { View, StyleSheet, Switch, Platform, ColorValue } from "react-native";
import { useTheme } from "react-native-paper";
import CustomText from "./CustomText";

type CustomSwitchType = {
  value: boolean;
  emitResult: (boolean) => void;
  off_label: string;
  on_label: string;
  trackColor: { true: ColorValue; false: ColorValue };
  thumbColor: ColorValue;
  ios_backgroundColor: ColorValue;
};

const CustomSwitch = (props: CustomSwitchType) => {
  const [isEnabled, setIsEnabled] = useState(props.value);
  const { colors } = useTheme();

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (props.emitResult) {
      props.emitResult(!isEnabled);
    }
  };

  useEffect(() => {
    setIsEnabled(props.value);
  }, [props.value]);

  return (
    <View style={styles.root}>
      <CustomText
        adjustsFontSizeToFit={true}
        style={
          !isEnabled
            ? { ...styles.selectedChoice, color: colors.primary }
            : styles.notSelectedChoice
        }
      >
        {props.off_label || "OFF"}
      </CustomText>
      <Switch
        {...props}
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={styles.switch}
      />
      <CustomText
        adjustsFontSizeToFit={true}
        style={
          isEnabled
            ? { ...styles.selectedChoice, color: colors.primary }
            : styles.notSelectedChoice
        }
      >
        {props.on_label || "ON"}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
  },
  selectedChoice: {
    fontFamily: "Gotham Bold",
    width: "33%",
    textAlign: "center",
    fontSize: 22,
  },
  notSelectedChoice: {
    width: "33%",
    textAlign: "center",
    fontSize: 22,
  },
  switch: {
    transform: [
      { scaleX: Platform.OS === "ios" ? 1.5 : 2 },
      { scaleY: Platform.OS === "ios" ? 1.5 : 2 },
    ],
  },
});

export default CustomSwitch;
