import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useLocation } from "react-router";
import { appData } from "../data";
import { IContentRow } from "../interfaces";
import { appConfig } from "../utilities/appConfig";
import { handleAddContentEditableRow, onDragEnd } from "../utilities/helper";
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

  return (
    <ContentEditorWrapper>
      <h3 className="content-editor-title">{contentEditorTitle}</h3>
      <DragDropContext
        onDragEnd={(result) =>
          onDragEnd({ result, contentRows, setContentRows })
        }
      >
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
                        handleAddContentEditableRow={() =>
                          handleAddContentEditableRow({
                            contentRows,
                            contentRow,
                            setContentRows,
                            setNewlyCreatedContentRowId,
                          })
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
