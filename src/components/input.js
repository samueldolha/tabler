import { h } from "preact";

export const Input = ({
    value,
    setValue,
    readonly,
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
            readonly={readonly}
            maxLength={maxLength}
            tabIndex={tabIndex}
            style={{
                ...style,
                "font-size": "12px",
                width: `${maxLength * 0.7875}rem`
            }}
        >
        </input>
    );
