import React, { useState, useEffect } from "react";
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  Button,
  Modal,
  ImageBackground,
  Animated,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
//
import Card from "../../newassets/cards/card";
import FlatButton from "../../newassets/cards/button";
import TimerClock from "./timerClock";

//the user setting the values happens here, pass through the TimerClock component, pass props
// the user has to press start or something, and input values FIRST before running the <TimerClock/>
//wrap the returns in an if statement
export default function Timer() {
  const [restAmount, setRestAmount] = useState(10);
  const [timerShown, setTimerShown] = useState(false);
  return (
    <SafeAreaView style={styles.innerContainer}>
      <TimerClock
        restValue={restAmount}
        workValue={20}
        sessionValue={2}
        setTimerShown={setTimerShown()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    marginTop: 72,
    marginBottom: 100,
  },
});
