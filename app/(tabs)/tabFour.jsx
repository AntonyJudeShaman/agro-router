import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export default function PestTest() {
  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleOpenCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const options = {
        title: "Capture Image",
        saveToPhotos: true, // Optionally save the captured image to the device's gallery
      };

      const result = await launchCamera(options);

      if (result.didCancel) {
        console.log("User cancelled image capture");
      } else if (result.error) {
        console.error("Camera error:", result.error);
        setError("An error occurred while opening the camera.");
      } else {
        const source = { uri: result.uri };
        setImage(source);
      }
    } else {
      console.warn("Camera permission denied");
      setError("Camera permission is required to capture an image.");
    }
  };

  const handleImageSelection = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const options = {
        title: "Select Image",
        storageOptions: {
          skipBackup: true,
          path: "images",
        },
      };

      const result = await launchImageLibrary(options);

      if (result.didCancel) {
        console.log("User cancelled image selection");
      } else if (result.error) {
        console.error("Image picker error:", result.error);
        setError("An error occurred while selecting the image.");
      } else {
        const source = { uri: result.uri };
        setImage(source);
      }
    } else {
      console.warn("Storage permission denied");
      setError("Storage permission is required to access the device gallery.");
    }
  };

  const handleImageSelection2 = async () => {
    const granted2 = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    );
    if (granted2 === PermissionsAndroid.RESULTS.GRANTED) {
      const options = {
        title: "Select Image",
        storageOptions: {
          skipBackup: true,
          path: "images",
        },
      };

      const result = await launchImageLibrary(options);

      if (result.didCancel) {
        console.log("User cancelled image selection");
      } else if (result.error) {
        console.error("Image picker error:", result.error);
        setError("An error occurred while selecting the image.");
      } else {
        const source = { uri: result.uri };
        setImage(source);
      }
    } else {
      console.warn("Storage permission denied");
      setError("Storage permission is required to access the device gallery.");
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setError("Please select an image to upload.");
      return;
    }

    setIsProcessing(true);
    setError(null); // Clear any previous errors

    try {
      const formData = new FormData();
      formData.append("image", {
        uri: image.uri,
        name: "image.jpg", // Provide a meaningful filename
        type: "image/jpeg", // Assuming image type is JPEG, adjust if needed
      });

      const response = await fetch("http://localhost:5000/classify", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to classify image");
      }

      const data = await response.json();
      setResponse(data);

      setIsSuccess(true);
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("An error occurred while uploading the image.");
    } finally {
      setIsProcessing(false);
      setIsProcessed(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pest Detection</Text>
      <Text style={styles.description}>Upload an image</Text>
      <TouchableOpacity style={styles.button} onPress={handleOpenCamera}>
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>
      {image && (
        <Image source={image} style={styles.image} resizeMode="contain" />
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleImageSelection}>
        <Text style={styles.buttonText}>Upload</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleImageSelection2}>
        <Text style={styles.buttonText}>Upload2</Text>
      </TouchableOpacity>
      {image && (
        <TouchableOpacity
          style={styles.button}
          onPress={handleUpload}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <Text style={styles.buttonText}>Processing...</Text>
          ) : (
            <Text style={styles.buttonText}>Identify Pest</Text>
          )}
        </TouchableOpacity>
      )}
      {response && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>Pest Name: {response.pest}</Text>
          <Text style={styles.responseText}>{response.response}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4CAF50", // Green color
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  responseContainer: {
    backgroundColor: "#F0F0F0",
    padding: 15,
    borderRadius: 5,
  },
  responseText: {
    fontSize: 14,
    marginBottom: 5,
  },
});
