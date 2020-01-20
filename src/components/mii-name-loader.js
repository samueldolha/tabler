import { get } from "axios";
import { h } from "preact";
import { useState } from "preact/hooks";
import "../assets/mii-font.css";
import { Input } from "./input";

export const MiiNameLoader = ({ tabIndex, style }) => {
    const [roomId, setRoomId] = useState("");
    const [miiNames, setMiiNames] = useState([]);

    const loadMiiNames = () => {
        get(`https://wiimmfi.de/mkw/room/${roomId}`).then((response) => {
            window.stop();
            const rootElement = document.createElement("html");
            rootElement.innerHTML = response.data.replace(
                /\/images\/[^"]+/g, ""
            );
            setMiiNames(
                Array.from(rootElement.querySelectorAll("span.mii-font"))
                    .map((element) => element.innerHTML)
            );
        });
    };

    return (
        <div
            style={{
                ...style,
                display: "flex", "justify-content": "space-between"
            }}
        >
            <Input
                value={roomId}
                setValue={
                    (value) => {
                        setRoomId(value);
                    }
                }
                maxLength={8}
                tabIndex={tabIndex}
            />
            {
                miiNames.map((miiName, index) => (
                    <span
                        onClick={
                            () => {
                                navigator.clipboard.writeText(miiName);
                            }
                        }
                        style={{
                            "align-items": "center",
                            "display": "flex",
                            "border-left-color": index > 0 ? "black" : "unset",
                            "border-left-style": index > 0 ? "solid" : "unset",
                            "border-left-width": index > 0 ? "1px" : "unset",
                            "flex-grow": "1",
                            "font-family": "MiiFont",
                            "font-size": "10px",
                            "justify-content": "center"
                        }}
                        tabIndex={tabIndex}
                    >
                        {miiName}
                    </span>
                ))
            }
            <button
                type="button"
                disabled={!(/r[0-9]{7}/).test(roomId)}
                onClick={loadMiiNames}
                tabIndex={tabIndex}
            >
                Load
            </button>
        </div>
    );
};
