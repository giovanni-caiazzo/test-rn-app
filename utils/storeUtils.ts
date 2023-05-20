import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.log('STORE ERROR', error);
    }
};

export const retrieveData = async key => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.log('RETRIEVE ERROR', error);
        return null;
    }
};
