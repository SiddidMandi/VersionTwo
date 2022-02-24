import { StyleSheet, View } from "react-native";
import React from "react";

export default function EntryCard(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 0.7,
    flexDirection: "column",
    borderRadius: 6,
    backgroundColor: "#30435a",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#7be9ff",
    shadowOpacity: 0.8,
    marginHorizontal: 5,
    marginVertical: 5,
    opacity: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    marginHorizontal: 1,
    marginVertical: 1,
    opacity: 1,
  },
});
