import React, { useState } from "react";
import { StyleSheet, Button, View, TextInput } from "react-native";
import { Formik } from "formik";
import FlatButton from "../../newassets/cards/button";

//initial values MUST be emmpty

export default function DayAdder({ addDay }) {
  return (
    <View>
      <Formik
        initialValues={{
          date: "",
          habit1: "",
          habit2: "",
          habit3: "",
          habit4: "",
          habit5: "",
        }}
        onSubmit={(values) => {
          addDay(values);
        }}
      >
        {(props) => (
          <View style={styles.container}>
            <TextInput
              style={styles.textInput}
              placeholderTextColor={"#fff"}
              placeholder="  date"
              onChangeText={props.handleChange("date")}
              value={props.values.date}
            />
            <TextInput
              style={styles.textInput}
              placeholderTextColor={"#fff"}
              placeholder="  add habit"
              onChangeText={props.handleChange("habit1")}
              value={props.values.habit1}
            />
            <TextInput
              style={styles.textInput}
              placeholderTextColor={"#fff"}
              placeholder="  add habit"
              onChangeText={props.handleChange("habit2")}
              value={props.values.habit2}
            />
            <TextInput
              style={styles.textInput}
              placeholderTextColor={"#fff"}
              placeholder="  add habit"
              onChangeText={props.handleChange("habit3")}
              value={props.values.habit3}
            />
            <TextInput
              style={styles.textInput}
              placeholder="  add habit"
              placeholderTextColor={"#fff"}
              onChangeText={props.handleChange("habit4")}
              value={props.values.habit4}
            />
            <TextInput
              style={styles.textInput}
              placeholderTextColor={"#fff"}
              placeholder="  add habit"
              onChangeText={props.handleChange("habit5")}
              value={props.values.habit5}
            />
            <FlatButton text="submit" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#443d4d",
    borderColor: "#e3d3f8",
    borderWidth: 1,
  },
  textInput: {
    marginHorizontal: 4,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 5,
    marginTop: 5,
    marginBottom: 2,
    fontSize: 18,
    borderRadius: 18,
  },
});
