import { PROJECT_ID } from "@env";
import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
// Components
import { StyleSheet, SafeAreaView } from "react-native";
import MainTitle from "./src/components/Titles/MainTitle/MainTitle";
import Disconnected from "./src/views/Disconnected/Disconnected";
import Connected from "./src/views/Connected/Connected";
// Web 3
import { WalletConnectModal, useWalletConnectModal } from "@walletconnect/modal-react-native";

export default function App() {
  const metadata = {
    name: "THE-GREETER-DAPP",
    description: "THE-GREETER-DAPP-DESCRIPTION",
    url: "https://the-greeter-dapp.com/",
    icons: ["https://avatars.githubusercontent.com/u/73180392"],
    redirect: {
      native: "THE_GREETER_DAPP://",
      universal: "the-greeter-dapp.com",
    },
  };

  const { isConnected } = useWalletConnectModal();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <MainTitle>The Greeter dApp</MainTitle>
      {isConnected ? <Connected isConnected={isConnected} /> : <Disconnected isConnected={isConnected} />}
      <WalletConnectModal projectId={PROJECT_ID} providerMetadata={metadata} />
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
});

registerRootComponent(App);
