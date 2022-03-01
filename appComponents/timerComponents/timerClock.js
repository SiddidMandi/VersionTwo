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

export default function TimerClock({ minutes = 20, isPaused = true }) {
  const secondsToMillis = (sec) => sec * 1000;
  const [workTimer, setWorkTimer] = useState(20);
  const [rest, setRest] = useState(secondsToMillis(2));
  const [work, setWork] = useState(12);
  const [isWorkRunning, setIsWorkRunning] = useState(true);
  const [workInterval, setWorkInterval] = useState(null);
  const [sessions, setSessions] = useState(2 - 1); // so it runs excat number of times

  useEffect(() => {
    console.log(workTimer);
    //   interval.current = setInterval(setRest(rest - 1000), 1000);
    if (isWorkRunning) {
      // 20, the default value of the workTimer
      setWorkInterval(
        setInterval(() => {
          setWorkTimer((current) => {
            /*  if (current >= 60) {
          return current / 60;
        } */
            return current - 1; //if it is more than 60 it is being converted to a minute, or it is just a second
          });
        }, 1000)
      );
      setIsWorkRunning(false);
    }
    if (workTimer === 0) {
      console.log("work? ");
      //   setIsWorkRunning(false); // u cant do this
      clearInterval(workInterval); //clears interval
    }

    /*if (sessions !== 0) {
      setSessions((current) => current - 1); //session value reducing by 1 if it isn't 0
    } */
    /* return () => {
      clearInterval(workInterval); //clean up proces of the useEffect, so the old timer won't exist in the app
    }; */
  }, [sessions, isWorkRunning, workTimer]); // workRunning will run work clock, if false useEffect runs but with the rest timer
  const seconds = Math.floor(rest / 1000);
  return (
    <View>
      <Text>{workTimer}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  timeText: {},
});
