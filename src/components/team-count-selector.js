import { h } from "preact";

export const TeamCountSelector = ({
    teamCount,
    setTeamCount,
    tabIndex
}) => (
        <select
            value={teamCount}
            onChange={({ target: { value } }) => {
                setTeamCount(value);
            }}
            tabIndex={tabIndex}
        >
            <option value={1}>
                FFA
        </option>
            <option value={6}>
                2v2
        </option>
            <option value={4}>
                3v3
        </option>
            <option value={3}>
                4v4
        </option>
            <option value={2}>
                6v6
        </option>
        </select>
    );
