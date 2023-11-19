import { useMemo, useState } from "react";
import { PROJECT_ID } from "@env";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { WalletConnectModal, useWalletConnectModal } from "@walletconnect/modal-react-native";

import MainTitle from "./src/components/Titles/MainTitle/MainTitle";
import PrimaryButton from "./src/components/Buttons/PrimaryButton/PrimaryButton";
import RequestModal from "./src/components/Modals/RequestModal";

// TESTS
import { createPublicClient, createWalletClient, custom, type PublicClient, type WalletClient } from "viem";
import { goerli } from "viem/chains";
import ContractUtils from "./utils/ContractUtils";

export default function App() {
  const projectId = PROJECT_ID;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [rpcResponse, setRpcResponse] = useState();

  const metadata = {
    name: "THE-GREETER-DAPP",
    description: "THE-GREETER-DESCRIPTION",
    url: "https://the-greeter-dapp.com/",
    icons: ["https://avatars.githubusercontent.com/u/73180392"],
    redirect: {
      native: "YOUR_APP_SCHEME://",
      universal: "YOUR_APP_UNIVERSAL_LINK.com",
    },
  };

  const { open, isConnected, address, provider } = useWalletConnectModal();

  const publicClient: PublicClient | undefined = useMemo(
    () =>
      createPublicClient({
        chain: goerli,
        transport: custom({
          async request({ method, params }) {
            return await provider?.request({ method, params });
          },
        }),
      }),
    [provider]
  );

  const walletClient: WalletClient | undefined = useMemo(
    () =>
      createWalletClient({
        chain: goerli,
        transport: custom({
          async request({ method, params }) {
            return await provider?.request({ method, params });
          },
        }),
      }),
    [provider]
  );

  const handleButtonPress = async () => {
    if (isConnected) {
      return provider?.disconnect();
    }
    return open();
  };

  const handleSignMessage = async () => {
    if (!walletClient) {
      return;
    }

    const [address] = await walletClient.getAddresses();

    const signature = await walletClient.signMessage({
      account: address,
      message: "Hello World!",
    });

    return {
      method: "sign message",
      signature: signature,
    };
  };

  const handleReadContract = async () => {
    if (!walletClient) {
      return;
    }

    const [account] = await walletClient.getAddresses();
    const data = await publicClient.readContract({
      account,
      address: ContractUtils.contractAddress as `0x${string}`,
      abi: ContractUtils.goerliABI,
      functionName: "totalSupply",
    });

    return {
      method: "read contract",
      data,
    };
  };

  const handleWriteContract = async () => {
    if (!walletClient) {
      return;
    }

    const [account] = await walletClient.getAddresses();

    const { request } = await publicClient.simulateContract({
      account,
      address: ContractUtils.contractAddress as `0x${string}`,
      abi: ContractUtils.goerliABI,
      functionName: "mint",
    });

    const hash = await walletClient?.writeContract(request);

    return {
      method: "write contract",
      response: hash,
    };
  };

  const onAction = (callback: any) => async () => {
    try {
      setLoading(true);
      setModalVisible(true);
      const response = await callback();
      onResponse(response);
    } catch (error: any) {
      onResponse({
        error: error?.message || "error",
      });
    }
  };

  const onResponse = (response: any) => {
    setRpcResponse(response);
    setLoading(false);
  };

  const onModalClose = () => {
    setModalVisible(false);
    setLoading(false);
    setRpcResponse(undefined);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <MainTitle>The Greeter dApp</MainTitle>
      <Text>{isConnected ? address : "Status: Not Connected"}</Text>
      <PrimaryButton onPress={handleButtonPress} text={isConnected ? "Disconnect" : "Connect"} />
      {isConnected && <PrimaryButton onPress={onAction(handleSignMessage)} text="Sign message" />}
      {isConnected && <PrimaryButton onPress={onAction(handleReadContract)} text="Read contract" />}
      {isConnected && <PrimaryButton onPress={onAction(handleWriteContract)} text="Write contract" />}
      <WalletConnectModal projectId={projectId} providerMetadata={metadata} />
      <RequestModal isVisible={modalVisible} onClose={onModalClose} isLoading={loading} rpcResponse={rpcResponse} />
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
