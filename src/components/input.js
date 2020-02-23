import { h } from "preact";

export const Input = ({
    value,
    setValue,
    onClick,
    readonly,
    maxLength,
    tabIndex,
    style
}) => (
        <input
            type="text"
            value={(value || value === 0) ? value : ""}
            onClick={onClick}
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
                width: `${maxLength * 0.41}rem`
            }}
        >
        </input>
    );
