import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { ReactNode } from "react";

type CustomTextType = {
  children: ReactNode;
  style?: Record<string, string | number>;
  isBold?: boolean;
  adjustsFontSizeToFit?: boolean;
  numberOfLines?: number;
  capitalize?: boolean;
};

const CustomText = ({
  children,
  style = {},
  isBold = false,
  adjustsFontSizeToFit = false,
  numberOfLines = 0,
  capitalize = false,
}: CustomTextType) => {
  return (
    <Text
      style={{
        ...(isBold ? styles.root : styles.root_thin),
        ...style,
        ...(capitalize ? styles.capitalized : {}),
      }}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      numberOfLines={adjustsFontSizeToFit ? 1 : numberOfLines}
      selectable
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  root: {
    fontSize: 18,
    fontFamily: "Gotham Bold",
  },
  root_thin: {
    fontSize: 18,
    fontFamily: "Gotham",
  },
  capitalized: {
    textTransform: "capitalize",
  },
});

export default CustomText;
