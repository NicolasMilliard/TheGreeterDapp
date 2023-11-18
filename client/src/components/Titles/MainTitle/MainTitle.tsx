import { StyleSheet, Text } from "react-native";

interface MainTitleProps {
  children: React.ReactNode;
}

const MainTitle = ({ children }: MainTitleProps) => {
  return <Text style={styles.heading}>{children}</Text>;
};

export default MainTitle;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
