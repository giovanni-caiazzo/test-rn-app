import { ReactNode, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import CustomText from "./CustomText";

type TabbedContentType = {
  tabs: { id: string; label: string; number?: number }[];
  content: Record<string, ReactNode>;
};
const TabbedContent = ({ tabs, content }: TabbedContentType) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const { colors } = useTheme();
  return (
    <View style={styles.root}>
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <View key={tab.id} style={styles.tab}>
            <Button
              mode={activeTab === tab.id ? "outlined" : "text"}
              onPress={() => setActiveTab(tab.id)}
              style={styles.tabButton}
            >
              <CustomText
                style={{
                  color:
                    activeTab === tab.id ? colors.secondary : colors.primary,
                }}
              >
                {tab.label}
              </CustomText>
              {tab.number ? (
                <CustomText isBold={true} style={{ color: colors.secondary }}>
                  &nbsp;&nbsp;{tab.number}
                </CustomText>
              ) : null}
            </Button>
          </View>
        ))}
      </View>
      {content[activeTab]}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  tabs: {
    flexDirection: "row",
  },
  tab: { marginRight: 10, marginBottom: 10 },
  tabButton: { flexDirection: "row", alignItems: "center" },
});

export default TabbedContent;
