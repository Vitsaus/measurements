import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Measurement, MeasurementData } from "../types";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Label = styled.label`
    font-weight: bold;
    margin: 0 0 6px 0;
`;

const Field = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 8px;
    & > input {
        margin: 0 0 12px 0;
    }
`;

const schema = yup.object().shape({
    name: yup.string().min(1).required(),
    unit: yup.string().min(1).required(),
    upper: yup
        .number()
        .min(0)
        .moreThan(yup.ref("lower") as any)
        .required(),
    lower: yup.number().min(0).required(),
});

export type FormProps = {
    measurement: Measurement | null;
    onSubmit: (measurement: Measurement) => void;
};

export function Form(props: FormProps) {
    const [measurement, setMeasurement] = useState<Measurement | null>(props.measurement);

    useEffect(() => {
        setMeasurement(props.measurement);
    }, [props.measurement]);

    const { register, handleSubmit, errors } = useForm<MeasurementData>({
        resolver: yupResolver(schema),
        mode: "onBlur",
    });

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            {measurement && (
                <Field>
                    <Label>Id</Label>
                    {measurement.id}
                </Field>
            )}
            <Field>
                <Label htmlFor="form-name">Name</Label>
                <input name="name" id="form-name" defaultValue={measurement ? measurement.name : ""} ref={register} />
                {errors.name && <div>Invalid name</div>}
            </Field>
            <Field>
                <Label htmlFor="form-unit">Unit</Label>
                <input name="unit" id="form-unit" defaultValue={measurement ? measurement.unit : ""} ref={register} />
                {errors.unit && <div>Invalid unit</div>}
            </Field>
            <Field>
                <Label htmlFor="form-upper">Upper</Label>
                <input
                    name="upper"
                    id="form-upper"
                    defaultValue={measurement ? measurement.upper : ""}
                    ref={register}
                />
                {errors.upper && <div>Invalid upper bound</div>}
            </Field>
            <Field>
                <Label htmlFor="form-lower">Lower</Label>
                <input
                    name="lower"
                    id="form-lower"
                    defaultValue={measurement ? measurement.lower : ""}
                    ref={register}
                />
                {errors.lower && <div>Invalid lower bound</div>}
            </Field>
            <input type="submit" value="Submit" />
        </form>
    );
}
