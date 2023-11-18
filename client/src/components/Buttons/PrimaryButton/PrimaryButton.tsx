import { StyleSheet, Pressable, Text } from "react-native";

interface PrimaryButtonProps {
  onPress: () => void;
  text: string;
}

const PrimaryButton = ({ onPress, text }: PrimaryButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.pressableButton}>
      <Text>{text}</Text>
    </Pressable>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  pressableButton: {
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
    marginTop: 16,
  },
});
