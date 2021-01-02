import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { getMeasurements, createMeasurement, getMeasurement, editMeasurement, deleteMeasurement } from "./api";
import { HomePage } from "./pages/HomePage";
import { ViewPage } from "./pages/ViewPage";
import { CreatePage } from "./pages/CreatePage";
import { EditPage } from "./pages/EditPage";
import { DeletePage } from "./pages/DeletePage";
import { Form } from "./components/Form";

jest.mock("./api");

jest.spyOn(window, "alert").mockImplementation(() => {});

const testValue = {
    id: 1,
    name: "TestName",
    unit: "TestUnit",
    upper: 100,
    lower: 50,
};

describe("App", () => {
    it("HomePage", async () => {
        const getMeasurementsMock = getMeasurements as jest.Mock;

        getMeasurementsMock.mockResolvedValueOnce([testValue]);

        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );

        expect(screen.getByText(/View measurements/i)).toBeInTheDocument();
        expect(screen.getByText(/Upper/i)).toBeInTheDocument();
        expect(screen.getByText(/Lower/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(getMeasurementsMock).toHaveBeenCalledTimes(1);
        });

        expect(screen.getByText(/TestUnit/i)).toBeInTheDocument();
        expect(screen.getByText(/TestName/i)).toBeInTheDocument();
    });

    it("ViewPage", async () => {
        const getMeasurementMock = getMeasurement as jest.Mock;

        getMeasurementMock.mockResolvedValueOnce(testValue);

        render(
            <MemoryRouter>
                <ViewPage />
            </MemoryRouter>
        );

        expect(screen.getByText(/Loading/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(getMeasurementMock).toHaveBeenCalledTimes(1);
        });

        expect(screen.getByText(/View measurement/i)).toBeInTheDocument();
        expect(screen.getByText(/TestUnit/i)).toBeInTheDocument();
        expect(screen.getByText(/TestName/i)).toBeInTheDocument();
    });

    it("CreatePage", async () => {
        const createMeasurementMock = createMeasurement as jest.Mock;

        createMeasurementMock.mockResolvedValueOnce(testValue);

        render(
            <MemoryRouter>
                <CreatePage />
            </MemoryRouter>
        );

        expect(screen.getByText(/Create measurement/i)).toBeInTheDocument();
        expect(screen.getByText(/Name/i)).toBeInTheDocument();
        expect(screen.getByText(/Unit/i)).toBeInTheDocument();

        fireEvent.input(screen.getByLabelText("Name"), {
            target: {
                value: "TestName",
            },
        });

        fireEvent.input(screen.getByLabelText("Unit"), {
            target: {
                value: "TestUnit",
            },
        });

        fireEvent.input(screen.getByLabelText("Upper"), {
            target: {
                value: "100",
            },
        });

        fireEvent.input(screen.getByLabelText("Lower"), {
            target: {
                value: "50",
            },
        });

        fireEvent.click(screen.getByText(/Submit/i), new MouseEvent("click"));

        await waitFor(() => {
            expect(createMeasurementMock).toHaveBeenCalledTimes(1);
        });
    });

    it("EditPage", async () => {
        const editMeasurementMock = editMeasurement as jest.Mock;
        const getMeasurementMock = getMeasurement as jest.Mock;

        editMeasurementMock.mockResolvedValueOnce(testValue);
        getMeasurementMock.mockResolvedValueOnce(testValue);

        render(
            <MemoryRouter>
                <EditPage />
            </MemoryRouter>
        );

        expect(screen.getByText(/Loading/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(getMeasurementMock).toHaveBeenCalledTimes(1);
        });

        expect(screen.getByText(/Edit measurement/i)).toBeInTheDocument();
        expect(screen.getByText(/Name/i)).toBeInTheDocument();
        expect(screen.getByText(/Unit/i)).toBeInTheDocument();

        fireEvent.input(screen.getByLabelText("Lower"), {
            target: {
                value: "10",
            },
        });

        fireEvent.click(screen.getByText(/Submit/i), new MouseEvent("click"));

        await waitFor(() => {
            expect(editMeasurementMock).toHaveBeenCalledTimes(1);
        });
    });

    it("DeletePage", async () => {
        const getMeasurementMock = getMeasurement as jest.Mock;
        const deleteMeasurementMock = deleteMeasurement as jest.Mock;
        const confirmMock = jest.spyOn(window, "confirm") as jest.Mock;

        getMeasurementMock.mockResolvedValueOnce(testValue);
        deleteMeasurementMock.mockResolvedValueOnce(true);
        confirmMock.mockResolvedValueOnce(true);

        render(
            <MemoryRouter>
                <DeletePage />
            </MemoryRouter>
        );

        expect(screen.getByText(/Loading/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(getMeasurementMock).toHaveBeenCalledTimes(1);
        });

        expect(screen.getByText(/Delete measurement/i)).toBeInTheDocument();

        fireEvent.click(screen.getByLabelText(/Delete measurement/i), new MouseEvent("click"));

        await waitFor(() => {
            expect(confirmMock).toBeCalled();
        });

        await waitFor(() => {
            expect(deleteMeasurementMock).toHaveBeenCalledTimes(1);
        });
    });

    it("Form, edit measurement", async () => {
        const onSubmitMock: jest.Mock = jest.fn();

        render(<Form measurement={testValue} onSubmit={onSubmitMock} />);

        expect(screen.getByText(/Submit/i)).toBeInTheDocument();
        expect(screen.getByText(/Name/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue(/TestUnit/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue(/TestName/i)).toBeInTheDocument();

        fireEvent.input(screen.getByLabelText("Name"), {
            target: {
                value: "HelloName",
            },
        });

        expect(screen.queryByDisplayValue(/HelloName/i)).toBeInTheDocument();
        expect(screen.queryByDisplayValue(/TestName/i)).toBeNull();

        fireEvent.click(screen.getByText(/Submit/i), new MouseEvent("click"));

        await waitFor(() => {
            expect(onSubmitMock).toHaveBeenCalledTimes(1);
        });
    });

    it("Form, create measurement", async () => {
        const onSubmitMock: jest.Mock = jest.fn();

        render(<Form measurement={null} onSubmit={onSubmitMock} />);

        expect(screen.getByText(/Submit/i)).toBeInTheDocument();
        expect(screen.getByText(/Name/i)).toBeInTheDocument();
        expect(screen.queryByDisplayValue(/TestUnit/i)).toBeNull();
        expect(screen.queryByDisplayValue(/TestName/i)).toBeNull();

        fireEvent.click(screen.getByText(/Submit/i), new MouseEvent("click"));

        await waitFor(() => {
            expect(onSubmitMock).toHaveBeenCalledTimes(0);
        });

        // validation does not pass just yet due to empty form values

        fireEvent.input(screen.getByLabelText("Name"), {
            target: {
                value: "TestName",
            },
        });

        fireEvent.input(screen.getByLabelText("Unit"), {
            target: {
                value: "TestUnit",
            },
        });

        fireEvent.input(screen.getByLabelText("Upper"), {
            target: {
                value: "100",
            },
        });

        fireEvent.input(screen.getByLabelText("Lower"), {
            target: {
                value: "200",
            },
        });

        fireEvent.click(screen.getByText(/Submit/i), new MouseEvent("click"));

        await waitFor(() => {
            expect(onSubmitMock).toHaveBeenCalledTimes(0);
        });

        // should not pass because lower is greater than upper

        fireEvent.input(screen.getByLabelText("Lower"), {
            target: {
                value: "50",
            },
        });

        fireEvent.click(screen.getByText(/Submit/i), new MouseEvent("click"));

        await waitFor(() => {
            expect(onSubmitMock).toHaveBeenCalledTimes(1);
        });

        // now it should pass
    });
});
