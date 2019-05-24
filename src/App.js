import React from "react";
import { StyleSheet, View, Button, Dimensions } from "react-native";
import { createDeck, sizeX } from "./deck";

const maxCellWidth = (Dimensions.get("window").width - sizeX) / sizeX;
const cellSize = Math.min(maxCellWidth, 35);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  cell: {
    width: cellSize,
    height: cellSize,
    borderColor: "#ccc",
    borderWidth: 1
  },
  filledCell: {
    backgroundColor: "pink"
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  buttonContainer: {
    marginTop: 48
  }
});

const Cell = ({ value }) => (
  <View style={[styles.cell, value === 1 && styles.filledCell]} />
);

const DeckVis = ({ deck }) => {
  return (
    <View>
      {deck.map((el, idx) => {
        return (
          <View key={idx} style={styles.row}>
            {el.map((n, idx2) => (
              <Cell key={idx2} value={n} />
            ))}
          </View>
        );
      })}
    </View>
  );
};

// there is no expo sdk with the latest react-native version where hooks are supported
export default class App extends React.Component {
  state = { deck: createDeck() };

  handleTap = () => this.setState({ deck: createDeck() });

  render() {
    return (
      <View style={styles.container}>
        <DeckVis deck={this.state.deck} />
        <View style={styles.buttonContainer}>
          <Button onPress={this.handleTap} title="Create another 🛳" />
        </View>
      </View>
    );
  }
}
