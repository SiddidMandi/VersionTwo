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
import { TextInput } from "react-native-gesture-handler";

//the user setting the values happens here, pass through the TimerClock component, pass props
// the user has to press start or something, and input values FIRST before running the <TimerClock/>
//wrap the returns in an if statement

function TimerDisplay({
  setTimerShown,
  setRestAmount,
  setWorkAmount,
  setSessionAmount,
}) {
  return (
    <View>
      <Text> Timer DIsplay here, plz work</Text>
      <Text> How many sessions? </Text>
      <TextInput
        keyboardType="numeric"
        onChangeText={(val) => setSessionAmount(val)}
      />
      <Button title="start" onPress={() => setTimerShown(true)} />
    </View>
  );
}

export default function Timer() {
  //it is called restAmount in this one, on the TimerClock it is called workValue
  const [restAmount, setRestAmount] = useState(3);
  const [workAmount, setWorkAmount] = useState(4);
  const [sessionAmount, setSessionAmount] = useState(2);
  const [timerShown, setTimerShown] = useState(false);
  if (timerShown) {
    return (
      <SafeAreaView style={styles.innerContainer}>
        <TimerClock
          restValue={restAmount}
          workValue={workAmount}
          sessionValue={sessionAmount}
          setTimerShown={setTimerShown}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.innerContainer}>
        <TimerDisplay
          setTimerShown={setTimerShown}
          setRestAmount={setRestAmount}
          setWorkAmount={setWorkAmount}
          setSessionAmount={setSessionAmount}
        />
      </SafeAreaView>
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
  innerContainer: {
    marginTop: 172,
    marginBottom: 100,
  },
});
