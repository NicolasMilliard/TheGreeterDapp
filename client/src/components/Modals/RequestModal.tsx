import { ActivityIndicator, Text, TouchableOpacity, View, ScrollView } from "react-native";
import Modal from "react-native-modal";
import styles from "./RequestModal.style";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  isLoading?: boolean;
  rpcResponse?: any;
  rpcError?: any;
}

const RequestModal = ({ isVisible, onClose, isLoading, rpcResponse, rpcError }: Props) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.innerContainer}>
        <View style={styles.titleContainer}>
          {isLoading && <Text style={styles.title}>Pending Request</Text>}
          {rpcResponse && <Text style={[styles.title, styles.successText]}>Request Response</Text>}
          {rpcError && <Text style={[styles.title, styles.failureText]}>Request Failure</Text>}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
        {isLoading && (
          <View style={styles.contentContainer}>
            <ActivityIndicator style={styles.loader} />
            <Text style={styles.center}>Approve or reject request using your wallet if needed.</Text>
          </View>
        )}
        {rpcResponse && (
          <ScrollView style={styles.contentContainer}>
            {Object.keys(rpcResponse).map((key) => (
              <Text key={key} style={styles.subtitle}>
                {key}: <Text>{rpcResponse[key]?.toString()}</Text>
              </Text>
            ))}
          </ScrollView>
        )}
        {rpcError && (
          <ScrollView style={styles.contentContainer}>
            <Text style={styles.subtitle}>
              Method: <Text>{rpcError.method}</Text>
            </Text>
            <Text style={styles.subtitle}>
              Error: <Text>{rpcError.error}</Text>
            </Text>
          </ScrollView>
        )}
      </View>
    </Modal>
  );
};

export default RequestModal;
