import { h } from "preact";
import { Input } from "./input";

export const ColorPicker = ({ color, setColor, tabIndex, style }) => {
    const setColorProperty = (value, property) => {
        const actualValue = Math.max(
            0,
            Math.min(255, Number.parseInt(value, 10))
        );

        if (Number.isNaN(actualValue)) {
            if (color !== null) {
                const newColor = { ...color, [property]: null };

                if (Object.values(newColor).every((value) => value === null)) {
                    setColor(null);
                } else {
                    setColor(newColor);
                }
            }
        } else {
            setColor({
                ...(
                    color === null
                        ? { red: null, green: null, blue: null }
                        : color
                ),
                [property]: actualValue
            });
        }
    };

    return (
        <div style={{ ...style, display: "flex" }}>
            <Input
                value={
                    (color === null || color.red === null)
                        ? ""
                        : color.red.toString()
                }
                setValue={(value) => setColorProperty(value, "red")}
                maxLength={3}
                tabIndex={tabIndex}
            />
            <Input
                value={
                    (color === null || color.green === null)
                        ? ""
                        : color.green.toString()
                }
                setValue={(value) => setColorProperty(value, "green")}
                maxLength={3}
                tabIndex={tabIndex}
                style={{ "margin-left": "0.5rem" }}
            />
            <Input
                value={
                    (color === null || color.blue === null)
                        ? ""
                        : color.blue.toString()
                }
                setValue={(value) => setColorProperty(value, "blue")}
                maxLength={3}
                tabIndex={tabIndex}
                style={{ "margin-left": "0.5rem" }}
            />
        </div>
    );
};
