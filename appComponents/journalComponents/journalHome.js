import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import uuid from "react-native-uuid";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-gesture-handler";
//
import Card from "../../newassets/cards/card";
import EntryCard from "../../newassets/cards/entryCard";
import FlatButton from "../../newassets/cards/button";
import AddEntry from "./adder";
import * as Animatable from "react-native-animatable";

export default function JournalHome() {
  const saveJournal = async (journal) => {
    try {
      const stringifyJournal = JSON.stringify(journal);
      await AsyncStorage.setItem("journal", stringifyJournal);
    } catch (e) {
      console.log(e);
    }
  };
  const receiveJournal = async () => {
    try {
      const journal = await AsyncStorage.getItem("journal");
      if (journal != null) {
        setJournal(JSON.parse(journal));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [journal, setJournal] = useState([]);
  useEffect(() => {
    receiveJournal();
  }, []);
  useEffect(() => {
    saveJournal(journal);
  }, [journal]);
  const [isRender, setIsRender] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [inputText, setInputText] = useState();
  const [editItem, setEditItem] = useState();
  const onPressFunction = (item) => {
    setModalOpen(true);
    setInputText(item.entry);
    setEditItem(item.key);
  };
  const deleteHandler = (key, item) => {
    setJournal((prevJournal) => {
      return prevJournal.filter((journal) => journal.key != key);
    });
  };
  const renderItemFunction = ({ item, index }) => {
    return (
      <Animatable.View animation="fadeInUp" duration={1000} delay={index * 300}>
        <TouchableOpacity onPress={() => onPressFunction(item)}>
          <Card>
            <View style={styles.dateTextView}>
              <Text style={styles.dateText}> {item.date} </Text>
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

  const handleEditItem = (editItem) => {
    const newJournal = journal.map((item) => {
      if (item.key == editItem) {
        item.entry = inputText;
        return item;
      }
      return item;
    });
    setJournal(newJournal);
    setIsRender(!isRender);
  };
  const onPressSaveEdit = () => {
    handleEditItem(editItem);
    setModalOpen(false);
  };
  //the adder modal is modalopen2
  const addEntry = (entry) => {
    entry.key = uuid.v4();
    setJournal((currentJournal) => {
      return [entry, ...currentJournal];
    });
    setModalOpen2(false);
  };
  const deleteAll = () => {
    Alert.alert("Confirm to delete all entries?", "Clear entries", [
      { text: "yes", onPress: () => setJournal([]) },
      { text: "NO" },
    ]);
  };
  return (
    <ImageBackground
      source={require("../../newassets/images/appBackground.png")}
      style={styles.container}
    >
      <SafeAreaView style={styles.innerContainer}>
        <View style={styles.buttonContainer}>
          <MaterialIcons
            name="delete"
            size={24}
            style={styles.addAndDeleteButton}
            onPress={() => deleteAll()}
          />
          <MaterialIcons
            name="add"
            size={24}
            style={styles.addAndDeleteButton}
            onPress={() => setModalOpen2(true)}
          />
        </View>
        <Modal
          animationType="slide"
          transparent
          visible={modalOpen}
          onRequestClose={() => setModalOpen(false)}
        >
          <EntryCard>
            <ScrollView>
              <Text style={styles.entryTitleText}> Entry: </Text>
              <TextInput
                multiline
                style={styles.entryText}
                onChangeText={(entry) => setInputText(entry)}
                defaultValue={inputText}
              />
            </ScrollView>
            <FlatButton text="Save changes" onPress={() => onPressSaveEdit()} />
            <FlatButton text="close" onPress={() => setModalOpen(false)} />
          </EntryCard>
        </Modal>
        <Modal transparent visible={modalOpen2} animationType="slide">
          <View style={{ marginTop: 200 }}>
            <ScrollView>
              <AddEntry addEntry={addEntry} />
            </ScrollView>
            <FlatButton text="close" onPress={() => setModalOpen2(false)} />
          </View>
        </Modal>
        <FlatList
          data={journal}
          keyExtractor={(item) => item.key.toString()}
          renderItem={renderItemFunction}
          extraData={isRender}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

/*

*/
//with transparent header, make an innerContainer and add a marginTop

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    marginTop: 100,
    marginBottom: 120,
  },
  dateText: {
    fontFamily: "mochiyBold",
    marginHorizontal: 10,
    marginVertical: 5,
    flex: 1,
  },
  dateTextView: {
    flex: 1,
    flexDirection: "row",
  },
  //flatlistView
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
  //buttons
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    flexDirection: "row",
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
  //etry modal
  entryTitleText: {
    fontSize: 48,
    color: "#fff",
    fontFamily: "dongleBold",
  },
  entryText: {
    fontSize: 28,
    color: "#fff",
    fontFamily: "dongleRegular",
  },
});
