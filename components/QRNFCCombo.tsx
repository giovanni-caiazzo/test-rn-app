import { useContext, useEffect } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { DataContext } from "../utils/AppContext";
import { StartListeningToNFC, StopListeningToNFC } from "./CustomNFCScanner";
import { ActivityIndicator, useTheme } from "react-native-paper";
import BackendApprovedComponent from "./BackendApprovedComponent";
import CustomText from "./CustomText";
import { MaterialIcons } from "@expo/vector-icons";
import useNfc from "../hooks/useNfc";

type QRNFCComboType = {
  route: any;
  navigation: any;
  pageName?: string;
  disabled?: boolean;
  emitResults: (ok: boolean, res: any, err: boolean) => any;
};

const QRNFCCombo = ({
  route,
  navigation,
  pageName,
  disabled = false,
  emitResults,
}: QRNFCComboType) => {
  const isCurrentlyConnected = useContext(DataContext).isCurrentlyConnected;
  const { waitingForNFC, setWaitingForNFC } = useNfc(
    disabled,
    route,
    navigation
  );
  const appConfiguration = useContext(DataContext)?.data?.app_configuration;

  const { colors } = useTheme();

  useEffect(() => {
    if (!route?.params) {
      return;
    }

    if (!route?.params?.readerData && !disabled) {
      if (Platform.OS === "android" && appConfiguration.nfc) {
        StartListeningToNFC(route, navigation)
          .then(() => setWaitingForNFC(true))
          .catch((err) => console.log(err));
      }
      return;
    }
    if (route.params.readerData || route.params.closed_nfc_session) {
      if (appConfiguration.nfc) {
        setWaitingForNFC(false);
        StopListeningToNFC().then();
      }
      emitResults(true, route.params.readerData, false);
    }
  }, [route.params]);

  useEffect(() => {
    if (!appConfiguration.nfc) {
      return;
    }
    if (!isCurrentlyConnected || disabled) {
      setWaitingForNFC(false);
      StopListeningToNFC().then();
    }
  }, [isCurrentlyConnected, disabled, appConfiguration.nfc]);

  return (
    <View style={styles.buttonContainer}>
      {["qr", "nfc"].map((source) => {
        const isButtonDisabled =
          !isCurrentlyConnected ||
          disabled ||
          (waitingForNFC && source !== "nfc");
        return (
          <BackendApprovedComponent
            key={source}
            field={source}
            style={styles.viewContainer}
          >
            <TouchableOpacity
              style={{
                ...styles.touchable,
                backgroundColor: isButtonDisabled
                  ? colors.surfaceDisabled
                  : colors.primary,
                // @ts-ignore
                color: isButtonDisabled
                  ? colors.onSurfaceDisabled
                  : colors.onPrimary,
              }}
              uppercase
              onPress={async () => {
                if (isButtonDisabled) {
                  return;
                }
                if (source === "qr") {
                  navigation.navigate("Barcode Scanner", {
                    previousPage: pageName,
                  });
                } else {
                  if (waitingForNFC) {
                    StopListeningToNFC().then();
                  } else {
                    StartListeningToNFC(route, navigation)
                      .then()
                      .catch((err) => console.log(err));
                  }
                  setWaitingForNFC((prevState) => !prevState);
                }
              }}
            >
              <View style={styles.buttonContent}>
                <MaterialIcons
                  name={source === "qr" ? "qr-code-scanner" : "nfc"}
                  size={60}
                  color={
                    isButtonDisabled ? colors.surfaceDisabled : colors.surface
                  }
                />
                <CustomText
                  adjustsFontSizeToFit={true}
                  style={{ color: colors.surface, fontSize: 22 }}
                >
                  Read {source.toUpperCase()}
                </CustomText>
                {waitingForNFC && source === "nfc" ? (
                  <View style={styles.loadingView}>
                    <CustomText
                      style={{ color: colors.surface, ...styles.loadingText }}
                    >
                      Waiting for NFC tag... Tap to turn off
                    </CustomText>
                    <ActivityIndicator
                      color={colors.secondary}
                      style={styles.loading}
                    />
                  </View>
                ) : null}
              </View>
            </TouchableOpacity>
          </BackendApprovedComponent>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    maxWidth: "100%",
    elevation: 0,
    marginVertical: 20,
    justifyContent: "center",
  },
  loadingView: {
    position: "absolute",
    top: 10,
    right: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loadingText: {
    paddingHorizontal: 10,
    fontSize: 12,
    fontStyle: "italic",
  },
  buttonContent: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },
  touchable: {
    aspectRatio: 1,
    borderRadius: 10,
    width: "100%",
  },
  viewContainer: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    maxWidth: 180,
  },
  loading: {
    width: 5,
    aspectRatio: 1,
  },
});

export default QRNFCCombo;
