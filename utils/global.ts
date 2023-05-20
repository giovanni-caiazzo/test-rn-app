export type DataType = {
  app_configuration: { qr?: boolean; nfc?: boolean; attendance?: boolean };
  user?: {
    logo_path?: any;
    email: string;
    first_name?: string;
    last_name?: string;
    dob?: number;
    pob?: string;
    company?: string;
    hiring_date?: number;
  };
};

export enum STORAGE_KEYS {
  TOKEN = "cognito_token",
  CONFIG = "app_configuration",
}

export enum REDUCER_ACTIONS {
  SET_DATA = "setData",
  CLEAR_DATA = "clearData",
  FORCE_NFC_OFF = "ForceDisableNFC",
}
