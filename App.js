import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { useState } from "react";
import AppLoading from "expo-app-loading";
import { MyTabs } from "./appComponents/navigators/tabs";

const getFonts = () => {
  return Font.loadAsync({
    mochiyBold: require("./newassets/fonts/MochiyPopPOne-Regular.ttf"),
    dongleRegular: require("./newassets/fonts/Dongle-Regular.ttf"),
    dongleBold: require("./newassets/fonts/Dongle-Bold.ttf"),
  });
};

export default function App() {
  const [fontsLoaded, setfontsLoaded] = useState(false);
  if (fontsLoaded) {
    return <MyTabs />;
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setfontsLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  fontTest: {
    fontFamily: "mochiyBold",
  },
});

/*
added:
expo font
expo app loading
--
navigation:
  @react-navigation/native
  @react-navigation/bottom-tabs
  @react-navigation/stack
  - react-native-gesture-handler - react-native-safe-area-context
  react-native-screens
  react-native-swipeout
  uuid: react-native-uuid
  async storage: @react-native-async-storage/async-storage
  formik: formik

  storage: @react-native-async-storage/async-storage

  icons: @expo/vector-icons

  splash writing color: f0c8d0
*/
