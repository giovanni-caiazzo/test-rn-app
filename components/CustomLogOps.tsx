import { StyleSheet, View } from "react-native";
import { List, useTheme } from "react-native-paper";
import CustomText from "./CustomText";
import CustomListItem from "./CustomListItem";

const CustomLogOps = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <View style={styles.root}>
        <CustomText style={styles.textSmaller}>Nothing here...</CustomText>
      </View>
    );
  }

  const { colors } = useTheme();

  return (
    <View style={styles.root}>
      {items
        .sort((a, b) => b.timestamp - a.timestamp)
        .map((item, idx) => (
          <CustomListItem
            key={`${idx}`}
            title={item.info}
            description={`${item.date} · ${item.user}`}
            showIcon={
              <List.Icon icon="clock-time-three" color={colors.primary} />
            }
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  textSmaller: {
    fontSize: 16,
    color: "grey",
  },
});

export default CustomLogOps;
