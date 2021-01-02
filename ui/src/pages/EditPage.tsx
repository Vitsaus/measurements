import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { editMeasurement, getMeasurement } from "../api";
import { Form } from "../components/Form";
import { Measurement, MeasurementData } from "../types";

export function EditPage() {
    const [measurement, setMeasurement] = useState<Measurement | null>(null);
    const params = useParams<{
        id: string;
    }>();
    const id = parseInt(params.id);
    const history = useHistory();

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

    if (!measurement) {
        return <div>Loading</div>;
    }

    return (
        <div>
            <h2>Edit measurement</h2>
            <Form
                measurement={measurement}
                onSubmit={async (data: MeasurementData) => {
                    const result = await editMeasurement(id, data);
                    if (result) {
                        history.push(`/view/${id}`);
                    } else {
                        alert("edit failed!");
                    }
                }}
            />
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
            <div>
                <input
                    type="button"
                    value="Create new"
                    onClick={() => {
                        history.push(`/create`);
                    }}
                />
            </div>
        </div>
    );
}
