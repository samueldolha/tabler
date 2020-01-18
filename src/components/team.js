import { h } from "preact";
import { Input } from "./input";

export const Team = ({ name, setName, tabIndex }) => (
    <Input value={name} setValue={setName} tabIndex={tabIndex} />
);
