import { View } from "react-native";
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";
// Type
import type { WalletConnexionProps } from "../../types/wallet.type";

const Disconnected = ({ isConnected }: WalletConnexionProps) => {
  const { open, provider } = useWalletConnectModal();

  const handleButtonPress = async () => {
    if (isConnected) {
      provider?.disconnect();
    }
    open();
  };

  return (
    <View>
      <PrimaryButton onPress={handleButtonPress} text={isConnected ? "Disconnect" : "Connect"} />
    </View>
  );
};

export default Disconnected;
