import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Surface, useTheme } from "react-native-paper";
import { SetDataContext } from "../utils/AppContext";
import CustomText from "../components/CustomText";

const ErrorScreen = () => {
  const { colors } = useTheme();
  const setError = useContext(SetDataContext)?.setError;

  return (
    <Surface style={styles.root}>
      <View style={styles.featureContainer}>
        <CustomText>
          There was an error during the fetching of the user's info. PLease try
          again later.
        </CustomText>
        <Button onPress={() => setError(false)}>
          <CustomText style={{ color: colors.primary }} isBold={true}>
            Retry Now
          </CustomText>
        </Button>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  featureContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    height: "100%",
    width: "100%",
    flex: 1,
  },
});

export default ErrorScreen;
