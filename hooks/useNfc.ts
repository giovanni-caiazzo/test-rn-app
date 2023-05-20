import { useContext, useEffect, useState } from "react";
import {
  initNfc,
  StartListeningToNFC,
  StopListeningToNFC,
} from "../components/CustomNFCScanner";
import { Platform } from "react-native";
import { DataContext, SetDataContext } from "../utils/AppContext";
import { REDUCER_ACTIONS } from "../utils/global";

const useNfc = (disabled, route, navigation) => {
  const setData = useContext(SetDataContext).setData;
  const [waitingForNFC, setWaitingForNFC] = useState(false);
  const appConfiguration = useContext(DataContext)?.data?.app_configuration;
  useEffect(() => {
    if (!appConfiguration.nfc) {
      setWaitingForNFC(false);
      StopListeningToNFC().then();
      return;
    }
    initNfc()
      .then(() => {
        if (Platform.OS === "android" && !disabled) {
          StartListeningToNFC(route, navigation)
            .then(() => setWaitingForNFC(true))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => {
        console.log(err);
        setData({ type: REDUCER_ACTIONS.FORCE_NFC_OFF });
      });

    return () => {
      setWaitingForNFC(false);
      StopListeningToNFC().then();
    };
  }, []);

  return { waitingForNFC, setWaitingForNFC };
};

export default useNfc;
