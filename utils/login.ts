import { storeData } from "./storeUtils";
import { STORAGE_KEYS } from "./global";

export const tryAuth = async (
  token: string,
  setCognitoToken: (token: string) => void,
  exceptionFun: Function
) => {
  try {
    setCognitoToken(token);
    await storeData(STORAGE_KEYS.TOKEN, token);
  } catch (e) {
    console.log("session error", e);
    if (exceptionFun) {
      exceptionFun();
    }
    setCognitoToken(null);
    await storeData(STORAGE_KEYS.TOKEN, null);
  }
};
