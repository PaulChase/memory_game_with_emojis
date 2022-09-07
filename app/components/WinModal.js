import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

export default function WinModal({ showWinModal, closeWinModal, trials }) {
	return (
		<Modal visible={showWinModal} animationType="slide" transparent={true}>
			<View
				style={{
					flex: 1,
					backgroundColor: "rgba(0,0,0, 0.8)",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<View style={{ backgroundColor: "green", width: "80%", padding: 12, borderRadius: 12 }}>
					<Text style={{ fontSize: 30, fontWeight: "700", color: "white", textAlign: "center" }}>
						Congrats, You've Won!
					</Text>
					<Text style={{ fontSize: 20, fontWeight: "700", color: "white", textAlign: "center", marginVertical: 10 }}>
						with
					</Text>
					<Text style={{ fontSize: 30, fontWeight: "700", color: "white", textAlign: "center" }}>{trials} trials</Text>
					<TouchableOpacity
						onPress={closeWinModal}
						activeOpacity={0.8}
						style={{
							padding: 10,
							borderWidth: 2,
							borderColor: "white",
							width: "100%",
							alignSelf: "center",
							borderRadius: 8,
							marginTop: 20,
							marginBottom: 10,
							backgroundColor: "white",
						}}
					>
						<Text style={{ color: "gray", fontSize: 22, fontWeight: "600", textAlign: "center" }}>Play Again</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}
