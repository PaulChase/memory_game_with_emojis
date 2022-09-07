import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CardItem from "../components/CardItem";
import WinModal from "../components/WinModal";
import CARD_IMAGES from "../utils/cards";

function getRandom(arr, n) {
	var result = new Array(n),
		len = arr.length,
		taken = new Array(len);
	if (n > len) throw new RangeError("getRandom: more elements taken than available");
	while (n--) {
		var x = Math.floor(Math.random() * len);
		result[n] = arr[x in taken ? taken[x] : x];
		taken[x] = --len in taken ? taken[len] : len;
	}
	return result;
}

export default function HomeScreen() {
	const [cards, setCards] = useState([]);
	const [trials, setTrials] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [isDisabled, setIsDisabled] = useState(false);
	const [flipped, setFlipped] = useState(0);
	const [showWinModal, setShowWinModal] = useState(false);

	const handleChoice = (card) => {
		choiceOne !== null ? setChoiceTwo(card) : setChoiceOne(card);
	};

	const shuffleCards = () => {
		const randomCards = getRandom(CARD_IMAGES, 10);

		const shuffledCards = [...randomCards, ...randomCards]
			.sort(() => 0.5 - Math.random())
			.map((card) => ({ ...card, id: Math.random() }));

		setChoiceOne(null);
		setChoiceTwo(null);
		setCards(shuffledCards);
		setTrials(0);
		setFlipped(0);
	};

	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setIsDisabled(true);
			if (choiceOne?.icon === choiceTwo?.icon) {
				setCards((prevCards) => {
					return prevCards.map((card) => (card.icon === choiceOne.icon ? { ...card, matched: true } : card));
				});
				setFlipped(flipped + 1);
				resetTurn();
			} else {
				setTimeout(() => {
					resetTurn();
				}, 1000);
			}
		}
	}, [choiceOne, choiceTwo]);

	useEffect(() => {
		shuffleCards();
	}, []);

	useEffect(() => {
		if (cards.length === 0) {
			return;
		}
		if (cards.length / 2 === flipped) {
			setTimeout(() => setShowWinModal(true), 1000);
		}
	}, [flipped]);

	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTrials(trials + 1);
		setIsDisabled(false);
	};

	const closeWinModal = () => {
		setShowWinModal(false);
		shuffleCards();
	};

	const renderItem = ({ item }) => (
		<CardItem
			card={item}
			handleChoice={handleChoice}
			flipped={item === choiceOne || item === choiceTwo || item.matched}
			isDisabled={isDisabled}
		/>
	);
	return (
		<SafeAreaView style={styles.container}>
			<View style={{ marginTop: 24, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
				<Text style={{ color: "white", fontSize: 28, fontWeight: "800" }}>Marbles Game</Text>
				<Text style={{ color: "white", fontSize: 28, fontWeight: "800" }}>23</Text>
			</View>

			<View style={{ marginTop: 32 }}>
				<FlatList
					data={cards}
					renderItem={renderItem}
					//Setting the number of column
					numColumns={4}
					keyExtractor={(item, index) => index}
				/>
			</View>

			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					padding: 12,
					marginTop: 10,
				}}
			>
				<View>
					<Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>Flipped</Text>
					<Text style={{ color: "white", fontSize: 28, fontWeight: "800", textAlign: "center" }}>{flipped}</Text>
				</View>
				<View>
					<Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>Trials</Text>
					<Text style={{ color: "white", fontSize: 28, fontWeight: "800", textAlign: "center" }}>{trials}</Text>
				</View>
			</View>

			<TouchableOpacity
				onPress={shuffleCards}
				style={{
					padding: 10,
					borderWidth: 2,
					borderColor: "white",
					position: "absolute",
					bottom: 10,
					width: "100%",
					alignSelf: "center",
					borderRadius: 8,
				}}
			>
				<Text style={{ color: "white", fontSize: 28, fontWeight: "600", textAlign: "center" }}>RESTART</Text>
			</TouchableOpacity>

			<WinModal closeWinModal={closeWinModal} trials={trials} showWinModal={showWinModal} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#111",
		padding: 16,
	},
});
