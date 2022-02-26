import React, { useState, useEffect } from "react";
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
  const [rest, setRest] = useState(secondsToMillis(2));
  const [work, setWork] = useState(secondsToMillis(3));
  const [sessions, setSessions] = useState();

  useEffect(() => {
    interval.current = setInterval(setRest(rest - 1000), 1000);
  });
  return (
    <View>
      <Text>{rest}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  timeText: {},
});
