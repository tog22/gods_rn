/////  External libraries  /////
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';


/////  Components  /////


/////  Other  /////
import starting_sotw from '../auxiliary/SOTW_Start'
import style from '../App.module.css'

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
		<View style="style.game_world">
			<Text style={{color: 'red'}}>This element is wrapped in "&#x3C;Text style=color: &#x27;red&#x27;&#x22;&#x3E;"</Text>
			<Text style={style.game_world}>This element is wrapped in &#x3C;Text style=style.game_world&#x3E;&#x3C;/Text</Text>
			<Text style={stylesheet_create.red}>This element is wrapped in &#x3C;Text style=stylesheet_create.red&#x3E;&#x3C;/Text&#x3E;</Text>
		</View>
	);
}

const stylesheet_create = StyleSheet.create({
    red: {
        color: 'green',
        backgroundColor: "red",
    }
})	