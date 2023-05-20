import { storeData } from "./storeUtils";
import { REDUCER_ACTIONS, STORAGE_KEYS } from "./global";
const user_logo = require("../assets/user_logo.png");

const DUMMY_USER_DATA = {
  email: "test@gmail.com",
  first_name: "Test",
  last_name: "User",
  dob: 927184862,
  pob: "Rome",
  company: "Test Company",
  hiring_date: 1653031262,
  logo_path: user_logo,
};
const DUMMY_APP_CONFIG_DATA = {
  qr: true,
  nfc: true,
  attendance: true,
  info: true,
};

export const fetchUserData = async (
  cognitoToken: string,
  setData: Function,
  setCognitoToken: Function
) => {
  setCognitoToken("Valid");
  const payload = {
    user: DUMMY_USER_DATA,
    app_configuration: DUMMY_APP_CONFIG_DATA,
  };
  setData({ type: REDUCER_ACTIONS.SET_DATA, payload });
  await storeData(STORAGE_KEYS.CONFIG, payload);
};
