import "react-native-get-random-values";
import { Provider as PaperProvider, Snackbar } from "react-native-paper";
import { DataContext, SetDataContext } from "./utils/AppContext";
import AppNavigator from "./navigators/AppNavigator";
import CustomText from "./components/CustomText";
import useAutomaticLogin from "./hooks/useAutomaticLogin";
import useIsCurrentlyConnected from "./hooks/useIsCurrentlyConnected";
import useCurrentTheme from "./hooks/useCurrentTheme";

const App = () => {
  const { isCurrentlyConnected } = useIsCurrentlyConnected();
  const {
    data,
    setData,
    cognitoToken,
    setCognitoToken,
    error,
    setError,
    tryingAuth,
  } = useAutomaticLogin(isCurrentlyConnected);
  const { currentTheme, colorScheme } = useCurrentTheme();

  if (tryingAuth) {
    return null;
  }

  return (
    <PaperProvider theme={currentTheme}>
      <DataContext.Provider
        value={{ data, cognitoToken, isCurrentlyConnected, error }}
      >
        <SetDataContext.Provider value={{ setData, setCognitoToken, setError }}>
          <AppNavigator theme={colorScheme} />
          <Snackbar onDismiss={() => {}} visible={!isCurrentlyConnected}>
            <CustomText style={{ color: currentTheme.colors.surfaceVariant }}>
              Not connected, functionalities are limited.
            </CustomText>
          </Snackbar>
        </SetDataContext.Provider>
      </DataContext.Provider>
    </PaperProvider>
  );
};

export default App;
