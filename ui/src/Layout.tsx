import { ReactNode } from "react";

export type LayoutProps = {
    children: ReactNode;
};

export function Layout(props: LayoutProps) {
    return (
        <div>
            <header>
                <h1>Measurements</h1>
            </header>
            <div>{props.children}</div>
        </div>
    );
}
