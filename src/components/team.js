import { h } from "preact";
import { ColorPicker } from "./color-picker";
import { Input } from "./input";

export const Team = ({ name, setName, color, setColor, tabIndex }) => (
    <div style={{ display: "flex" }}>
        <Input value={name} setValue={setName} tabIndex={tabIndex} />
        <ColorPicker
            color={color}
            setColor={setColor}
            tabIndex={tabIndex}
            style={{ "margin-left": "0.5rem" }}
        />
    </div>
);
