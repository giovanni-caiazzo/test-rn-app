import { useContext } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Surface } from "react-native-paper";
import { DataContext, SetDataContext } from "../utils/AppContext";
import { format, fromUnixTime } from "date-fns";
import { it } from "date-fns/locale";
import { dateFormatNoTime } from "../utils/consts";
import CustomText from "../components/CustomText";
import CustomListItem from "../components/CustomListItem";
import Constants from "expo-constants";
import { storeData } from "../utils/storeUtils";
import { REDUCER_ACTIONS, STORAGE_KEYS } from "../utils/global";

const formatDate = (item) =>
  format(fromUnixTime(item), dateFormatNoTime, { locale: it });

const USER_FIELDS = [
  { fields: ["email"], label: "Email" },
  { fields: ["first_name", "last_name"], label: "Name and Last Name" },
  { fields: ["dob"], label: "Date of birth", format: formatDate },
  { fields: ["pob"], label: "Place of birth" },
  { fields: ["company"], label: "Company" },
  {
    fields: ["hiring_date"],
    label: "Hiring Date",
    format: formatDate,
  },
];

const UserInfo = () => {
  const user = useContext(DataContext)?.data?.user;
  const setCognitoToken = useContext(SetDataContext)?.setCognitoToken;
  const setData = useContext(SetDataContext)?.setData;

  return (
    <Surface style={styles.root}>
      <View style={styles.titleContainer}>
        <Image source={user.logo_path} style={styles.image} />
      </View>
      <ScrollView style={styles.infoContainer}>
        {USER_FIELDS.map((item) => (
          <CustomListItem
            key={item.fields[0]}
            title={item.fields
              .map((field) =>
                user && user[field]
                  ? item.format
                    ? item.format(user[field])
                    : user[field]
                  : "N/A"
              )
              .join(" ")}
            description={item.label}
          />
        ))}
      </ScrollView>
      <View style={styles.versionContainer}>
        <Button
          onPress={async () => {
            setData(REDUCER_ACTIONS.CLEAR_DATA);
            setCognitoToken(null);
            await storeData(STORAGE_KEYS.TOKEN, null);
            await storeData(STORAGE_KEYS.CONFIG, null);
          }}
        >
          Log Out
        </Button>
        <CustomText style={styles.versionText}>
          App Version: {Constants.manifest.version}-dev
        </CustomText>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "100%",
    paddingHorizontal: 10,
  },
  title: {
    maxWidth: "75%",
  },
  versionContainer: {
    fontSize: 16,
    color: "grey",
    alignItems: "flex-end",
  },
  versionText: {
    fontSize: 16,
    color: "grey",
  },
  smallerText: {
    fontSize: 16,
    color: "grey",
  },
  infoContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  itemContainer: {
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    resizeMode: "contain",
    width: "20%",
    minWidth: 10,
    aspectRatio: 1,
    borderRadius: 10,
  },
});

export default UserInfo;
