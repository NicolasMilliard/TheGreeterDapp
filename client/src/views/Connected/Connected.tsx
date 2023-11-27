import { useState, useMemo } from "react";
import { View } from "react-native";
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton";
import RequestModal from "../../components/Modals/RequestModal";
// Web 3
import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import { createPublicClient, createWalletClient, custom, type PublicClient, type WalletClient } from "viem";
import { goerli } from "viem/chains";
// Utils
import ContractUtils from "../../../utils/ContractUtils";
// Type
import type { WalletConnexionProps } from "../../types/wallet.type";

const Connected = ({ isConnected }: WalletConnexionProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [rpcResponse, setRpcResponse] = useState<string | undefined>(undefined);
  const { provider } = useWalletConnectModal();

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

  const handleSignMessage = async () => {
    if (!walletClient) {
      return;
    }

    const [address] = await walletClient.getAddresses();

    const signature = await walletClient.signMessage({
      account: address,
      message: "Greetings!",
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
      functionName: "getGreetings",
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
      functionName: "setGreetings",
      args: ["Bonjour !"],
    });

    const hash = await walletClient?.writeContract(request);

    return {
      method: "write contract",
      response: hash,
    };
  };

  return (
    <View>
      {isConnected && <PrimaryButton onPress={onAction(handleSignMessage)} text="Sign message" />}
      {isConnected && <PrimaryButton onPress={onAction(handleReadContract)} text="Read contract" />}
      {isConnected && <PrimaryButton onPress={onAction(handleWriteContract)} text="Write contract" />}
      <RequestModal isVisible={modalVisible} onClose={onModalClose} isLoading={loading} rpcResponse={rpcResponse} />
    </View>
  );
};

export default Connected;
