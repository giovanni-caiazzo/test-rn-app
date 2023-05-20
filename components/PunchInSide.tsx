import { useEffect } from "react";
import CustomSwitch from "./CustomSwitch";
import { useState } from "react";
import { useTheme } from "react-native-paper";

type PunchInSideType = {
  startValue: boolean;
  emitChange: (boolean) => void;
};

const PunchInSide = ({ startValue, emitChange }: PunchInSideType) => {
  const [isEndShift, setIsEndShift] = useState(startValue || false);
  const { dark } = useTheme();
  const toggleSwitch = () =>
    setIsEndShift((previousState) => {
      const new_state = !previousState;
      emitChange(new_state);
      return new_state;
    });

  useEffect(() => {
    setIsEndShift(startValue);
  }, [startValue]);

  return (
    <CustomSwitch
      value={isEndShift}
      trackColor={{ true: dark ? "#81b0ff" : "#03045e", false: "#81b0ff" }}
      thumbColor={!isEndShift ? "#f5dd4b" : "#f4f3f4"}
      ios_backgroundColor={"#81b0ff"}
      on_label="End"
      off_label="Start"
      emitResult={toggleSwitch}
    />
  );
};

export default PunchInSide;
