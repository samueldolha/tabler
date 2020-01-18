import { h } from "preact";

const hexCodes = [
    "#e5a0a0",
    "#e5e5a0",
    "#a0e5a0",
    "#a0e5e5",
    "#a0a0e5",
    "#e5a0e5"
];

export const Output = ({ teams, players, tabIndex }) => (
    <textarea
        cols={95}
        rows={18}
        readonly={true}
        tabIndex={tabIndex}
        style={{ resize: "none" }}
    >
        {
            players.map(
                (
                    { name, scores },
                    index
                ) => {
                    const playerLine = name
                        + " "
                        + scores.map((score) => score || "").join("|");
                    const playersPerTeam = players.length / teams.length;
                    const teamIndex = index / playersPerTeam;

                    if (index % playersPerTeam === 0) {
                        const teamLine = teams[teamIndex].name
                            + " "
                            + (teams.length === 1
                                ? ""
                                : hexCodes[Math.ceil(
                                    teamIndex * (6 / teams.length))]);

                        return [teamLine, playerLine].join("\n");
                    }

                    return playerLine;
                }
            ).join("\n")
        }
    </textarea>
);
