import {StyleSheet, View} from 'react-native';
import WordleRow from "../components/WordleRow";
import {BoxProps, BoxState} from "../components/WordleBox";

import {useState} from 'react';
import WordleKeyboard from "../components/WordleKeyboard";

// Props used by a Wordle component
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

/**
 * Update the rows given by the rows parameter.
 *
 * When a 2d array is used as state in a react component, the entire matrix must be copied
 * in order to update a single element (or elements). This function will update the value
 * at (i, j) in rows with the value given by prop.
 *
 * @param {Array<Array<BoxProps>>} rows
 * @param {number} row
 * @param {number} col
 * @param {BoxProps} prop
 */
const updateRows = (rows: Array<Array<BoxProps>>, row: number, col: number, prop: BoxProps): Array<Array<BoxProps>> => {
  return rows.map((r, i) => r.map((box, j) => (i === row && j === col) ? prop : box));
};

/**
 * Determine if the given word is in the dictionary.
 *
 * The guess word should be created from the letters in the active row. Dictionary
 * should be a pre-sorted array of strings, a binary search will be performed to
 * determine if the word exists in the dictionary.
 *
 * @param {Array<BoxProps>} word
 * @param {Array<string>} dictionary
 */
const isWordInDictionary = (word: Array<BoxProps>, dictionary: Array<string>): boolean => {
  const wordAsString = word.reduce((acc, box) => acc + box.letter, '');

  // Binary search for the guess in the dictionary
  let lo = 0, hi = dictionary.length, mid = -1;
  while (lo <= hi) {
    mid = Math.ceil((hi + lo) / 2);
    if (dictionary[mid] > wordAsString) {
      hi = mid - 1;
    } else {
      lo = mid;
    }
  }

  return mid >= 0 && dictionary[mid] === wordAsString;
};

/*
 * The Wordle component contains the implementation of 'Wordle'.
 */
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
                        if (activeCol < props.wordleSize) {
                          setBoxes((old) => {
                            return updateRows(old, activeRow, activeCol, {
                              letter, state: BoxState.Unknown
                            });
                          });
                          // Update active column
                          setActiveCol((col) => col < props.wordleSize ? col + 1 : col);
                        }
                      }}
                      onSubmit={() => {
                        // Check that the row is complete and the given word is in the wordle dictionary
                        if (activeCol === props.wordleSize && isWordInDictionary(boxes[activeRow], [])) {
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
                        if (activeCol > 0) {
                          setBoxes((old) => {
                            return updateRows(old, activeRow, activeCol - 1, {
                              letter: '', state: BoxState.Unknown
                            });
                          });
                          // Update active column
                          setActiveCol((col) => col > 0 ? col - 1 : col);
                        }
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
