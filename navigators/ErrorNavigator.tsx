import { createStackNavigator } from '@react-navigation/stack';
import ErrorScreen from '../screens/ErrorScreen';

const Stack = createStackNavigator();

export const ErrorNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Error" component={ErrorScreen} />
    </Stack.Navigator>
);
