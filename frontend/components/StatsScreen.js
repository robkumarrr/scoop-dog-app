// StAuth10244: I Robert Kumar, 000883986, certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. I have not made
//  my work available to anyone else."

import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { PaperProvider, Button, Card, Divider } from 'react-native-paper';
import axios from 'axios';

export default function StatsScreen() {
  const [dogs, setDogs] = useState([]);

  /**
   * Retrieve all dogs
   */
  const getDogs = async () => {
    const response = await axios.get('http://localhost:3000/get-all-dogs');
    setDogs(response.data);
  }

  useEffect(() => {
    getDogs();
  }, []);

  return (
    <PaperProvider style={styles.bigContainer}>
      <ScrollView contentContainerStyle={styles.container}>
          {dogs.map(dog => (
          <Card 
            style={styles.card}
            key={dog.id}
            mode='elevated'
          >
            <Card.Title title={dog.name} subtitle={"Owner(s): " + dog.owners} />
            <Divider />
            <Card.Content>
              <Text>Age: {dog.age}</Text> 
              <Text variant="titleLarge">{JSON.parse(dog.potty_markers).length == 0 ? " ": `${dog.name} has gone potty ${JSON.parse(dog.potty_markers).length} times`}</Text>
            </Card.Content>
            { dog.image_path === null ? <Text style={styles.noImage}>*No Image*</Text> : <Card.Cover source={{uri: dog.image_path}} style={styles.image} />}
          </Card>
          ))}
      </ScrollView>
      <Button 
        style={styles.button}
        theme={{ colors: { primary: 'coral' } }} 
        icon="refresh" 
        mode="contained" 
        onPress={getDogs}
      >
        Refresh
      </Button>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0
  },
  bigContainer: {
    backgroundColor: 'white'
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
  card: {
    margin: 10,
    width: 300,
    backgroundColor: '#dbdbdb'
  },
  cardTitle: {
    fontWeight: 'bold'
  },
  boldText: {
    fontWeight: 'bold'
  },
  button: {
    margin: 20,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  textInputStyle: {
    margin: 10,
    backgroundColor: '#ffd7ba',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
    alignSelf: 'center',
    margin: 20,
    borderWidth: 5,
    
  },
  noImage: {
    alignSelf: 'center'
  }
});
