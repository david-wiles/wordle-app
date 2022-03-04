import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {BoxState} from "./WordleBox";

// The valid props for a keyboard instance
interface KeyboardProps {
  letterState: Map<string, BoxState>;

  // onLetter is called whenever a letter is pressed on the WordleKeyboard
  // This callback is passed down to each letter in the keyboard
  onLetter(letter: string): void

  // onSubmit is called whenever the enter button is pressed
  // This is passed down to the enter button component
  onSubmit(): void

  // onDelete is called whenever the delete button is pressed
  // This is passed down to the delete button component
  onDelete(): void
}

interface KeyboardButtonProps {
  text: string;
  state: BoxState,

  onPress(letter: string): void
}

function KeyboardButton(props: KeyboardButtonProps) {
  return (
    <TouchableHighlight style={[styles.keyboardButton, getButtonStyle(props.state)]}
                        underlayColor={'blue'}
                        onPress={() => props.onPress(props.text)}>
      <Text style={styles.keyboardButtonText}>
        {props.text}
      </Text>
    </TouchableHighlight>
  );
}

export default function WordleKeyboard(props: KeyboardProps) {

  // Build a keyboard button for the given character
  const getLetter = (char: string) => {
    return <KeyboardButton onPress={(l) => props.onLetter(l)}
                           text={char}
                           state={props.letterState.get(char) || BoxState.Unknown}
                           key={char}/>
  }

  return (
    <View style={styles.stickyBottom}>
      <View style={styles.keyboardRow}>
        {
          ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(getLetter)
        }
      </View>
      <View style={styles.keyboardRow}>
        {
          ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(getLetter)
        }
      </View>
      <View style={styles.keyboardRow}>
        <KeyboardButton text={'Enter'} state={BoxState.Unknown} onPress={() => {
          props.onSubmit()
        }}/>
        {
          ['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(getLetter)
        }
        <KeyboardButton text={'Del'} state={BoxState.Unknown} onPress={() => {
          props.onDelete()
        }}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stickyBottom: {
    bottom: 0,
    width: '100%',
    position: 'absolute',
    paddingBottom: 50
  },
  keyboardButton: {
    padding: 3,
    margin: 1,
    borderRadius: 4,
  },
  keyboardButtonText: {
    fontSize: 28
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  letterPresent: {},
  letterCorrect: {},
  letterIncorrect: {},
  letterUnknown: {
    backgroundColor: 'lightgray'
  }
});

// Get the proper style for the given BoxState
const getButtonStyle = (state: BoxState) => {
  switch (state) {
    case BoxState.Present:
      return styles.letterPresent
    case BoxState.Correct:
      return styles.letterCorrect;
    case BoxState.Incorrect:
      return styles.letterIncorrect;
  }

  return styles.letterUnknown;
};
