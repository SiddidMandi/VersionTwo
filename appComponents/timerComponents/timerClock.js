import React, { useState, useEffect, Children } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  StatusBar,
  ImageBackground,
} from "react-native";
import FlatButton from "../../newassets/cards/button";

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
    }
    if (restTimer === 0 && isWorkRunning === false) {
      //   setIsWorkRunning(false); // u cant do this
      clearInterval(restInterval); //clears interval
      if (sessions !== 0) {
        setSessions((current) => current - 1); //session value reducing by 1 if it isn't 0
        setIsWorkRunning(true);
        setWorkTimer(workValue);
        setRestTimer(restValue);
        //add end rest alert here
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
    if (seconds < 10) {
      return `${minutes}:0${seconds}`;
    } else {
      return `${minutes}:${seconds}`;
    }
  };
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
  //in the return, the things are called workTimer and restTimer
  return (
    <View>
      <Text style={styles.sessionText}> Sessions left: {sessions}</Text>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{workConvertSecondToMinute()} </Text>
        <Text style={styles.timeText}>{restConvertSecondToMinute()}</Text>
      </View>
      <FlatButton onPress={() => terminateTimer()} text="cancle" />
    </View>
  );
}

const styles = StyleSheet.create({
  sessionText: {
    fontFamily: "dongleBold",
    fontSize: 60,

    //color: "#bcd9f5" uncomment when background is added
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
