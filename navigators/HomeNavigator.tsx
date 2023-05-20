import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import CustomBarcodeScanner from "../screens/CustomBarcodeScanner";
import UserInfo from "../screens/UserInfo";
import AttendanceScreen from "../screens/AttendanceScreen";

const Stack = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Attendance"
        component={AttendanceScreen}
        initialParams={{ readerData: null }}
      />
      <Stack.Screen name="User Info" component={UserInfo} />
      <Stack.Screen name="Barcode Scanner" component={CustomBarcodeScanner} />
    </Stack.Navigator>
  );
};
