import { Measurement, MeasurementData } from "./types";

const SERVER_URL = "http://localhost:3010";

export async function getMeasurements(): Promise<Measurement[]> {
    try {
        const result = await fetch(`${SERVER_URL}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        });

        if (result.status === 200) {
            return await result.json();
        }

        return [];
    } catch (e) {
        return [];
    }
}

export async function getMeasurement(id: number): Promise<Measurement | null> {
    try {
        const result = await fetch(`${SERVER_URL}/${id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        });

        if (result.status === 200) {
            return await result.json();
        }

        return null;
    } catch (e) {
        return null;
    }
}

export async function createMeasurement(data: MeasurementData): Promise<Measurement | null> {
    try {
        const result = await fetch(`${SERVER_URL}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            },
        });

        if (result.status === 201) {
            return await result.json();
        }

        return null;
    } catch (e) {
        return null;
    }
}

export async function editMeasurement(id: number, data: MeasurementData): Promise<Measurement | null> {
    try {
        const result = await fetch(`${SERVER_URL}/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            },
        });

        if (result.status === 200) {
            return await result.json();
        }

        return null;
    } catch (e) {
        return null;
    }
}

export async function deleteMeasurement(id: number): Promise<boolean> {
    try {
        const result = await fetch(`${SERVER_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
        });

        if (result.status === 200) {
            return true;
        }

        return false;
    } catch (e) {
        return false;
    }
}
