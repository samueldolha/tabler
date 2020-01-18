import { h, Fragment } from "preact";
import { useState } from "preact/hooks";
import { Input } from "./input";

export const PlayerNameInitializer = ({
    setPlayerNames,
    tabIndexOffset,
    style
}) => {
    const [input, setInput] = useState("");

    const playerNames = input.trim()
        .split(" ")
        .filter((segment) => segment.length > 0);
    const valid = playerNames.length === 12;

    const initialize = () => {
        if (valid) {
            setPlayerNames(playerNames);
        }
    };

    return (
        <Fragment>
            <Input
                value={input}
                setValue={setInput}
                tabIndex={tabIndexOffset}
                maxLength={150}
                style={{ ...style, "max-width": "650px" }}
            />
            <button
                type="button"
                disabled={!valid}
                onClick={initialize}
                tabIndex={tabIndexOffset + 1}
                style={{
                    "margin-left": "0.5rem",
                    "cursor": valid ? "pointer" : "not-allowed"
                }}
            >
                Initialize
            </button>
        </Fragment>
    );
};
