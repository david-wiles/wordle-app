import {StyleSheet, View, Text} from "react-native";

enum BoxState {
  Unknown = 'unknown',
  Present = 'present',
  Correct = 'correct',
  Incorrect = 'incorrect'
}

interface BoxProps {
  letter: string,
  state: BoxState
}

export default function WordleBox(props: BoxProps) {
  return (
    <View style={[styles.wordleBox, getBoxStyle(props.state)]}>
      <Text style={styles.boxText}>{props.letter}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wordleBox: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    minWidth: 60,
    minHeight: 60,
    margin: 2,
    backgroundColor: '#3b3f41',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: 'white',
    fontSize: 36
  },
  boxIncorrect: {
    backgroundColor: 'black'
  },
  boxUnknown: {
    backgroundColor: 'grey'
  },
  boxPresent: {
    backgroundColor: 'yellow'
  },
  boxCorrect: {
    backgroundColor: 'green'
  },
});

const getBoxStyle = (state: BoxState) => {
  switch (state) {
    case BoxState.Incorrect:
      return styles.boxIncorrect;
    case BoxState.Present:
      return styles.boxPresent
    case BoxState.Correct:
      return styles.boxCorrect;
  }

  return styles.boxUnknown;
}

export {BoxProps, BoxState};
