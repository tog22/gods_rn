/////  External libraries  /////
import { View, Text, Button } from 'react-native';

export default function Home({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Button
				title="Pass & Play"
				onPress={() => navigation.navigate('Pass & Play')}
			/>
			<Button
				title="Play Online"
				onPress={() => navigation.navigate('Play Online')}
			/>
		</View>
	);
}