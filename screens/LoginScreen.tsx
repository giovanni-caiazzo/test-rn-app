import React, { useState, useContext, useCallback } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  Button,
  Snackbar,
  Surface,
  ActivityIndicator,
  useTheme,
} from "react-native-paper";
import { SetDataContext } from "../utils/AppContext";
import { tryAuth } from "../utils/login";
import CustomText from "../components/CustomText";
import CustomTextInput from "../components/CustomTextInput";

const LoginScreen = ({ route }) => {
  const [email, setEmail] = useState("");
  const setCognitoToken = useContext(SetDataContext)?.setCognitoToken;
  const [error, setError] = useState(null);
  const [emailToken, setEmailToken] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const message = route?.params?.message;

  const exceptionFun = useCallback(() => {
    setError("There was an error!");
    setLoading(false);
    setCognitoToken(null);
    setEmailToken(null);
    setPassword(null);
  }, [setError, setLoading, setCognitoToken, setEmailToken, setPassword]);

  const handleEmailInput = useCallback(
    async (event) => {
      setLoading(true);
      event.preventDefault();
      // Dummy logic, usually it would use cognito to get an auth token
      if (email !== "test@gmail.com") {
        exceptionFun();
        return;
      }
      setEmailToken("Valid");
      setLoading(false);
    },
    [setLoading, email, setEmailToken, exceptionFun]
  );

  const dismissError = useCallback(() => {
    setError(null);
  }, [setError]);

  const handlePasswordInput = useCallback(
    async (event) => {
      event.preventDefault();
      setLoading(true);
      // Dummy logic, usually it would use cognito to get an auth token
      if (password !== "test" || !emailToken) {
        exceptionFun();
        return;
      }
      await tryAuth("Valid", setCognitoToken, exceptionFun);
    },
    [setLoading, emailToken, setCognitoToken, exceptionFun, password]
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Surface style={styles.root}>
          <View style={styles.grow} />
          <CustomTextInput
            placeholder={"Email"}
            autoComplete={"email"}
            autoCorrect={false}
            value={email}
            onChangeText={(email) =>
              setEmail(email.toLowerCase().replace(/\s/g, ""))
            }
            style={styles.emailInput}
          />
          {!!emailToken && (
            <CustomTextInput
              secureTextEntry={true}
              placeholder={"Password"}
              autoCorrect={false}
              onChangeText={(password) => setPassword(password)}
              style={styles.emailInput}
            />
          )}
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Button
              disabled={!email}
              onPress={(e) => {
                Keyboard.dismiss();
                if (!emailToken) {
                  handleEmailInput(e).then();
                } else {
                  handlePasswordInput(e).then();
                }
              }}
            >
              <CustomText
                style={{ ...styles.text, color: colors.primary }}
                isBold={true}
              >
                Enter
              </CustomText>
            </Button>
          )}
          <View style={styles.grow} />

          <Snackbar
            visible={!!error || !!message}
            onDismiss={dismissError}
            action={{
              label: "Chiudi",
              onPress: dismissError,
            }}
          >
            <CustomText style={{ color: colors.surfaceVariant }}>
              {error || message}
            </CustomText>
          </Snackbar>
        </Surface>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: "20%",
  },
  grow: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  emailInput: {
    marginBottom: "5%",
    marginHorizontal: "10%",
    fontWeight: "normal",
    fontFamily: "Gotham Bold",
  },
  text: {
    fontSize: 20,
  },
});

export default LoginScreen;
