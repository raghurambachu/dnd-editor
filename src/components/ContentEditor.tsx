import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useLocation } from "react-router";
import { appData } from "../data";
import { IContentRow } from "../interfaces";
import { appConfig } from "../utilities/appConfig";
import { reorder } from "../utilities/helper";
import DraggableRow from "./DraggableRow";

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "white",
});

const ContentEditorWrapper = styled.div`
  .content-editor-title {
    font-size: 2.4rem;
    user-select: none;
    margin-bottom: 2rem;
    margin-left: 5rem;
    font-weight: 600;
  }
`;

const ContentEditor = () => {
  const location = useLocation();
  const [contentEditorTitle, setContentEditorTitle] = useState("");
  const { gettingStarted, aboutMe } = appData;
  const {
    url: { gettingStarted: gettingStartedUrl, aboutMe: aboutMeUrl },
  } = appConfig;
  // This takes care of managing the focus on creation of new editable content row
  const [newlyCreatedContentRowId, setNewlyCreatedContentRowId] = useState("");
  const [contentRows, setContentRows] = useState<IContentRow[]>([]);

  useEffect(() => {
    // This if blocks are for rendering data based on the route user navigated to. In ideal situation it would'nt be if blocks rather an api call
    if (location.pathname === gettingStartedUrl.link) {
      setContentEditorTitle(gettingStartedUrl.title);
      setContentRows(gettingStarted);
    } else if (location.pathname === aboutMeUrl.link) {
      setContentEditorTitle(aboutMeUrl.title);
      setContentRows(aboutMe);
    }
  }, [location.pathname]);

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
    <ContentEditorWrapper>
      <h3 className="content-editor-title">{contentEditorTitle}</h3>
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
    </ContentEditorWrapper>
  );
};

export default ContentEditor;
