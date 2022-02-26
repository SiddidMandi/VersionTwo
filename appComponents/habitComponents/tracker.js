import React, { useState, useEffect } from "react";
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  Modal,
  ImageBackground,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
//
import DayAdder from "./dayAdder";
import Card from "../../newassets/cards/card";
import MiniCard from "../../newassets/cards/miniCard";
import FlatButton from "../../newassets/cards/button";
import * as Animatable from "react-native-animatable";

export default function Habits() {
  const saveDays = async (days) => {
    try {
      const stringifyDays = JSON.stringify(days);
      await AsyncStorage.setItem("days", stringifyDays);
    } catch (e) {
      console.log(e);
    }
  };
  const receiveDays = async () => {
    try {
      const days = await AsyncStorage.getItem("days");
      if (days != null) {
        setDays(JSON.parse(days));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const [days, setDays] = useState([]);
  useEffect(() => {
    receiveDays();
  }, []);
  useEffect(() => {
    saveDays(days);
  }, [days]);

  const [modalOpen, setModalOpen] = useState(false);
  const addDay = (day) => {
    day.key = uuid.v4();
    setDays((currentDays) => {
      return [day, ...currentDays];
    });
    setModalOpen(false);
  };
  const deleteAll = () => {
    Alert.alert("Confirm to delete all days?", "Clear days", [
      { text: "yes", onPress: () => setDays([]) },
      { text: "no" },
    ]);
  };
  const deleteHandler = (key) => {
    setDays((prevDays) => {
      return prevDays.filter((day) => day.key != key);
    });
  };
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../newassets/images/appBackground.png")}
    >
      <SafeAreaView style={styles.innerContainer}>
        <View style={styles.buttonsContainer}>
          <MaterialIcons
            name="delete"
            style={styles.deleteAllButton}
            onPress={() => deleteAll()}
            size={24}
          />
          <MaterialIcons
            name="add"
            style={styles.deleteAllButton}
            size={24}
            onPress={() => setModalOpen(true)}
          />
        </View>
        <Modal transparent visible={modalOpen} animationType="slide">
          <View style={{ marginTop: 69 }}>
            <DayAdder addDay={addDay} />
          </View>
          <FlatButton text="close" onPress={() => setModalOpen(false)} />
        </Modal>
        <FlatList
          data={days}
          renderItem={({ item, index }) => (
            <Animatable.View
              animation="fadeInUp"
              duration={1000}
              delay={index * 300}
            >
              <View style={styles.cardContainer}>
                <Card>
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <MaterialIcons
                      name="delete"
                      onPress={() => deleteHandler(item.key)}
                      size={20}
                      style={styles.flatlistDelete}
                    />
                  </View>
                  <View style={styles.miniCardView}>
                    <MiniCard>
                      <Text style={styles.habitText}>{item.habit1}</Text>
                    </MiniCard>
                    <MiniCard>
                      <Text style={styles.habitText}> {item.habit2}</Text>
                    </MiniCard>
                    <MiniCard>
                      <Text style={styles.habitText}> {item.habit3}</Text>
                    </MiniCard>
                    <MiniCard>
                      <Text style={styles.habitText}> {item.habit4}</Text>
                    </MiniCard>
                    <MiniCard>
                      <Text style={styles.habitText}> {item.habit5}</Text>
                    </MiniCard>
                  </View>
                </Card>
              </View>
            </Animatable.View>
          )}
        />
      </SafeAreaView>
    </ImageBackground>
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
    marginBottom: 120,
  },
  moddalView: {
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    flexDirection: "column",
  },
  habitText: {
    fontSize: 23,
    fontFamily: "dongleRegular",
    color: "#fbff6a",
  },
  miniCardView: {
    flexDirection: "row",
  },
  dateText: {
    color: "#000",
    flexDirection: "column",
    fontFamily: "mochiyBold",
    flex: 0.98,
  },
  deleteAllButton: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    backgroundColor: "#d1529f",
    color: "#fff",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
    opacity: 0.7,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  dateContainer: {
    flexDirection: "row",
  },
  flatlistDelete: {
    padding: 5,
    paddingLeft: 7,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    color: "#000",
    borderRadius: 30,
    borderColor: "#d42efa",
    backgroundColor: "#f00",
    opacity: 0.6,
  },
});
