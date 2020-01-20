import { h } from "preact";

const hexCodes = [
    "#e5a0a0",
    "#e5e5a0",
    "#a0e5a0",
    "#a0e5e5",
    "#a0a0e5",
    "#e5a0e5"
];

const convertRgbValueToHex = (value) => {
    const hex = value.toString(16);

    return hex.length === 1 ? `0${hex}` : hex;
}

const convertRgbToHex = (rgb) => convertRgbValueToHex(rgb.red)
    + convertRgbValueToHex(rgb.green)
    + convertRgbValueToHex(rgb.blue);

export const TableDataEncoder = ({ teams, players, tabIndex }) => {
    const parseHexCode = (teamIndex) => {
        if (teams[teamIndex].color !== null
            && teams[teamIndex].color.red !== null
            && teams[teamIndex].color.green !== null
            && teams[teamIndex].color.blue !== null) {
            return "#" + convertRgbToHex(teams[teamIndex].color);
        }

        if (teams.length === 1) {
            return "";
        }

        return hexCodes[Math.ceil(
            teamIndex * (hexCodes.length / teams.length))];
    }

    const encodedTableData = players.map(
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
                    + parseHexCode(teamIndex);

                return [teamLine, playerLine].join("\n");
            }

            return playerLine;
        }
    ).join("\n");

    return (
        <div style={{ display: "flex", "flex-direction": "column" }}>
            <textarea
                cols={52}
                rows={18}
                readonly={true}
                tabIndex={tabIndex}
                style={{ "font-size": "11.5px", resize: "none" }}
            >
                {encodedTableData}
            </textarea>
            <button
                type="button"
                onClick={
                    () => {
                        navigator.clipboard.writeText(encodedTableData)
                    }
                }
                tabIndex={tabIndex}
                style={{ "margin-top": "0.5rem" }}
            >
                Copy
        </button>
        </div>
    );
};
