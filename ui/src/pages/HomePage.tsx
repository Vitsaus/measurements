import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getMeasurements } from "../api";
import { List } from "../components/List";
import { Measurement } from "../types";

export function HomePage() {
    const [measurements, setMeasurements] = useState<Measurement[]>([]);
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            const data = await getMeasurements();
            setMeasurements(data);
        }
        fetchData();
    }, []);

    return (
        <>
            <h2>View Measurements</h2>
            <input
                type="button"
                value="create new"
                onClick={() => {
                    history.push("/create");
                }}
            />
            <br />
            <br />
            <List measurements={measurements} />
        </>
    );
}
