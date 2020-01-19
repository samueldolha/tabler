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
                tabIndex={tabIndexOffset + playerIndex + teamIndex}
            />
            <Input
                value={description}
                setValue={setDescription}
                tabIndex={tabIndexOffset + playerIndex + teamIndex}
                style={{ "margin-left": "0.5rem" }}
            />
            {
                scores.map((score, scoreIndex) => (
                    <Input
                        value={score}
                        setValue={setScore(scoreIndex)}
                        maxLength={2}
                        tabIndex={
                            tabIndexOffset
                            + teamCount
                            + ((scoreIndex + 1) * playerCount)
                            + playerIndex
                        }
                        style={{ "margin-left": "0.5rem" }}
                    />
                ))
            }
        </Fragment>
    );
}
