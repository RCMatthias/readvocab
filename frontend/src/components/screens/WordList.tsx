import { View, FlatList, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import type { DefinitionWord } from "../../types/dataTypes";

import WordItem from "../WordItem";
import useWordDataContext from "../../library/hooks/useWordDataContext";
import saveWord from "../../library/helpers/saveWord";
import useUserContext from "../../library/hooks/useUserContext";
import useSavedWordsContext from "../../library/hooks/useSavedWordsContext";
import deleteWord from "../../library/helpers/deleteWord";

const WordList = () => {
  const { wordData } = useWordDataContext();
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
        onPress={async () => {
          getSaved()
            ? await deleteWord(user, item, savedWords, setSavedWords)
            : await saveWord(user, item, savedWords, setSavedWords);
        }}
      />
    );
  };

  return wordData.length === 0 ? (
    <View style={styles.container}>
      <Text style={styles.title}>
        Please upload a PDF to see it&apos;s rare words.
      </Text>
    </View>
  ) : (
    <FlatList
      data={wordData}
      renderItem={renderItem}
      keyExtractor={(item) => item.word}
      ListHeaderComponent={<Text variant="displaySmall">Rare words</Text>}
      ListHeaderComponentStyle={styles.header}
    />
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
  header: {
    marginHorizontal: 4,
    marginVertical: 12,
  },
});

export default WordList;
