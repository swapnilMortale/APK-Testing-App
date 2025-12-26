import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

export default function HomeScreen() {
  const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(
    null
  );

  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
    });

    if (result.canceled) return;

    const selectedFile = result.assets[0];

    // Check if file ends with .apk
    if (!selectedFile.name.toLowerCase().endsWith(".apk")) {
      Alert.alert(
        "Invalid File",
        "Only .apk files are allowed. Please upload a valid APK file."
      );
      return;
    }

    setFile(selectedFile);
  };

  return (
    <View style={styles.container}>
      {/* TOP HEADER DESIGN */}
      <View style={styles.topBg} />

      {/* BEAUTIFUL IMAGE */}
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
        }}
        style={styles.uploadImage}
      />

      <Text style={styles.title}>Upload APK File</Text>
      <Text style={styles.subtitle}>
        Select your APK file and send it for scanning & testing.
      </Text>

      {/* UPLOAD BOX */}
      <TouchableOpacity style={styles.uploadBox} onPress={pickFile}>
        <Text style={styles.uploadBoxText}>
          {file ? file.name : "Tap here to select .apk file"}
        </Text>
      </TouchableOpacity>

      {/* CHOOSE BUTTON */}
      <TouchableOpacity style={styles.chooseBtn} onPress={pickFile}>
        <Text style={styles.btnText}>Choose File</Text>
      </TouchableOpacity>

      {/* SEND BUTTON */}
      <TouchableOpacity
        style={[styles.sendBtn, !file && { opacity: 0.5 }]}
        disabled={!file}
      >
        <Text style={styles.btnTextWhite}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFF",
    alignItems: "center",
    paddingTop: 70,
  },

  topBg: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 260,
    backgroundColor: "#6C63FF",
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },

  uploadImage: {
    width: 170,
    height: 170,
    marginTop: 10,
  },

  title: {
    fontSize: 27,
    fontWeight: "bold",
    marginTop: 15,
    color: "#2E2E2E",
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginHorizontal: 40,
    marginTop: 5,
  },

  uploadBox: {
    width: "85%",
    height: 65,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#6C63FF",
    borderRadius: 15,
    marginTop: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEEFFF",
  },

  uploadBoxText: {
    color: "#6C63FF",
    fontSize: 16,
  },

  chooseBtn: {
    width: "85%",
    padding: 15,
    backgroundColor: "#6C63FF",
    borderRadius: 14,
    marginTop: 20,
    alignItems: "center",
  },

  sendBtn: {
    width: "85%",
    padding: 15,
    backgroundColor: "#4A47D1",
    borderRadius: 14,
    marginTop: 10,
    alignItems: "center",
  },

  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  btnTextWhite: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
