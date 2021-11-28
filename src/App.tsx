import React, { useState } from "react";
import { MdDragIndicator } from "react-icons/md";
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import { IContentRow } from "./interfaces";
import ContentEditableRow from "./components/ContentEditableRow";
import { reorder } from "./utilities/helper";
import styled from "@emotion/styled";
import DraggableRow from "./components/DraggableRow";

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

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "white",
});

function App() {
  /* Todo:
    1. Integrate react-beautiful-dnd
    2. Ensure drag and drop works
    3. Add drag-handle(UI)
    4. Create content-editable
    5. Change the layout design 
  */

  // This takes care of managing the focus on creation of new editable content row
  const [newlyCreatedContentRowId, setNewlyCreatedContentRowId] = useState("");
  const [contentRows, setContentRows] = useState<IContentRow[]>([
    {
      id: "item-1",
      htmlContent: `<p>item-1 content</p>`,
    },
    {
      id: "item-2",
      htmlContent: `<p>item-2 content</p>`,
    },
    {
      id: "item-3",
      htmlContent: `<p>item-3 content</p>`,
    },
    {
      id: "item-4",
      htmlContent: `<p>item-4 content</p>`,
    },
    {
      id: "item-5",
      htmlContent: `<p>item-5 content</p>`,
    },
    {
      id: "item-6",
      htmlContent: `<p>item-6 content</p>`,
    },
  ]);

  function onDragEnd(result: DropResult) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const contentRowList = reorder(
      contentRows,
      result.source.index,
      result.destination.index
    );

    setContentRows(contentRowList);
  }
  // Todo: needs to be moved to utilities
  function handleAddContentEditableRow(contentRow: IContentRow) {
    const createdNewContentRow: IContentRow = {
      id: `item-${contentRows.length + 1}`,
      htmlContent: `<p> </p>`,
    };
    setNewlyCreatedContentRowId(createdNewContentRow.id);

    let contentRowList = Array.from(contentRows);
    const currentClickedContentRowIndex = contentRows.findIndex(
      (contentRowVal) => contentRowVal.id === contentRow.id
    );
    contentRowList.splice(
      currentClickedContentRowIndex + 1,
      0,
      createdNewContentRow
    );

    setContentRows([...contentRowList]);
  }

  return (
    <Layout>
      <SidebarWrapper border="lightgrey" />
      <MainWrapper background="white">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(droppableProvided, droppableSnapshot) => (
              <div
                ref={droppableProvided.innerRef}
                style={getListStyle(droppableSnapshot.isDraggingOver)}
              >
                {contentRows.map((contentRow, index) => (
                  <Draggable
                    key={contentRow.id}
                    draggableId={contentRow.id}
                    index={index}
                  >
                    {(draggableProvided, draggableSnapshot) => {
                      return (
                        <DraggableRow
                          draggableProvided={draggableProvided}
                          draggableSnapshot={draggableSnapshot}
                          contentRow={contentRow}
                          setContentRows={setContentRows}
                          handleAddContentEditableRow={
                            handleAddContentEditableRow
                          }
                          newlyCreatedContentRowId={newlyCreatedContentRowId}
                        />
                      );
                    }}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </MainWrapper>
    </Layout>
  );
}

export default App;
