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


	/********************
	**   🔥 FIREBASE   **
	********************/



	/*
	↓ Demo code from:
		https://medium.com/@arashfallahi1989/how-to-integrate-firebase-push-notification-in-react-native-expo-bd5cc694f181
	*/
	/*
	useEffect(() => {
		const on_foreground_message = messaging().onMessage(async remoteMessage=>{
			
			// Log it
			lo('📨 Message received')
			lo(JSON.stringify(remoteMessage))

			// Process it
			let msg_data = message.notification.data

			switch (message.notification.title) {
				case 'move':
					// bus.emit('move', msg_data)
					lo(msg_data)
					break
				default: { // {} to allow `let`
					let alert_text = 'Unknown firebase message received: '+JSON.stringify(message.notification)
					Alert.alert(alert_text)
					break
				}
			}

		});
		return on_foreground_message;
	}, []);
	*/
	
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});


/**********************
**  OTHER FUNCTIONS  **
**********************/

function fcm_string_to_object(string) {

	string.replace('\"', '"')
	let object = JSON.parse(string)
	return object

}

let lo = function (to_log) {
	console.log(to_log)
}