import { h, Fragment } from "preact";
import { Input } from "./input";

export const Player = ({
    name,
    description,
    setName,
    setDescription,
    scores,
    setScore,
    playerIndex,
    playerCount,
    teamIndex,
    teamCount,
    tabIndexOffset
}) => {
    return (
        <Fragment>
            <Input
                value={name}
                setValue={setName}
                tabIndex={(2 * playerIndex)
                    + teamIndex
                    + tabIndexOffset
                    + 1}
            />
            <Input
                value={description}
                setValue={setDescription}
                tabIndex={(2 * playerIndex)
                    + teamIndex
                    + tabIndexOffset
                    + 2}
                style={{
                    "margin-left": "0.5rem"
                }}
            />
            <Input
                value={scores[0]}
                setValue={setScore(0)}
                maxLength={2}
                tabIndex={playerIndex
                    + (2 * playerCount)
                    + tabIndexOffset
                    + teamCount}
                style={{
                    "margin-left": "0.5rem"
                }}
            />
            <Input
                value={scores[1]}
                setValue={setScore(1)}
                maxLength={2}
                tabIndex={playerIndex
                    + (3 * playerCount)
                    + tabIndexOffset
                    + teamCount}
                style={{
                    "margin-left": "0.5rem"
                }}
            />
            <Input
                value={scores[2]}
                setValue={setScore(2)}
                maxLength={2}
                tabIndex={playerIndex
                    + (4 * playerCount)
                    + tabIndexOffset
                    + teamCount}
                style={{
                    "margin-left": "0.5rem"
                }}
            />
            <Input
                value={scores[3]}
                setValue={setScore(3)}
                maxLength={2}
                tabIndex={playerIndex
                    + (5 * playerCount)
                    + tabIndexOffset
                    + teamCount}
                style={{
                    "margin-left": "0.5rem"
                }}
            />
            <Input
                value={scores[4]}
                setValue={setScore(4)}
                maxLength={2}
                tabIndex={playerIndex
                    + (6 * playerCount)
                    + tabIndexOffset
                    + teamCount}
                style={{
                    "margin-left": "0.5rem"
                }}
            />
        </Fragment>
    );
}
