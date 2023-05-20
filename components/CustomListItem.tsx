import CustomText from "./CustomText";
import { StyleSheet, View } from "react-native";
import { ReactNode } from "react";

type CustomListItemType = {
  title: string;
  description: string;
  showIcon?: ReactNode;
};

const CustomListItem = ({
  title,
  description,
  showIcon = null,
}: CustomListItemType) => {
  return (
    <View style={styles.root}>
      {showIcon ? <View style={styles.icon}>{showIcon}</View> : null}
      <View style={styles.texts}>
        <CustomText style={styles.primary} adjustsFontSizeToFit>
          {title}
        </CustomText>
        <CustomText style={styles.secondary} numberOfLines={1}>
          {description}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "95%",
    marginBottom: 10,
  },
  texts: {
    marginBottom: 10,
    flex: 1,
  },
  icon: {
    marginRight: 5,
  },
  primary: { fontSize: 20, marginBottom: 4 },
  secondary: {
    fontSize: 14,
    fontFamily: "Gotham Bold",
    marginBottom: 3,
  },
});

export default CustomListItem;
