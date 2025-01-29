// StAuth10244: I Robert Kumar, 000883986, certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. I have not made
//  my work available to anyone else."

import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { PaperProvider, Button, Modal, Portal, TextInput, Snackbar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function Home() {
  const [visibleModal, setVisibleModal] = useState(false); // for Modal
  const [visibleSnack, setVisibleSnack] = useState(false); // for Snackbar
  const [image, setImage] = useState(null); // for Image Picker
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [owners, setOwners] = useState("");
  
  // Modal code from: https://callstack.github.io/react-native-paper/docs/components/Modal
  const showModal = () => setVisibleModal(true);
  const hideModal = () => setVisibleModal(false);
  const containerStyle = {backgroundColor: 'white', padding: 20, margin: 30, borderRadius: 20};

  // Snackbar code from: https://callstack.github.io/react-native-paper/docs/components/Snackbar
  const onToggleSnackBar = () => setVisibleSnack(!visibleSnack);
  const onDismissSnackBar = () => setVisibleSnack(false);

  // Image picker code from: https://docs.expo.dev/versions/latest/sdk/imagepicker/
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  /**
   * Clear the form after submitting a new dog.
   */
  const clearForm = () => {
    setName("");
    setAge("");
    setOwners("");
    setImage(null);
  }

  // API Calls =======================

  /**
   * Adds a new dog to the database.
   */
  const addDog = async () => {
    await axios.post('http://localhost:3000/add-dog', 
      {
        "name": name,
        "age": parseInt(age, 10),
        "owners": owners,
        "image_path": image
      }
    );
    hideModal();
    onToggleSnackBar();
    clearForm();
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
          <Text style={styles.titleText}>scoop</Text>
          <Text style={styles.subTitleText}>Your best friend's best friend.</Text>
          <Portal>
            <Modal 
              visible={visibleModal} 
              onDismiss={hideModal} 
              contentContainerStyle={containerStyle}
            >
              <Text style={styles.boldText}>Add your dog!</Text>
              <TextInput
                mode='outlined'
                style={styles.textInputStyle}
                label="Name"
                value={name}
                onChangeText={name => setName(name)}
                outlineColor='#ffc194'
                activeOutlineColor='coral'
              />
              <TextInput
                mode='outlined'
                style={styles.textInputStyle}
                label="Age"
                value={age}
                onChangeText={age => setAge(age)}
                outlineColor='#ffc194'
                activeOutlineColor='coral'
              />
              <TextInput
                mode='outlined'
                style={styles.textInputStyle}
                label="Owner(s)"
                value={owners}
                onChangeText={owners => setOwners(owners)}
                outlineColor='#ffc194'
                activeOutlineColor='coral'
              />
              { image &&
                <View style={styles.modalStyle}>
                  <Text style={styles.boldText}>Preview</Text>
                  <Image source={{uri: image}} style={styles.image}/>
                </View>
                }
              <View style={styles.modalButton}>
                <Button
                  style={styles.button}
                  theme={{ colors: { primary: 'coral' } }}
                  mode="contained" 
                  onPress={pickImage}
                >
                  Select Photo
                </Button>
                <Button
                  style={styles.button}
                  theme={{ colors: { primary: 'coral' } }}
                  mode="contained" 
                  onPress={addDog}
                >
                  Submit
                </Button>
              </View>
            </Modal>
          </Portal>

          <View style={styles.buttonContainer}>
            <Button
              style={styles.button} 
              theme={{ colors: { primary: 'coral' } }} 
              icon="dog-side" 
              mode="contained" 
              onPress={showModal}
            >
              Add Dog
            </Button>
          </View>
          

          <Snackbar
            visible={visibleSnack}
            onDismiss={onDismissSnackBar}
            action={{
              label: 'Woof woof!'
            }}
          >
            Doggo has been added &#128054;
          </Snackbar>
          <StatusBar style="auto" />
        </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 70,
    fontFamily: 'System',
    fontWeight: '800',
    margin: 30
  },
  subTitleText: {
    fontSize: 20,
    margin: 30
  },
  boldText: {
    fontWeight: 'bold'
  },
  button: {
    margin: 10
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  modalButton: {
    width: '50%',
    alignSelf: 'center'
  },
  textInputStyle: {
    margin: 10,
    backgroundColor: '#ffd7ba',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20
  },
  modalStyle: {
    textAlign: 'center',
    alignItems: 'center'
  }
});