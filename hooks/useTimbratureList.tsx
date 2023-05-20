import React, { useContext, useEffect, useMemo, useState } from "react";
import { retrieveData } from "../utils/storeUtils";
import { DataContext } from "../utils/AppContext";
import { ScrollView, StyleSheet } from "react-native";
import CustomLogOps from "../components/CustomLogOps";
import TabbedContent from "../components/TabbedContent";

let timbratureErrorInterval;

const updateTimbrature = (r, callback) => {
  return callback(r || []);
};

const TIMBRATURE_ERROR_RETRY_MS = 10000;

const useTimbratureList = (setIsEndOfTurn = null) => {
  const [timbrature, setTimbrature] = useState([]);
  const [timbratureError, setTimbratureError] = useState([]);
  const loggedUser = useContext(DataContext)?.data?.user;
  const isCurrentlyConnected = useContext(DataContext)?.isCurrentlyConnected;

  useEffect(() => {
    retrieveData(`timbrature_${loggedUser.email}`).then((r) =>
      updateTimbrature(r, setTimbrature)
    );
  }, []);

  useEffect(() => {
    retrieveData(`timbrature_error_${loggedUser.email}`).then((r) =>
      updateTimbrature(r, setTimbratureError)
    );
  }, []);

  useEffect(() => {
    if (timbratureError.length > 0 && isCurrentlyConnected) {
      timbratureErrorInterval = setInterval(() => {
        retrieveData(`timbrature_${loggedUser.email}`).then((r) =>
          updateTimbrature(r, setTimbrature)
        );
        retrieveData(`timbrature_error_${loggedUser.email}`).then((r) =>
          updateTimbrature(r, setTimbratureError)
        );
      }, TIMBRATURE_ERROR_RETRY_MS);
    } else {
      clearInterval(timbratureErrorInterval);
    }
  }, [loggedUser, timbratureError.length, isCurrentlyConnected]);

  useEffect(() => {
    if (timbrature && timbrature.length > 0 && setIsEndOfTurn) {
      const last_timbratura = timbrature.sort(
        (a, b) => b.timestamp - a.timestamp
      )[0];
      setIsEndOfTurn(last_timbratura.info === "Entrata");
    }
  }, [timbrature]);

  const timbratureListComponent = useMemo(
    () => (
      <TabbedContent
        tabs={[
          { label: "Sent", id: "sent" },
          {
            label: "Pending",
            id: "pending",
            number: timbratureError.length,
          },
        ]}
        content={{
          pending: (
            <ScrollView style={styles.scrollComponent}>
              <CustomLogOps items={timbratureError || []} />
            </ScrollView>
          ),
          sent: (
            <ScrollView style={styles.scrollComponent}>
              <CustomLogOps items={timbrature || []} />
            </ScrollView>
          ),
        }}
      />
    ),
    [timbrature, timbratureError]
  );

  return {
    setTimbrature,
    timbratureListComponent,
  };
};

const styles = StyleSheet.create({
  scrollComponent: {
    width: "100%",
  },
  activity: {
    paddingVertical: 10,
  },
});

export default useTimbratureList;
