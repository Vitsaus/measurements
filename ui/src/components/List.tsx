import { Measurement } from "../types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Rows = styled.div`
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const Column = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0 8px 8px 0;
    width: 120px;
`;

const ColumnTitle = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0 8px 8px 0;
    width: 120px;
    font-weight: bold;
`;

export type ListProps = {
    measurements: Measurement[];
};

export function List(props: ListProps) {
    return (
        <Rows>
            <Row>
                <ColumnTitle>Id</ColumnTitle>
                <ColumnTitle>Name</ColumnTitle>
                <ColumnTitle>Unit</ColumnTitle>
                <ColumnTitle>Upper</ColumnTitle>
                <ColumnTitle>Lower</ColumnTitle>
                <ColumnTitle>Edit</ColumnTitle>
                <ColumnTitle>Delete</ColumnTitle>
            </Row>
            {props.measurements.map((row: Measurement, index) => {
                return (
                    <Row key={`measurement-${index}`}>
                        <Column>
                            <Link to={`/view/${row.id}`}>{row.id}</Link>
                        </Column>
                        <Column>{row.name}</Column>
                        <Column>{row.unit}</Column>
                        <Column>{row.upper}</Column>
                        <Column>{row.lower}</Column>
                        <Column>
                            <Link to={`/edit/${row.id}`}>Edit</Link>
                        </Column>
                        <Column>
                            <Link to={`/delete/${row.id}`}>Delete</Link>
                        </Column>
                    </Row>
                );
            })}
        </Rows>
    );
}
