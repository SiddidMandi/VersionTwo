import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  StatusBar,
  ImageBackground,
} from "react-native";

export default function TimerClock({ minutes = 20 }) {
  const secondsToMillis = (sec) => sec * 1000;
  const [rest, setRest] = useState();
  const [work, setWork] = useState();
  const [sessions, setSessions] = useState();

  return <View></View>;
}

const styles = StyleSheet.create({});
