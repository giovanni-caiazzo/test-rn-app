import { View, StyleSheet, TouchableOpacity } from "react-native";
import Card from "./Card";
import CustomText from "./CustomText";
import { ReactNode } from "react";

type FeatureHomeIconType = {
  image: ReactNode;
  title: string;
  navigation: any;
  link: any;
  style?: Record<string, string | number>;
};

const FeatureHomeIcon = ({
  image,
  title,
  navigation,
  link,
  style,
}: FeatureHomeIconType) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(link)}
      style={{ ...styles.root, ...style }}
    >
      <Card style={styles.card}>
        <View style={styles.imgContainer}>{image}</View>
        <View>
          <CustomText style={styles.text} numberOfLines={1}>
            {title}
          </CustomText>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    elevation: 0,
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  text: {
    textAlign: "center",
    paddingTop: 10,
  },
  card: {
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export default FeatureHomeIcon;
