import {StyleSheet, View} from 'react-native';
import WordleBox, {BoxProps} from "./WordleBox";

interface RowProps {
  word: Array<BoxProps>;
  position: number;
}

export default function WordleRow(props: RowProps) {
  return (
    <View style={styles.wordleRow}>
      {
        props.word.map(({letter, state}, index) =>
          <WordleBox key={'row-' + props.position + '-box-' + index} letter={letter} state={state}/>)
      }
    </View>
  );
}

const styles = StyleSheet.create({
  wordleRow: {
    flexDirection: 'row'
  }
});

export {RowProps};
