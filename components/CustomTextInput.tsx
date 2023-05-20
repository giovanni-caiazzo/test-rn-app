import { KeyboardTypeOptions } from "react-native";
import { TextInput } from "react-native-paper";

type CustomTextInputType = {
  value?: string;
  onChangeText: (string) => void;
  style?: any;
  label?: string;
  mode?: "flat" | "outlined";
  autoComplete?: "email" | "password";
  keyboardType?: KeyboardTypeOptions;
  dense?: boolean;
  autoCorrect?: boolean;
  placeholder?: string;
  secureTextEntry?: boolean;
};

const CustomTextInput = ({
  value,
  onChangeText,
  style,
  label,
  mode,
  autoComplete,
  keyboardType,
  dense = true,
  autoCorrect = false,
  placeholder = "",
  secureTextEntry = false,
}: CustomTextInputType) => {
  return (
    <TextInput
      secureTextEntry={secureTextEntry}
      autoComplete={autoComplete}
      showSoftInputOnFocus={true}
      autoCapitalize="none"
      autoCorrect={autoCorrect}
      mode={mode}
      keyboardType={keyboardType}
      dense={dense}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      style={style}
      label={label}
    />
  );
};

export default CustomTextInput;
