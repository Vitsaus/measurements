import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { deleteMeasurement, getMeasurement } from "../api";
import { Measurement } from "../types";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    & > label {
        margin: 0 0 8px 0;
    }
    & > input {
        width: 80px;
        margin: 0 0 8px 0;
    }
`;

export function DeletePage() {
    const params = useParams<{
        id: string;
    }>();
    const id = parseInt(params.id);
    const history = useHistory();

    const [measurement, setMeasurement] = useState<Measurement | null>(null);

    useEffect(() => {
        async function fetchData() {
            const data = await getMeasurement(id);
            if (!data) {
                alert("no measurement found!");
                return history.push("/");
            }
            setMeasurement(data);
        }
        fetchData();
    }, [history, id]);

    if (!measurement) return <div>Loading...</div>;

    return (
        <Container>
            <label htmlFor="button-delete">Delete measurement: {id}</label>
            <input
                type="button"
                id="button-delete"
                value="Delete"
                onClick={async () => {
                    const isDeleteConfirmed = window.confirm("are you sure you want to delete this measurement?");
                    if (!isDeleteConfirmed) {
                        return alert("measurement is not deleted!");
                    }
                    const result = await deleteMeasurement(id);
                    if (result) {
                        alert("measurement removed!");
                        history.push("/");
                    } else {
                        alert("measurement removal failed!");
                    }
                }}
            />
            <input
                type="button"
                value="List all"
                onClick={async () => {
                    history.push("/");
                }}
            />
        </Container>
    );
}
