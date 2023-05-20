import { ReactNode, useEffect, useState } from "react";
import { StyleSheet, View, Image, ImageSourcePropType } from "react-native";
import { Button, Portal, Surface, useTheme, Modal } from "react-native-paper";
import CustomText from "./CustomText";

type CustomDialogType = {
  visible: boolean;
  toggleDialog: Function;
  title: string;
  content: ReactNode;
  cancelProps?: Record<string, any>;
  doneProps?: Record<string, any>;
  continueProps?: Record<string, any>;
  headerImage?: ImageSourcePropType;
  height?: number | string;
};
const CustomDialog = ({
  visible,
  toggleDialog,
  title,
  content,
  cancelProps,
  doneProps,
  continueProps,
  headerImage,
  height,
}: CustomDialogType) => {
  const { colors } = useTheme();
  const [img, setImg] = useState(headerImage);

  useEffect(() => {
    setImg(headerImage);
  }, [headerImage]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={toggleDialog(false)}
        contentContainerStyle={{ ...styles.root, height: height || "95%" }}
      >
        <Surface style={styles.surface}>
          <View style={!img ? styles.headerNoImg : styles.header}>
            <CustomText style={styles.title}>{title}</CustomText>
            {img && <Image source={img} style={styles.imageFromUri} />}
          </View>
          <View style={styles.content}>{content}</View>
          <View style={styles.actions}>
            {cancelProps ? (
              <Button
                onPress={() => {
                  if (cancelProps.fun) {
                    cancelProps.fun();
                  }
                  toggleDialog(false)();
                }}
              >
                <CustomText style={{ color: colors.secondary }} isBold={true}>
                  {cancelProps.text || "Annulla"}
                </CustomText>
              </Button>
            ) : null}
            {doneProps ? (
              <Button
                onPress={() => {
                  if (doneProps.fun) {
                    doneProps.fun();
                  }
                  toggleDialog(false)();
                }}
                disabled={!!doneProps.disabled}
              >
                <CustomText style={{ color: colors.primary }} isBold={true}>
                  {doneProps.text || "Fatto"}
                </CustomText>
              </Button>
            ) : null}
            {continueProps ? (
              <Button
                onPress={() => {
                  if (continueProps.fun) {
                    continueProps.fun();
                  }
                  toggleDialog(false)();
                }}
                disabled={!!continueProps.disabled}
              >
                <CustomText style={{ color: colors.primary }} isBold={true}>
                  {continueProps.text || "Continua"}
                </CustomText>
              </Button>
            ) : null}
          </View>
        </Surface>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: -20,
  },
  headerNoImg: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 10,
  },
  title: {
    fontFamily: "Gotham Bold",
    fontSize: 22,
  },
  surface: {
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 10,
    width: "100%",
    height: "100%",
  },
  content: { flex: 1 },
  actions: { flexDirection: "row", justifyContent: "flex-end" },
  imageFromUri: {
    resizeMode: "contain",
    width: 80,
    height: 80,
    borderRadius: 10,
  },
});

export default CustomDialog;
