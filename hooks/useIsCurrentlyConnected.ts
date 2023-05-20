import {useEffect, useState} from "react";
import NetInfo from "@react-native-community/netinfo";

const useIsCurrentlyConnected = () => {
    const [isCurrentlyConnected, setIsCurrentlyConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsCurrentlyConnected(state.isConnected);
        });

        return () => unsubscribe();
    }, []);

    return {isCurrentlyConnected}
}

export default useIsCurrentlyConnected;