import {StyleSheet, View} from 'react-native';
import WordleRow from "../components/WordleRow";
import {BoxProps, BoxState} from "../components/WordleBox";

import {useState} from 'react';
import WordleKeyboard from "../components/WordleKeyboard";

interface WordleProps {
  guessCount: number;
  wordleSize: number;
  word: string;
}

const initRows = (rows: number, wordleSize: number): Array<Array<BoxProps>> => {
  let r: Array<Array<BoxProps>> = [];
  for (let i = 0; i < rows; i++) {
    r[i] = Array(wordleSize).fill({letter: '', state: BoxState.Unknown});
  }
  return r;
};

const updateRows = (arr: Array<Array<BoxProps>>, row: number, col: number, prop: BoxProps): Array<Array<BoxProps>> => {
  return arr.map((r, i) => r.map((box, j) => (i === row && j === col) ? prop : box));
};

export default function Wordle(props: WordleProps) {
  // Store the state of each row of letters
  // The default state is n empty rows
  const [boxes, setBoxes] = useState<Array<Array<BoxProps>>>(initRows(props.guessCount, props.wordleSize));

  // Store the current active row and columns
  const [activeRow, setActiveRow] = useState<number>(0);
  const [activeCol, setActiveCol] = useState<number>(0);

  // Map each letter to a state so the keyboard can modify its behavior
  const [map, setMap] = useState<Map<string, BoxState>>(new Map());

  return (
    <View style={styles.container}>
      {
        boxes.map((row, i) => <WordleRow word={row} position={i} key={'row-' + i}/>)
      }
      <WordleKeyboard letterState={map}
                      onLetter={(letter: string) => {
                        // Update letter
                        setBoxes((old) => {
                          if (activeCol < props.wordleSize) {
                            return updateRows(old, activeRow, activeCol, {
                              letter, state: BoxState.Unknown
                            });
                          }
                          return old;
                        });
                        // Update active column
                        setActiveCol((col) => col < props.wordleSize ? col + 1 : col);
                      }}
                      onSubmit={() => {
                        if (activeCol === props.wordleSize) {
                          setBoxes((old) => {
                            return old.map((row, i) => row.map((box, j) => {
                              if (i === activeRow) {
                                // Check each letter in the wordle
                                if (props.word.charAt(j).toLowerCase() === box.letter.toLowerCase()) {
                                  return {
                                    letter: box.letter,
                                    state: BoxState.Correct
                                  };
                                } else if (props.word.includes(box.letter.toLowerCase())) {
                                  return {
                                    letter: box.letter,
                                    state: BoxState.Present
                                  };
                                } else {
                                  return {
                                    letter: box.letter,
                                    state: BoxState.Incorrect
                                  }
                                }
                              } else {
                                return box;
                              }
                            }));
                          });
                          setActiveRow((row) => row + 1);
                          setActiveCol(0);
                        }
                      }}
                      onDelete={() => {
                        // Remove the letter in the last column
                        setBoxes((old) => {
                          if (activeCol > 0) {
                            return updateRows(old, activeRow, activeCol - 1, {
                              letter: '', state: BoxState.Unknown
                            });
                          }
                          return old;
                        });
                        // Update active column
                        setActiveCol((col) => col > 0 ? col - 1 : col);
                      }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: 'black'
  },
});
