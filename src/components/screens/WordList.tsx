import { View, Text, FlatList, StyleSheet } from "react-native";

import type { DefinitionWord } from "../../types/dataTypes";

import useWordDataContext from "../../library/hooks/useWordDataContext";
import WordItem from "../WordItem";
import saveWord from "../../library/helpers/saveWord";
import useUserContext from "../../library/hooks/useUserContext";
import useSavedWordsContext from "../../library/hooks/useSavedWordsContext";

const WordList = () => {
  const { wordData, wordDataError } = useWordDataContext();
  const { user } = useUserContext();
  const { savedWords, setSavedWords } = useSavedWordsContext();

  const renderItem = ({ item }: { item: DefinitionWord }) => {
    const getSaved = () => {
      return !!savedWords.find(
        (element) => JSON.stringify(element) === JSON.stringify(item)
      );
    };
    return (
      <WordItem
        word={item.word}
        definition={item.definition}
        wordClass={item.wordClass}
        saved={getSaved()}
        onPress={() => saveWord(user, item, savedWords, setSavedWords)}
      />
    );
  };

  if (wordDataError)
    return (
      <View>
        <Text>{wordDataError.message}</Text>
      </View>
    );

  return wordData.length === 0 ? (
    <View style={styles.container}>
      <Text style={styles.title}>
        Please upload a PDF to see it&apos;s rare words.
      </Text>
    </View>
  ) : (
    <View>
      <FlatList
        data={wordData}
        renderItem={renderItem}
        keyExtractor={(item) => item.word}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 42,
  },
});

export default WordList;
