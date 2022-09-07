import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CardItem({ card, handleChoice, flipped, isDisabled }) {
	const setChoice = () => {
		if (!isDisabled) {
			handleChoice(card);
		}
	};
	return (
		<View
			style={{
				flex: 1,
				flexDirection: "column",
				margin: 4,
				backgroundColor: "#666",
				position: "relative",
				borderRadius: 5,
			}}
		>
			<Text style={{ fontSize: 40, textAlign: "center", padding: 16 }}>{card.icon}</Text>

			<TouchableOpacity
				style={{
					backgroundColor: "blue",
					position: "absolute",
					width: "100%",
					height: "100%",
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					display: flipped ? "none" : "flex",
					borderRadius: 5,
				}}
				activeOpacity={0.8}
				onPress={setChoice}
			>
				<MaterialCommunityIcons name="treasure-chest" size={24} color="white" />
			</TouchableOpacity>
		</View>
	);
}
