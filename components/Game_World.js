/////  External libraries  /////
import { useState } from 'react';
import { View, Text } from 'react-native';


/////  Components  /////


/////  Other  /////
import starting_sotw from '../auxiliary/SOTW_Start'

export default function Game_World({online_screen}) {
	
	// Setup state
	let turn
	let sotw
	let current_player

	if (this.online_screen) {
		alert('online not set up yet')
	} else {
		turn = 1
		current_player = 1
		sotw = starting_sotw
	}



	return (
		<View>
			<Text>Game World</Text>
		</View>
	);
}