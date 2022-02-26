import { StyleSheet, TextInput, View } from "react-native";
import { Formik } from "formik";
import FlatButton from "../../newassets/cards/button";

//it always says date 69 at the start because props.values.entry and props.values.date was props.value.title/body

export default function AddTask({ addTask }) {
  return (
    <View>
      <Formik
        initialValues={{ task: "", completed: false }}
        onSubmit={(values) => {
          addTask(values);
        }}
      >
        {(props) => (
          <View style={styles.container}>
            <TextInput
              placeholder="  Task here"
              placeholderTextColor={"#fff"}
              onChangeText={props.handleChange("task")}
              value={props.values.task}
              style={styles.textInput}
            />
            <FlatButton text="sumbit" onPress={props.handleSubmit} />
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
