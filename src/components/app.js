import axios from "axios";
import { h, Fragment } from "preact";
import { useState } from "preact/hooks";
import { replaceInArray, repeatObject } from "../utility";
import { TableDataEncoder } from "./table-data-encoder";
import { PlayerNameInitializer } from "./player-name-initializer";
import { Player } from "./player";
import { TeamCountSelector } from "./team-count-selector";
import { Team } from "./team";
import { TableDataDecoder } from "./table-data-decoder";
import { MiiNameLoader } from "./mii-name-loader";

export const App = () => {
	const [teams, setTeams] = useState(
		repeatObject(
			(index) => ({
				name: (!teams || teams.length === 1)
					? "FFA - Free for All"
					: (index + 1).toString(),
				color: null
			}),
			1
		)
	);

	const [players, setPlayers] = useState(
		repeatObject(
			(index) => ({
				name: (index + 1).toString(),
				description: "",
				scores: [0, 0, 0, 0, 0],
			}),
			12
		)
	);

	const setTeamProperty = (index, property) => (value) => setTeams(
		replaceInArray(
			teams,
			index,
			{ ...teams[index], [property]: value }
		)
	);

	const setTeamCount = (teamCount) => {
		const newTeams = teams.slice();
		const startIndex = Math.min(teams.length, teamCount);
		newTeams.splice(
			startIndex,
			Math.max(0, teams.length - teamCount),
			...repeatObject(
				(index) => ({
					name: (teamCount === 1)
						? "FFA - Free for All"
						: (index + startIndex + 1).toString(),
					color: null
				}),
				Math.max(0, teamCount - teams.length)
			)
		);

		if (newTeams.length === 1) {
			newTeams[0].name = "FFA - Free for All";
		} else {
			if (newTeams[0].name === "FFA - Free for All") {
				newTeams[0].name = "1";
			}
		}

		setTeams(newTeams);
	};

	const setPlayerProperty = (index, property) => (value) => {
		setPlayers(
			replaceInArray(
				players,
				index,
				{ ...players[index], [property]: value }
			)
		);
	};

	const setPlayerScore = (playerIndex) => (scoreIndex) => (value) => {
		setPlayers(
			replaceInArray(
				players,
				playerIndex,
				{
					...players[playerIndex],
					scores: replaceInArray(
						players[playerIndex].scores,
						scoreIndex,
						Number.parseInt(value, 10) || 0
					)
				}
			)
		)
	};

	return (
		<Fragment>
			<div
				style={{
					display: "flex",
					"justify-content": "space-between"
				}}
			>
				<TableDataEncoder
					teams={teams}
					players={players}
					tabIndex={0}
				/>
				<TableDataDecoder
					setTeams={setTeams}
					setPlayers={setPlayers}
					tabIndex={1}
				/>
			</div>
			<div style={{ "margin-top": "0.5rem" }}>
				<TeamCountSelector
					teamCount={teams.length}
					setTeamCount={setTeamCount}
					tabIndex={2}
				/>
				<PlayerNameInitializer
					setPlayerNames={
						(playerNames) =>
							setPlayers(
								players.map(
									(player, index) => ({
										...player,
										name: playerNames[index]
									})
								)
							)
					}
					tabIndex={3}
					style={{ "margin-left": "0.5rem" }}
				/>
			</div>
			<div style={{ "margin-top": "0.5rem" }}>
				<MiiNameLoader tabIndex={4} />
			</div>
			{
				players.map((player, playerIndex) => {
					const playersPerTeam = players.length / teams.length;
					const teamIndex = Math.floor(
						playerIndex / playersPerTeam
					);

					const component = (
						<div
							style={{
								"margin-left": "1rem",
								"margin-top": "0.5rem"
							}}
						>
							<Player
								name={player.name}
								setName={setPlayerProperty(playerIndex, "name")}
								description={player.description}
								setDescription={
									setPlayerProperty(
										playerIndex,
										"description"
									)
								}
								scores={player.scores}
								setScore={setPlayerScore(playerIndex)}
								playerIndex={playerIndex}
								playerCount={players.length}
								teamIndex={teamIndex}
								teamCount={teams.length}
								tabIndexOffset={6}
							/>
						</div>
					);

					if (playerIndex % playersPerTeam === 0) {
						return (
							<div style={{ "margin-top": "0.5rem" }}>
								<Team
									name={teams[teamIndex].name}
									setName={setTeamProperty(teamIndex, "name")}
									color={teams[teamIndex].color}
									setColor={
										setTeamProperty(teamIndex, "color")
									}
									tabIndex={
										5 + (teamIndex * (playersPerTeam + 1))
									}
								/>
								{component}
							</div>
						)
					}

					return component;
				})
			}
		</Fragment>
	);
};
