export type Measurement = {
    id: number;
} & MeasurementData;

export type MeasurementData = {
    name: string;
    unit: string;
    upper: number;
    lower: number;
};
