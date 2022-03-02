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
import FlatButton from "../../newassets/cards/button";

export default function TimerClock({
  workValue,
  restValue,
  //session value NOT plural
  sessionValue,
  setTimerShown,
}) {
  const secondsToMillis = (sec) => sec * 1000;
  const [workTimer, setWorkTimer] = useState(workValue);
  const [restTimer, setRestTimer] = useState(restValue);
  //const [rest, setRest] = useState(secondsToMillis(2));
  //const [work, setWork] = useState(12); not needed anymore
  const [isWorkRunning, setIsWorkRunning] = useState(true);
  const [isRestRunning, setIsRestRunning] = useState(false);
  const [workInterval, setWorkInterval] = useState(null);
  const [restInterval, setRestInterval] = useState(null);
  //the sessions is plural, but when regarding sessino value/amount, it is singular
  const [sessions, setSessions] = useState(sessionValue - 1); // so it runs excat number of times

  // for the custom one with minutes and all, just do some converstions and if statements in the setWorkInterval
  useEffect(() => {
    console.log(workTimer, isRestRunning);
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
    if (workTimer === 0 && isRestRunning === false) {
      console.log("work? ");
      //   setIsWorkRunning(false); // u cant do this
      clearInterval(workInterval); //clears interval
      setIsRestRunning(true);
    }
    /*
     */

    /*if (sessions !== 0) {
      setSessions((current) => current - 1); //session value reducing by 1 if it isn't 0
    } */
    /* return () => {
      clearInterval(workInterval); //clean up proces of the useEffect, so the old timer won't exist in the app
    }; */
  }, [isWorkRunning, workTimer]); // workRunning will run work clock, if false useEffect runs but with the rest timer
  useEffect(() => {
    console.log(isRestRunning);
    if (isRestRunning) {
      console.log("rest working?");
      setRestInterval(
        setInterval(() => {
          setRestTimer((current) => {
            /*  if (current >= 60) {
          return current / 60;
        } */
            return current - 1; //if it is more than 60 it is being converted to a minute, or it is just a second
          });
        }, 1000)
      );
      setIsRestRunning(false);
    }
    if (restTimer === 0 && isWorkRunning === false) {
      console.log("rest? ");
      //   setIsWorkRunning(false); // u cant do this
      clearInterval(restInterval); //clears interval
      if (sessions !== 0) {
        setSessions((current) => current - 1); //session value reducing by 1 if it isn't 0
        setIsWorkRunning(true);
        setWorkTimer(workValue);
        setRestTimer(restValue);
      }
      if (sessions === 0) {
        //turn the timershows prop into a useState thing
        setTimerShown(false);
      }
    }
  }, [isRestRunning, restTimer]);

  console.log(workTimer, isRestRunning, isWorkRunning, "outside useEffect");
  return (
    <View>
      <Text> Sessions left: {sessions}</Text>
      <Text>{workTimer}</Text>
      <Text>{restTimer}</Text>
      <FlatButton onPress={() => setTimerShown(false)} text="cancle" />
    </View>
  );
}

const styles = StyleSheet.create({
  timeText: {},
});
