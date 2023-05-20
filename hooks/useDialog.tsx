import CustomDialog from "../components/CustomDialog";
import { ReactNode, useState } from "react";
import { ImageSourcePropType } from "react-native";

type UseDialogType = {
  title: string;
  content: ReactNode;
  cancelProps?: any;
  doneProps?: any;
  continueProps?: any;
  headerImage?: ImageSourcePropType;
  height?: number;
};
export const useDialog = ({
  title,
  content,
  cancelProps,
  doneProps,
  continueProps,
  headerImage,
  height,
}: UseDialogType) => {
  const [visible, setVisible] = useState(false);

  const toggleDialog = (open) => () => setVisible(open);

  return {
    dialog: (
      <CustomDialog
        visible={visible}
        toggleDialog={toggleDialog}
        title={title}
        content={content}
        cancelProps={cancelProps}
        doneProps={doneProps}
        continueProps={continueProps}
        headerImage={headerImage}
        height={height}
      />
    ),
    toggleDialog: toggleDialog,
  };
};
