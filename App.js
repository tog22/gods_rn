/////  External libraries  /////
import { useState, useEffect, useRef } from 'react'
import { View, Text, Button, StyleSheet, Alert, Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
// import messaging from '@react-native-firebase/messaging'


/////  Pages  /////
import Home from './pages/Home' 
import Pass_And_Play from './pages/Pass_And_Play'
import Play_Online from './pages/Play_Online' 


/////  Pre-component code  /////
const Stack = createNativeStackNavigator();

/*************************
**   📨 NOTIFICATIONS   **
*************************/

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

// ↓ Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
	const message = {
		to: expoPushToken,
		sound: 'default',
		title: 'Original Title',
		body: 'And here is the body!',
		data: { someData: 'goes here' },
	};
  
	await fetch('https://exp.host/--/api/v2/push/send', {
		method: 'POST',
		headers: {
		Accept: 'application/json',
		'Accept-encoding': 'gzip, deflate',
		'Content-Type': 'application/json',
		},
		body: JSON.stringify(message),
	});
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default function App() {
	
	/*************************
	**   📨 NOTIFICATIONS   **
	*************************/


	const [expoPushToken, setExpoPushToken] = useState('');
	const [notification, setNotification] = useState(false);
	const notificationListener = useRef();
	const responseListener = useRef();
  
	useEffect(() => {
		registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

		notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
			setNotification(notification);
		});

		responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
			console.log(response);
		});

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current);
			Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);

	// return()
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
			<Text>Your expo push token: {expoPushToken}</Text>
			<View style={{ alignItems: 'center', justifyContent: 'center' }}>
				<Text>Title: {notification && notification.request.content.title} </Text>
				<Text>Body: {notification && notification.request.content.body}</Text>
				<Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
			</View>
			<Button
			title="Press to Send Notification"
			onPress={async () => {
				await sendPushNotification(expoPushToken);
			}}
			/>
		</View>
	);

	/*
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
	*/


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