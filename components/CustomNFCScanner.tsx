import NfcManager, {
  NfcAdapter,
  NfcEvents,
  NfcTech,
} from "react-native-nfc-manager";
import { Platform } from "react-native";

// Pre-step, call this before any NFC operations
export const initNfc = async () => {
  await NfcManager.start();
  await NfcManager.unregisterTagEvent().catch(() => 0);
  if (Platform.OS !== "ios") {
    await NfcManager.registerTagEvent({
      isReaderModeEnabled: true,
      readerModeFlags:
        NfcAdapter.FLAG_READER_NFC_A |
        NfcAdapter.FLAG_READER_NFC_B |
        NfcAdapter.FLAG_READER_NFC_F |
        NfcAdapter.FLAG_READER_NFC_V,
    });
  }
  console.log("NFC manager started!");
};

export const StopListeningToNFC = async () => {
  await NfcManager.unregisterTagEvent().catch(() => 0);
  if (Platform.OS !== "ios") {
    await NfcManager.registerTagEvent({
      isReaderModeEnabled: true,
      readerModeFlags:
        NfcAdapter.FLAG_READER_NFC_A |
        NfcAdapter.FLAG_READER_NFC_B |
        NfcAdapter.FLAG_READER_NFC_F |
        NfcAdapter.FLAG_READER_NFC_V,
    });
  }
  NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
  NfcManager.setEventListener(NfcEvents.SessionClosed, null);
};

export const StartListeningToNFC = async (route, navigation) => {
  console.log("Started listening to NFC");
  NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
    console.log("Found tag! Info is:", tag);
    navigation.setParams({
      readerData: tag.id,
      source: "nfc",
      previousPage: route?.params?.previousPage,
      closed_nfc_session: false,
    });
    StopListeningToNFC().then();
  });
  if (Platform.OS !== "ios") {
    await NfcManager.unregisterTagEvent().catch(() => 0);
    await NfcManager.registerTagEvent({
      isReaderModeEnabled: true,
      readerModeFlags:
        NfcAdapter.FLAG_READER_NFC_A |
        NfcAdapter.FLAG_READER_NFC_B |
        NfcAdapter.FLAG_READER_NFC_F |
        NfcAdapter.FLAG_READER_NFC_V,
    });
  } else {
    await iOSFetchNFC(route, navigation);
  }
  NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
    console.log("Session closed");
    navigation.setParams({ ...route.params, closed_nfc_session: true });
    StopListeningToNFC().then();
  });
};

const iOSFetchNFC = async (route, navigation) => {
  try {
    let tech = NfcTech.MifareIOS;
    await NfcManager.requestTechnology(tech, {
      alertMessage: "Avvicina il tag NFC",
    });

    // the NFC uid can be found in tag.id
    const tag = await NfcManager.getTag();
    navigation.setParams({
      readerData: tag.id,
      source: "nfc",
      previousPage: route?.params?.previousPage,
      closed_nfc_session: false,
    });
    await NfcManager.cancelTechnologyRequest().catch(() => 0);
    await StopListeningToNFC();
  } catch (err) {
    console.warn(err);
    await NfcManager.cancelTechnologyRequest().catch(() => 0);
    navigation.setParams({ ...route.params, closed_nfc_session: true });
    await StopListeningToNFC();
  }
};
