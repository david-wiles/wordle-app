import {StyleSheet, View, Text} from "react-native";

// BoxState is an enum containing valid representations of the state for the
// guess of a single letter. This will be used by the box as well as keyboard
enum BoxState {
  Unknown = 'unknown',
  Present = 'present',
  Correct = 'correct',
  Incorrect = 'incorrect'
}

// BoxProps contains the props for a single WordleBox
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

// Get the proper box style for the given BoxState
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
