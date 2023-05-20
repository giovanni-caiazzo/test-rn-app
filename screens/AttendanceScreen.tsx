import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Surface, Snackbar, useTheme } from "react-native-paper";
import PunchInSide from "../components/PunchInSide";
import { DataContext } from "../utils/AppContext";
import CustomText from "../components/CustomText";
import { useDialog } from "../hooks/useDialog";
import { dateFormatWithTime } from "../utils/consts";
import QRNFCCombo from "../components/QRNFCCombo";
import { format, fromUnixTime } from "date-fns";
import { it } from "date-fns/locale";
import { retrieveData, storeData } from "../utils/storeUtils";
import useTimbratureList from "../hooks/useTimbratureList";

const AttendanceScreen = ({ route, navigation }) => {
  const [isEndOfTurn, setIsEndOfTurn] = useState(false);
  const [error, setError] = useState(false);
  const loggedUser = useContext(DataContext)?.data?.user;
  const isCurrentlyConnected = useContext(DataContext)?.isCurrentlyConnected;
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [attendanceResponse, setAttendanceResponse] = useState(null);
  const { colors } = useTheme();
  const { timbratureListComponent, setTimbrature } =
    useTimbratureList(setIsEndOfTurn);

  useEffect(() => {
    if (!!attendanceResponse) {
      toggleDialog(true)();
    }
  }, [attendanceResponse]);

  const { dialog, toggleDialog } = useDialog({
    title: "Save work shift",
    content: (
      <View style={styles.resultComponent}>
        <CustomText
          style={{ ...styles.text, color: colors.secondary, marginBottom: 15 }}
          isBold={true}
        >
          {isEndOfTurn ? "END" : "START"} of turn. {attendanceResponse}
        </CustomText>
        {error ? (
          <CustomText style={{ ...styles.text, color: colors.error }}>
            There was an error: {error}
          </CustomText>
        ) : null}
      </View>
    ),
    cancelProps: {
      text: "Chiudi",
      fun: () => {
        setAttendanceResponse(null);
        navigation.setParams({
          readerData: null,
          source: null,
          previousPage: route?.name,
        });
      },
    },
    doneProps: !error
      ? {
          text: "Salva",
          fun: () => saveUserShift(loggedUser, route?.params?.source),
        }
      : null,
  });

  const saveUserShift = useCallback(
    async (user, source = "qr") => {
      const info = isEndOfTurn ? "END" : "START";
      if (!isCurrentlyConnected) {
        return;
      }
      try {
        const timbrature = await retrieveData(`timbrature_${loggedUser.email}`);
        const timestamp = Date.now();
        //   Dummy data
        const new_timbratura = {
          timestamp,
          date: format(fromUnixTime(timestamp), dateFormatWithTime, {
            locale: it,
          }),
          user: `Test user ${source} ${loggedUser.email}`,
          info,
        };
        const new_timbrature = [...(timbrature || []), new_timbratura];
        setTimbrature(new_timbrature);
        await storeData(`timbrature_${loggedUser.email}`, new_timbrature);
        setShowSuccessSnackbar(true);
      } catch (err) {
        console.log("SAVE ERROR", err, err.response, err.message);
        setError(
          err.response && err.response.data && !`${err}`.includes("502")
            ? err.response.data || err.response.message
            : err.message
            ? err.message
            : "Errore nell'invio della timbratura, per favore riprovare..."
        );
        setTimeout(() => setError(null), 5000);
        setShowSuccessSnackbar(false);
      }
      setAttendanceResponse(null);
      navigation.setParams({
        readerData: null,
        source: null,
        previousPage: route?.name,
      });
    },
    [isEndOfTurn, isCurrentlyConnected]
  );

  return (
    <Surface style={styles.root}>
      <View style={styles.spacedComponent}>
        <PunchInSide startValue={isEndOfTurn} emitChange={setIsEndOfTurn} />
      </View>

      <QRNFCCombo
        emitResults={(ok, res, err) => {
          setShowSuccessSnackbar(ok);
          setAttendanceResponse(res);
          setError(err);
        }}
        route={route}
        disabled={!isCurrentlyConnected}
        navigation={navigation}
        pageName={route.name}
      />

      {timbratureListComponent}

      {dialog}

      <Snackbar
        action={{
          label: "Close",
          onPress: () => setShowSuccessSnackbar(false),
        }}
        onDismiss={() => setShowSuccessSnackbar(false)}
        visible={showSuccessSnackbar}
      >
        <CustomText style={{ color: colors.surfaceVariant }}>
          Work shift saved successfully.
        </CustomText>
      </Snackbar>

      <Snackbar
        action={{
          label: "Close",
          onPress: () => setError(null),
        }}
        onDismiss={() => setError(null)}
        visible={!!error && !showSuccessSnackbar}
        style={{ bottom: 35 }}
      >
        <CustomText style={{ color: colors.surfaceVariant }}>
          {error}
        </CustomText>
      </Snackbar>
    </Surface>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontWeight: "500",
  },
  spacedComponent: {
    marginTop: 20,
  },
  resultComponent: {
    margin: 30,
  },
  text: {
    fontSize: 20,
  },
});

export default AttendanceScreen;
