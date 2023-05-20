import { useEffect, useReducer, useState } from "react";
import { fetchUserData } from "../utils/fetchUtils";
import { retrieveData } from "../utils/storeUtils";
import { reducer } from "../utils/localSync";
import { REDUCER_ACTIONS, STORAGE_KEYS } from "../utils/global";

const useAutomaticLogin = (isCurrentlyConnected) => {
  const [data, setData] = useReducer(reducer, {});
  const [cognitoToken, setCognitoToken] = useState(null);
  const [error, setError] = useState(false);
  const [tryingAuth, setTryingAuth] = useState(false);

  useEffect(() => {
    if (!cognitoToken) {
      retrieveData(STORAGE_KEYS.TOKEN).then((r) => setCognitoToken(r));
    }
  }, [cognitoToken]);

  useEffect(() => {
    if (cognitoToken && isCurrentlyConnected) {
      if (!data || !data.app_configuration) {
        fetchUserData(cognitoToken, setData, setCognitoToken)
          .then(() => setError(false))
          .catch((err) => {
            console.log("Error", err, err.stack);
            setError(true);
            setData({ type: REDUCER_ACTIONS.CLEAR_DATA });
          });
      }
    } else if (cognitoToken && !isCurrentlyConnected) {
      if (!data || !data.app_configuration) {
        retrieveData(STORAGE_KEYS.CONFIG).then((r) =>
          setData({ type: REDUCER_ACTIONS.SET_DATA, payload: r })
        );
      }
    }
  }, [cognitoToken, data, isCurrentlyConnected, error]);
  return {
    data,
    setData,
    cognitoToken,
    setCognitoToken,
    error,
    setError,
    tryingAuth,
    setTryingAuth,
  };
};

export default useAutomaticLogin;
