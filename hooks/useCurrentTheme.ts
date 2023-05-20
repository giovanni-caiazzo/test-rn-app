import {useEffect, useState} from "react";
import {MD3DarkTheme, MD3LightTheme} from "react-native-paper";
import {useColorScheme} from "react-native";

const useCurrentTheme = () => {
    const colorScheme = useColorScheme();
    const [currentTheme, setCurrentTheme] = useState(colorScheme && colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme);

    useEffect(() => {
        setCurrentTheme(colorScheme && colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme);
    }, [colorScheme]);

    return {currentTheme, colorScheme}
}

export default useCurrentTheme;