import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { Surface } from "react-native-paper";

type CardType = {
  style?: Record<string, string | number>;
  children: ReactNode;
};
const Card = ({ style, children }: CardType) => {
  return <Surface style={{ ...styles.card, ...style }}>{children}</Surface>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    padding: 20,
    borderRadius: 10,
  },
});

export default Card;
