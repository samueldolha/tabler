import { h } from "preact";
import { useState } from "preact/hooks";
import { repeatObject } from "../utility";

const possibleTeamCounts = [1, 2, 3, 4, 6];

const playerCount = 12;

const possibleLineCounts = possibleTeamCounts.map(
    (count) => count + playerCount
);

const convertHexToRgb = (hex) =>
    Math.max(0, Math.min(255, Number.parseInt(hex, 16)));

const convertHexCodeToRgb = (hexCode) => ({
    red: convertHexToRgb(hexCode.slice(1, 3)),
    green: convertHexToRgb(hexCode.slice(3, 5)),
    blue: convertHexToRgb(hexCode.slice(5, 7))
});

export const TableDataDecoder = ({ setTeams, setPlayers, tabIndex }) => {
    const [value, setValue] = useState("");

    const onInput = (event) => {
        setValue(event.target.value);
    };

    const decode = () => {
        const teams = [];
        const players = [];
        value.split("\n").forEach((line) => {
            if (line.length > 0) {
                if (line.includes("|")) {
                    const [nameAndFirstScore, ...scores] = line.split("|");
                    const nameArray = nameAndFirstScore.split(" ");
                    scores.unshift(nameArray.pop());

                    if (scores.length < 5) {
                        scores.splice(
                            scores.length,
                            0,
                            repeatObject("", 5 - scores.length)
                        );
                    }

                    players.push({
                        name: nameArray.join(" "),
                        description: "",
                        scores: scores.map(
                            (score) => score ? Number.parseInt(score, 10) : 0)
                    });
                } else {
                    const segments = line.split(" ");

                    if (segments[segments.length - 1].startsWith("#")) {
                        const hexCode = segments.pop();
                        teams.push({
                            name: segments.join(" "),
                            color: convertHexCodeToRgb(hexCode)
                        });
                    } else {
                        teams.push({ name: segments.join(" "), color: null });
                    }
                }
            }
        });

        if (possibleTeamCounts.includes(teams.length)
            && players.length === playerCount) {
            setTeams(teams);
            setPlayers(players);
        }
    };

    const valid = possibleLineCounts.includes(
        value.split("\n").filter((line) => line.length > 0).length
    );

    return (
        <div style={{ display: "flex", "flex-direction": "column" }}>
            <textarea
                cols={52}
                rows={18}
                value={value}
                onInput={onInput}
                tabIndex={tabIndex}
                style={{ "font-size": "11.5px", float: "right", resize: "none" }}
            >
            </textarea>
            <button
                type="button"
                disabled={!valid}
                onClick={decode}
                tabIndex={tabIndex}
                style={{
                    cursor: valid ? "unset" : "not-allowed",
                    "margin-top": "0.5rem"
                }}
            >
                Decode
            </button>
        </div>
    )
};
