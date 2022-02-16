import { StyleSheet, View } from "react-native";
import React from "react";

export default function MiniCard(props) {
  return (
    <View style={styles.miniCard}>
      <View style={styles.miniCardContent}>{props.children}</View>
    </View>
  );
}
//text in mini card won't extend sideways cuz width is fixed
const styles = StyleSheet.create({
  miniCard: {
    padding: 5,
    marginTop: 10,
    flexDirection: "row",
    borderRadius: 6,
    elevation: 15,
    backgroundColor: "#1a3b61",
    marginVertical: 6,
    marginHorizontal: 1,
    width: 67.5,
    opacity: 1,
  },
  miniCardContent: {
    flexDirection: "row",
    marginHorizontal: 0,
    marginVertical: 2,
  },
});
