import React, { useState, useEffect, Children, useCallback } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  StatusBar,
  ImageBackground,
  Dimensions,
  Button,
  Vibration,
} from "react-native";
import { Audio } from "expo-av";
import FlatButton from "../../newassets/cards/button";
import Animated from "react-native-reanimated";

export default function TimerClock({
  workValue,
  restValue,
  //session value NOT plural
  sessionValue,
  setTimerShown,
}) {
  //const secondsToMillis = (sec) => sec * 1000;          useless
  const [workTimer, setWorkTimer] = useState(workValue);
  const [restTimer, setRestTimer] = useState(restValue);
  //const [rest, setRest] = useState(secondsToMillis(2)); useless
  //const [work, setWork] = useState(12);                 useless
  const [isWorkRunning, setIsWorkRunning] = useState(true);
  const [isRestRunning, setIsRestRunning] = useState(false);
  const [workInterval, setWorkInterval] = useState(null);
  const [restInterval, setRestInterval] = useState(null);
  //the sessions is plural, but when regarding session value/amount, it is singular
  const [sessions, setSessions] = useState(sessionValue - 1); // so it runs excat number of times

  const [sound, setSound] = useState(null);
  const giveShit = require("../../newassets/sounds/nobodyGivesAShit.mp3");

  const playSound = useCallback(async () => {
    const { sound } = await Audio.Sound.createAsync(giveShit);
    setSound(sound);
    await sound.playAsync();
  });

  // for the custom one with minutes and all, just do some converstions and if statements in the setWorkInterval
  useEffect(() => {
    console.log("work amount in seconds: ", workTimer);
    if (isWorkRunning) {
      setWorkInterval(
        setInterval(() => {
          setWorkTimer((current) => {
            return current - 1; //if it is more than 60 it is being converted to a minute, or it is just a second
          });
        }, 1000)
      );
      setIsWorkRunning(false);
    }
    if (workTimer === 0 && isRestRunning === false) {
      clearInterval(workInterval); //clears interval
      // add end of work alert here
      setIsRestRunning(true);
    }
  }, [isWorkRunning, workTimer]); // workRunning will run work clock, if false useEffect runs but with the rest timer
  useEffect(() => {
    if (isRestRunning) {
      setRestInterval(
        setInterval(() => {
          setRestTimer((current) => {
            return current - 1;
          });
        }, 1000) //the 1000 here is miliseconds and is the tick rate
      );
      setIsRestRunning(false);
      // add end rest vibration here, add a time value in the brackets
      Vibration.vibrate(300);
      //this sound plays when rest starts
      playSound();
    }
    if (restTimer === 0 && isWorkRunning === false) {
      //   setIsWorkRunning(false); // u cant do this
      clearInterval(restInterval); //clears interval
      if (sessions !== 0) {
        setSessions((current) => current - 1); //session value reducing by 1 if it isn't 0
        setIsWorkRunning(true);
        setWorkTimer(workValue);
        setRestTimer(restValue);
        //add end sessions alert here
        Vibration.vibrate(500);
      }
      if (sessions === 0) {
        //turn the timershows prop into a useState thing
        setTimerShown(false);
      }
    }
  }, [isRestRunning, restTimer]);
  // try the progress bar from the udemy course. react-native-paper
  const workConvertSecondToMinute = () => {
    const minutes = Math.floor(parseInt(workTimer) / 60);
    const seconds = parseInt(workTimer) - parseInt(minutes) * 60;
    if (minutes < 10) {
      if (seconds < 10) {
        return `0${minutes}:0${seconds}`;
      } else {
        return `0${minutes}:${seconds}`;
      }
    } else {
      if (seconds < 10) {
        return `${minutes}:0${seconds}`;
      } else {
        return `${minutes}:${seconds}`;
      }
    }
  };
  // make work the same as rest for the minutes thing
  const restConvertSecondToMinute = () => {
    const minutes = Math.floor(parseInt(restTimer) / 60);
    const seconds = parseInt(restTimer) - parseInt(minutes) * 60;
    if (minutes < 10) {
      if (seconds < 10) {
        return `0${minutes}:0${seconds}`;
      } else {
        return `0${minutes}:${seconds}`;
      }
    } else {
      if (seconds < 10) {
        return `${minutes}:0${seconds}`;
      } else {
        return `${minutes}:${seconds}`;
      }
    }
  };
  const terminateTimer = () => {
    clearInterval(workInterval);
    clearInterval(restInterval);
    setTimerShown(false);
  };
  console.log("sessionValue here: ", sessionValue);
  const listSession = [];
  //backgroundColor edit for different colors
  for (let i = 0; i < sessionValue; i++) {
    listSession.push(
      <View
        key={i}
        style={[
          styles.boxesStyle,
          {
            backgroundColor: i <= sessions - 1 ? "red" : "blue",
            flex: 1,
          },
        ]}
      ></View>
    );
  }

  //in the return, the things are called workTimer and restTimer
  return (
    <View>
      <View
        style={{ flexDirection: "row", backgroundColor: "#00ff00", flex: 1 }}
      >
        {listSession}
      </View>
      <Text style={styles.sessionText}> Sessions left: {sessions}</Text>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>Work: {workConvertSecondToMinute()}</Text>
        <Text style={styles.timeText}>Rest: {restConvertSecondToMinute()}</Text>
      </View>
      <Animated.View>
        <Text> work </Text>
      </Animated.View>
      <Button title="vibrate" onPress={() => Vibration.vibrate(1000)} />
      <FlatButton onPress={() => terminateTimer()} text="cancel" />
    </View>
  );
}

//    width: Dimensions.get("window").width/sessionValue,
const styles = StyleSheet.create({
  sessionText: {
    fontFamily: "dongleBold",
    fontSize: 60,
    marginTop: 70,

    //color: "#bcd9f5" uncomment when background is added
  },
  boxesStyle: {
    backgroundColor: "#ff0000",
    padding: 10,
    height: 60,
    margin: 5,
  },
  timeContainer: {
    justifyContent: "center",
    alignItems: "center",
    //color: "#bcd9f5" uncomment when background is added
  },
  timeText: {
    fontFamily: "dongleBold",
    fontSize: 50,
    //color: "#bcd9f5" uncomment when background is added
  },
});
