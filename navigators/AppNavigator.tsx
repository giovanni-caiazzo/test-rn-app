import { useContext } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { HomeNavigator } from './HomeNavigator';
import { LoginNavigator } from './LoginNavigator';
import { DataContext } from '../utils/AppContext';
import { StatusBar } from 'expo-status-bar';
import { ErrorNavigator } from './ErrorNavigator';

const AppNavigator = ({ theme }) => {
    const cognitoToken = useContext(DataContext)?.cognitoToken;
    const error = useContext(DataContext)?.error;

    return (
        <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
            <StatusBar animated={true} backgroundColor="transparent" translucent={true} />
            {!error && !cognitoToken && <LoginNavigator />}
            {!error && cognitoToken && <HomeNavigator />}
            {error && <ErrorNavigator />}
        </NavigationContainer>
    );
};

export default AppNavigator;
