import { useContext, useEffect } from "react";
import { StyleSheet, View, ImageBackground, FlatList } from "react-native";
import FeatureHomeIcon from "../components/FeatureHomeIcon";
import { features } from "../utils/consts";
import { ActivityIndicator, Surface, useTheme } from "react-native-paper";
import BackendApprovedComponent from "../components/BackendApprovedComponent";
import { DataContext } from "../utils/AppContext";
import CustomText from "../components/CustomText";

const HomeTile = ({ item, navigation }) => {
  const { colors } = useTheme();
  return (
    <BackendApprovedComponent field={item.id} style={styles.tileContainer}>
      <FeatureHomeIcon
        title={item.title}
        image={item.image(colors.onSurface)}
        link={item.link}
        navigation={navigation}
      />
    </BackendApprovedComponent>
  );
};

const HomeScreen = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { data } = useContext(DataContext);
  const { app_configuration } = data;
  console.log({ app_configuration });

  useEffect(() => {
    if (route.params && route.params.readerData) {
      navigation.setParams({
        readerData: null,
        source: null,
        previousPage: route?.params?.previousPage,
      });
    }
  }, [route.params]);

  return (
    <Surface style={styles.root}>
      <ImageBackground
        source={data?.user?.logo_path}
        style={styles.image}
        imageStyle={{ opacity: 0.5, resizeMode: "contain" }}
      >
        {!app_configuration ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              color={colors.secondary}
              style={styles.loading}
            />
            <CustomText>Loading Home...</CustomText>
          </View>
        ) : null}
        <FlatList
          data={features}
          numColumns={2}
          renderItem={({ item }) => (
            <HomeTile item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
        />
      </ImageBackground>
    </Surface>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  tileContainer: {
    maxWidth: "50%",
    padding: 10,
  },
  image: {
    height: "100%",
    width: "100%",
    flex: 1,
  },
  loading: {
    width: 20,
    aspectRatio: 1,
    marginBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
