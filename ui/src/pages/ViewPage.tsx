import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getMeasurement } from "../api";
import { Measurement } from "../types";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    & > div {
        margin: 0 0 4px 0;
    }
`;

export function ViewPage() {
    const [measurement, setMeasurement] = useState<Measurement | null>(null);
    const params = useParams<{
        id: string;
    }>();
    const id = parseInt(params.id);
    const history = useHistory();

    useEffect(() => {
        async function fetchMeasurement() {
            const data = await getMeasurement(id);
            if (!data) {
                alert("no measurement found!");
                return history.push("/");
            }
            setMeasurement(data);
        }
        fetchMeasurement();
    }, [history, id]);

    if (!measurement) return <div>Loading</div>;

    return (
        <Container>
            <div>
                <h2>View measurement</h2>
            </div>
            <div>
                <strong>Id</strong>
            </div>
            <div>{measurement?.id}</div>
            <div>
                <strong>Name</strong>
            </div>
            <div>{measurement?.name}</div>
            <div>
                <strong>Unit</strong>
            </div>
            <div>{measurement?.unit}</div>
            <div>
                <strong>Upper</strong>
            </div>
            <div>{measurement?.upper}</div>
            <div>
                <strong>Lower</strong>
            </div>
            <div>{measurement?.lower}</div>
            <br />
            <div>
                <input
                    type="button"
                    value="Edit"
                    onClick={() => {
                        history.push(`/edit/${id}`);
                    }}
                />
            </div>
            <div>
                <input
                    type="button"
                    value="List all"
                    onClick={() => {
                        history.push("/");
                    }}
                />
            </div>
            <div>
                <input
                    type="button"
                    value="Delete"
                    onClick={() => {
                        history.push(`/delete/${id}`);
                    }}
                />
            </div>
        </Container>
    );
}
