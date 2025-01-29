// StAuth10244: I Robert Kumar, 000883986, certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. I have not made
//  my work available to anyone else."

import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { PaperProvider, Button, Snackbar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function MapScreen() {
  const [dogs, setDogs] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [selectedDog, setSelectedDog] = useState(1);
  const [visibleSnack, setVisibleSnack] = useState(false); // for Snackbar

  // Snackbar code from: https://callstack.github.io/react-native-paper/docs/components/Snackbar
  const onToggleSnackBar = () => setVisibleSnack(!visibleSnack);
  const onDismissSnackBar = () => setVisibleSnack(false);

  /**
   * Retrieve all dogs for populating the dropdown menu
   */
  const getDogs = async () => {
    const response = await axios.get('http://localhost:3000/get-all-dogs');
    setDogs(response.data);
  }

  /**
   * Adds a new marker to the map. 
   * Adapted from various code here: https://github.com/react-native-maps/react-native-maps?tab=readme-ov-file
   * @param {Event} event 
   */
  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    const newMarker = {
      id: markers.length + 1,
      coordinate,
    };
    setMarkers([...markers, newMarker]);
  };

  /**
   * Send markers to the database
   */
  const updatePottyMarkers = async () => {
    await axios.post('http://localhost:3000/update-dog',
      {
        "potty_markers": JSON.stringify(markers),
        "id": dogs[selectedDog - 1].id // must update this dynamically
      }
    );
    onToggleSnackBar();
  }

  /**
   * Removes the last potty marker from the array
   */
  const undo = () => {
    setMarkers(markers.slice(0, -1));
  }

  useEffect(() => {
    getDogs();
  }, [markers]);

  return (
    <PaperProvider>
      
      <ScrollView>
      <View style={styles.titleArea}>
        <Text style={styles.titleText}>&#x1F6BD; Map</Text>
        <Picker
          style={styles.pickerStyle}
          selectedValue={selectedDog}
          onValueChange={(dog) => {
            setMarkers(JSON.parse(dogs[dog - 1].potty_markers));
            setSelectedDog(dog);
            getDogs();
          }}
        >
          {dogs.map((dog) =>
            <Picker.Item key={dog.id} label={dog.name} value={dog.id} />
          )}
        </Picker>
      </View>

      <View style={styles.container}>
        <MapView 
          style={styles.mapStyle}
          initialRegion={{
            latitude: 43.2557, 
            longitude: -79.8711,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02
          }}
          onPress={handleMapPress}
        >
          {markers.map(marker => (
              <Marker
                  draggable
                  key={marker.id}
                  coordinate={marker.coordinate}
                  title={`Potty Spot: ${marker.id}`}
                  pinColor="orange"
              />
          ))}
        </MapView>
        <View style={styles.buttonContainer}>
          <Button 
            disabled={markers.length == 0}
            style={styles.button}
            theme={{ colors: { primary: 'coral' } }} 
            icon="dog-side" 
            mode="contained"
            onPress={updatePottyMarkers}
          >
            { markers.length > 0 ? "Log Potty Locations" : "Log Potty Location"}
          </Button>
          <Button 
            disabled={markers.length == 0}
            style={styles.button}
            theme={{ colors: { primary: 'coral' } }} 
            icon="undo" 
            mode="contained"
            onPress={undo}
          >
            Remove Last
          </Button>
        </View>
      </View>
      </ScrollView>
      <Snackbar
        visible={visibleSnack}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Woof woof!'
        }}
      >
        Potty spot(s) added! &#128169; &#x1F6BD;
      </Snackbar>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: 370,
    height: 400,
    borderRadius: 20
  },
  titleArea: {
    backgroundColor: 'white'
  },
  titleText: {
    fontSize: 60,
    fontFamily: 'System',
    fontWeight: 'bold',
    margin: 15,
    textAlign: 'center'
  },
  boldText: {
    fontWeight: 'bold'
  },
  button: {
    margin: 10,
    marginBottom: 50
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  pickerStyle: {
    backgroundColor: '#eee',
    marginBottom: 10,
    height: 150,
  }
});