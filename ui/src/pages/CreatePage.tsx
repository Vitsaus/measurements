import { useHistory } from "react-router-dom";
import { createMeasurement } from "../api";
import { Form } from "../components/Form";
import { Measurement, MeasurementData } from "../types";

export function CreatePage() {
    const history = useHistory();

    return (
        <div>
            <h2>Create measurement</h2>
            <Form
                measurement={null}
                onSubmit={async (data: MeasurementData) => {
                    const result: Measurement | null = await createMeasurement(data);
                    if (!result) {
                        return alert("creation failed!");
                    }
                    alert("measurement created!");
                    history.push(`/view/${result.id}`);
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
        </div>
    );
}
