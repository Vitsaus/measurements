import React from "react";
import { createGlobalStyle } from "styled-components";
import { Layout } from "./Layout";
import { Switch, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { EditPage } from "./pages/EditPage";
import { CreatePage } from "./pages/CreatePage";
import { ViewPage } from "./pages/ViewPage";
import { DeletePage } from "./pages/DeletePage";

const GlobalStyles = createGlobalStyle`
    body {
        font-family: verdana;
        margin: 16px;
    }
    input[type=button], input[type=submit] {
        font-family: verdana;
        cursor: pointer;
        margin: 0 8px 8px 0;
    }
`;

function App() {
    return (
        <Layout>
            <GlobalStyles />
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route exact path="/edit/:id">
                    <EditPage />
                </Route>
                <Route exact path="/view/:id">
                    <ViewPage />
                </Route>
                <Route exact path="/delete/:id">
                    <DeletePage />
                </Route>
                <Route exact path="/create">
                    <CreatePage />
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;
