// StAuth10244: I Robert Kumar, 000883986, certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. I have not made
//  my work available to anyone else."

import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider, Button } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './components/Home';
import MapScreen from './components/MapScreen';
import StatsScreen from './components/StatsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
        >  
          <Tab.Screen 
            name="Home" 
            component={Home} 
            options={{
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="home" color={color} size={26}/>
              )
            }}
          />
          <Tab.Screen 
            name="Dog Info" 
            component={StatsScreen} 
            options={{
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="information" color={color} size={26}/>
              )
            }}
          />
          <Tab.Screen 
            name="Map" 
            component={MapScreen} 
            options={{
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="map-marker" color={color} size={26}/>
              )
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}