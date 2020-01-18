import { h } from "preact";

export const Input = ({
    value,
    setValue,
    maxLength,
    tabIndex,
    style
}) => (
        <input
            type="text"
            value={value || ""}
            onInput={
                (event) => {
                    setValue(event.target.value);
                }
            }
            maxLength={maxLength}
            tabIndex={tabIndex}
            style={{ ...style, width: `${maxLength * 0.7875}rem` }}
        >
        </input>
    );
