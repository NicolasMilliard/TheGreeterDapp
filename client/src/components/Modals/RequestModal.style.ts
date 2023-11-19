import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  innerContainer: {
    maxHeight: "80%",
    backgroundColor: "#fff",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginLeft: 16,
  },
  closeButton: {
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: "700",
  },
  contentContainer: {
    padding: 16,
  },
  loader: {
    marginVertical: 24,
  },
  successText: {
    color: "#3396FF",
  },
  failureText: {
    color: "#F05142",
  },
  subtitle: {
    fontWeight: "bold",
    marginVertical: 4,
  },
  center: {
    textAlign: "center",
  },
});

export default styles;
