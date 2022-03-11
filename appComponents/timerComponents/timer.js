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
  PermissionsAndroid,
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
import { Vibration } from "react-native-web";

//the user setting the values happens here, pass through the TimerClock component, pass props
// the user has to press start or something, and input values FIRST before running the <TimerClock/>
//wrap the returns in an if statement

function TimerDisplay({
  setTimerShown,
  setRestAmount,
  setWorkAmount,
  setSessionAmount,
}) {
  const [tempWorkAmountMins, setTempWorkAmountMins] = useState(0);
  const [tempWorkAmountSecs, setTempWorkAmountSecs] = useState(3);
  const [tempRestAmountMins, setTempRestAmountMins] = useState(0);
  const [tempRestAmountSecs, setTempRestAmountSecs] = useState(2);
  const StartTimerFunction = () => {
    setTimerShown(true);
    var wmins = tempWorkAmountMins;
    var wsecs = tempWorkAmountSecs;
    var totalworktime = parseInt(wmins) * 60 + parseInt(wsecs);
    setWorkAmount(parseInt(totalworktime)); //it works on place value? tens place is minutes, ones place is seconds?
    setRestAmount(
      parseInt(parseInt(tempRestAmountMins) * 60 + parseInt(tempRestAmountSecs))
    );
  };
  const requestVibratePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.VIBRATE,
        {
          title: "Vibrate Permission",
          message: "Require Vibrate",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("OK");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <View>
      <Text> Timer Display here, plz work</Text>
      <View style={styles.workTimeContainer}>
        <Text style={styles.timeText}> Sessions: </Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={(val) => setSessionAmount(val)}
          style={styles.timeInput}
        />
      </View>
      <View style={styles.workTimeContainer}>
        <Text style={styles.timeText}>Work time: </Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={(val) => setTempWorkAmountMins(val)}
          style={styles.timeInput}
        />
        <Text style={styles.timeText}> : </Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={(val) => setTempWorkAmountSecs(val)}
          style={styles.timeInput}
        />
      </View>
      <View style={styles.workTimeContainer}>
        <Text style={styles.timeText}> Rest time: </Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={(val) => setTempRestAmountMins(val)}
          style={styles.timeInput}
        />
        <Text style={styles.timeText}> : </Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={(val) => setTempRestAmountSecs(val)}
          style={styles.timeInput}
        />
      </View>
      <Button title="vibrate" onPress={() => Vibration.vibrate()} />

      <Button
        title="request permission"
        onPress={() => requestVibratePermission()}
      />
      <FlatButton text="start timer" onPress={() => StartTimerFunction(1000)} />
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
  workTimeContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    margin: 3,
  },
  timeText: {
    fontFamily: "dongleBold",
    fontSize: 30,
    //color: "#bcd9f5" uncomment when background is added
  },
  //number textInput style
  timeInput: {
    width: 30,
    fontSize: 16,
    borderWidth: 2,
    borderRadius: 10,
    //borderColor: "#bcd9f5", uncomment when background is added
    padding: 3,
  },
});
