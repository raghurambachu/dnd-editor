import React from "react";
import styled from "@emotion/styled";
import TextEnhancementActions from "./components/TextEnhancementActions";
import Sidebar from "./components/Sidebar";
import ContentEditor from "./components/ContentEditor";
import { Switch, Route, Redirect } from "react-router-dom";
const Layout = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-columns: 25.6rem auto;
  grid-template-areas: "sidebar main";
`;

interface ISidebarWrapper {
  border: string;
}

const SidebarWrapper = styled.aside`
  grid-area: sidebar;
  box-shadow: ${({ border }: ISidebarWrapper) => ` 0 0 0.3rem ${border}`};
  position: sticky;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
  background: #f6f6f2;
  min-height: 100vh;
  .helptap-logo {
    width: 15rem;
    height: 15rem;
    transform: scale(0.5);
    display: block;
    margin: 0 auto;
  }
`;

interface IMainWrapper {
  background: string;
}

const MainWrapper = styled.main`
  grid-area: main;
  background: ${({ background }: IMainWrapper) => background};
  margin: 3rem 10.6rem 0;
  overflow-y: auto;
`;

function App() {
  /* Todo:
    1. Integrate react-beautiful-dnd
    2. Ensure drag and drop works
    3. Add drag-handle(UI)
    4. Create content-editable
    5. Change the layout design 
  */

  return (
    <Layout>
      <SidebarWrapper border="lightgrey">
        <Sidebar />
      </SidebarWrapper>
      <MainWrapper background="white">
        <TextEnhancementActions />
        <Switch>
          <Route path="/getting-started" exact component={ContentEditor} />
          <Route path="/about-me" exact component={ContentEditor} />
          <Redirect to="/getting-started" />
        </Switch>
      </MainWrapper>
    </Layout>
  );
}

export default App;
