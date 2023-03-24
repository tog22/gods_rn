/////  External libraries  /////
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert } from 'react-native'
import messaging from '@react-native-firebase/messaging'


/////  Pages  /////
import Home from './pages/Home' 
import Pass_And_Play from './pages/Pass_And_Play'
import Play_Online from './pages/Play_Online' 


/////  Pre-component code  /////
const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen 
					name="Pass & Play" 
					component={Pass_And_Play} 
					options={{ title: 'Path of the Gods' }}
				/>
				<Stack.Screen 
					name="Home" 
					component={Home} 
					options={{ title: 'Path of the Gods' }}
				/>
				<Stack.Screen 
					name="Play Online" 
					component={Play_Online} 
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);

	/*
	↓ Demo code from:
		https://medium.com/@arashfallahi1989/how-to-integrate-firebase-push-notification-in-react-native-expo-bd5cc694f181
	*/
	useEffect(() => {
		const unsubscribe = messaging().onMessage(async remoteMessage=>{
			Alert.alert('A new FCM message arrived!')
			console.log(JSON.stringify(remoteMessage))
		});
		return unsubscribe;
	}, []);
	
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
