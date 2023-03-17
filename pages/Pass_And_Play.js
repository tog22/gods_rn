/////  External libraries  /////
import { View, Text } from 'react-native';


/////  Components  /////
import Game_World from '../components/Game_World';

export default function Pass_And_Play() {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Game_World></Game_World>
		</View>
	);
}