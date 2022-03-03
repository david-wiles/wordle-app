import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {BoxState} from "./WordleBox";

interface KeyboardProps {
  letterState: Map<string, BoxState>;

  onLetter(letter: string): void

  onSubmit(): void

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
  letterUnknown: {
    backgroundColor: 'lightgray'
  }
});

const getButtonStyle = (state: BoxState) => {
  switch (state) {
    case BoxState.Present:
      return styles.letterPresent
    case BoxState.Correct:
      return styles.letterCorrect;
  }

  return styles.letterUnknown;
};
