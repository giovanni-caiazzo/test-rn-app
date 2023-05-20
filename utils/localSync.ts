import { DataType, REDUCER_ACTIONS } from "./global";

type ActionType = { type: string; payload?: any };

export const reducer = (state: DataType, action: ActionType) => {
  switch (action.type) {
    case REDUCER_ACTIONS.SET_DATA:
      return { ...state, ...action.payload };
    case REDUCER_ACTIONS.CLEAR_DATA:
      return null;
    case REDUCER_ACTIONS.FORCE_NFC_OFF:
      return {
        ...state,
        app_configuration: { ...state.app_configuration, nfc: false },
      };
    default:
      return state;
  }
};
