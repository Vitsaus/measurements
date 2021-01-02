import * as yup from "yup";
import { MeasurementData } from "./types";

const measurementSchema = yup.object().shape({
    name: yup.string().required(),
    unit: yup.string().required(),
    upper: yup
        .number()
        .min(0)
        .moreThan(yup.ref("lower") as any)
        .required(),
    lower: yup.number().min(0).required(),
});

export async function validateMeasurement(data: MeasurementData): Promise<boolean> {
    return await measurementSchema.isValid(data);
}

const idSchema = yup.number().min(0).required();

export async function validateId(id: number): Promise<boolean> {
    return await idSchema.isValid(id);
}
