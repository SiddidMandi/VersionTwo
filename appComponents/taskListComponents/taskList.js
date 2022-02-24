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
import AddTask from "./taskAdder";
import FlatButton from "../../newassets/cards/button";
import * as Animatable from "react-native-animatable";

export default function TaskList() {
  const saveTasks = async (tasks) => {
    try {
      const stringifyTasks = JSON.stringify(tasks);
      await AsyncStorage.setItem("tasks", stringifyTasks);
    } catch (e) {
      console.log(e);
    }
  };
  const receiveTasks = async () => {
    try {
      const tasks = await AsyncStorage.getItem("tasks");
      if (tasks != null) {
        setTasks(JSON.parse(tasks));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const [tasks, setTasks] = useState([
    { task: "task one", completed: false, key: "69" },
    { task: "task two", completed: true, key: "62" },
    { task: "task three", completed: true, key: "64" },
  ]);
  useEffect(() => {
    receiveTasks();
  }, []);
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);
  const deleteAll = () => {
    Alert.alert("Confirm to delete all tasks?", "Clear tasks", [
      { text: "yes", onPress: () => setTasks([]) },
      { text: "no" },
    ]);
  };
  const [modalOpen, setModalOpen] = useState(false);
  const addTask = (task) => {
    task.key = uuid.v4();
    setTasks((currentTasks) => {
      return [task, ...currentTasks];
    });
    setModalOpen(false);
  };
  const deleteHandler = (key) => {
    setTasks((prevTasks) => {
      return prevTasks.filter((tasks) => tasks.key != key);
    });
  };
  const markTaskComplete = (key) => {
    const newTasks = tasks.map((item) => {
      if (item.key == key) {
        return { ...item, completed: true };
      }
      return item;
    });
    setTasks(newTasks);
  };

  const renderItemFunction = ({ item, index }) => {
    return (
      <Animatable.View animation="fadeInUp" duration={1000} delay={index * 300}>
        <TouchableOpacity onPress={() => markTaskComplete(item.key)}>
          <Card>
            <View style={styles.taskTextView}>
              <Text
                style={{
                  fontFamily: "mochiyBold",
                  marginHorizontal: 10,
                  marginVertical: 5,
                  flex: 1,
                  textDecorationLine: item?.completed ? "line-through" : "none",
                }}
              >
                {item.task}
              </Text>
              <MaterialIcons
                name="delete"
                style={styles.flatListDelete}
                size={25}
                onPress={() => deleteHandler(item.key)}
              />
            </View>
          </Card>
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../newassets/images/appBackground.png")}
    >
      <SafeAreaView style={styles.innerContainer}>
        <View style={styles.buttonContainer}>
          <MaterialIcons
            name="delete"
            style={styles.addAndDeleteButton}
            size={24}
            onPress={() => deleteAll()}
          />
          <MaterialIcons
            name="add"
            style={styles.addAndDeleteButton}
            size={24}
            onPress={() => setModalOpen(true)}
          />
          <Modal transparent visible={modalOpen} animationType="slide">
            <View style={{ marginTop: 200 }}>
              <AddTask addTask={addTask} />
              <FlatButton text="close" onPress={() => setModalOpen(false)} />
            </View>
          </Modal>
        </View>
        <View style={styles.flatListViewOne}>
          <FlatList data={tasks} renderItem={renderItemFunction} />
        </View>
        <View style={styles.flatListViewTwo}></View>
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
  //flatlist view
  flatListDelete: {
    padding: 5,
    paddingLeft: 7,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 30,
    borderColor: "#d42efa",
    backgroundColor: "#f00",
    opacity: 0.6,
  },

  taskText: {
    fontFamily: "mochiyBold",
    marginHorizontal: 10,
    marginVertical: 5,
    flex: 1,
  },
  taskTextView: {
    flex: 1,
    flexDirection: "row",
  },
  //buttons
  buttonContainer: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addAndDeleteButton: {
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
  flatListViewOne: {
    flex: 1,
  },
});
