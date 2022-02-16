import { StyleSheet, View } from "react-native";
import React from "react";

export default function Card(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "column",
    borderRadius: 6,
    backgroundColor: "#a9b2bc",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#7be9ff",
    shadowOpacity: 0.8,
    marginVertical: 5,
    width: 350,
    opacity: 0.9,
  },
  cardContent: {
    marginHorizontal: 1,
    marginVertical: 1,
    opacity: 1,
  },
});
