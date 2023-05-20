import { MaterialCommunityIcons } from "@expo/vector-icons";

export const features = [
  {
    id: "attendance",
    title: "Attendance",
    image: (color, size) => (
      <MaterialCommunityIcons
        name="account-group"
        size={size ? size : 60}
        color={color ? color : "black"}
      />
    ),
    link: "Attendance",
  },
  {
    id: "info",
    title: "User Info",
    image: (color, size) => (
      <MaterialCommunityIcons
        name="account"
        size={size ? size : 60}
        color={color ? color : "black"}
      />
    ),
    link: "User Info",
  },
];

export const dateFormatWithTime = "dd/MM/yyyy HH:mm";
export const dateFormatNoTime = "dd/MM/yyyy";
