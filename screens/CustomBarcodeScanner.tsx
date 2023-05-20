import { useState, useEffect, useCallback } from "react";
import { StyleSheet } from "react-native";
import { Surface } from "react-native-paper";
import { BarCodeScanner } from "expo-barcode-scanner";
import CustomText from "../components/CustomText";

export default function CustomBarcodeScanner({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = useCallback(
    ({ data }: { data: string }) => {
      console.log("Barcode has scanned", data);
      setScanned(true);
      navigation.navigate({
        name: route.params.previousPage,
        params: {
          readerData: data,
          merge: true,
          source: "qr",
        },
      });
    },
    [setScanned]
  );

  if (hasPermission === null) {
    return (
      <Surface style={styles.textContainer}>
        <CustomText>Requesting access to camera</CustomText>
      </Surface>
    );
  }
  if (hasPermission === false) {
    return (
      <Surface style={styles.textContainer}>
        <CustomText>It was not possible to access the camera</CustomText>
      </Surface>
    );
  }

  return (
    <Surface style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
});
