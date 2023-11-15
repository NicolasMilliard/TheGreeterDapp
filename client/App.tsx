import { PROJECT_ID } from "@env";
import { StyleSheet, SafeAreaView, Text, Pressable } from "react-native";
import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { WalletConnectModal, useWalletConnectModal } from "@walletconnect/modal-react-native";

export default function App() {
  const projectId = PROJECT_ID;

  const metadata = {
    name: "THE-GREETER-DAPP",
    description: "YOUR_PROJECT_DESCRIPTION",
    url: "https://the-greeter-dapp.com/",
    icons: ["https://avatars.githubusercontent.com/u/73180392"],
    redirect: {
      native: "YOUR_APP_SCHEME://",
      universal: "YOUR_APP_UNIVERSAL_LINK.com",
    },
  };

  const { open, isConnected, address, provider } = useWalletConnectModal();

  const handleButtonPress = async () => {
    if (isConnected) {
      return provider?.disconnect();
    }
    return open();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.heading}>The Greeter dApp</Text>
      <Text>{isConnected ? address : "Status: Not Connected"}</Text>
      <Pressable onPress={handleButtonPress} style={styles.pressableButton}>
        <Text>{isConnected ? "Disconnect" : "Connect"}</Text>
      </Pressable>
      <WalletConnectModal projectId={projectId} providerMetadata={metadata} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  pressableButton: {
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
    marginTop: 16,
  },
});

registerRootComponent(App);
