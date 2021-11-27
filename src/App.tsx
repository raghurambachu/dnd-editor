import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import { IContentRow } from "./interfaces";

const grid = 8;
const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
) => ({
  // some basic styles to make the items look a bit nicer

  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "red",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "grey",
  padding: grid,
  width: 250,
});

function App() {
  /* Todo:
    1. Integrate react-beautiful-dnd
    2. Ensure drag and drop works
    3. Add drag-handle(UI)
    4. Create content-editable
    5. Change the layout design 
  */
  const [contentRows, setContentRows] = useState<IContentRow[]>([
    {
      id: "item-1",
      content: "item-1 content",
    },
    {
      id: "item-2",
      content: "item-2 content",
    },
    {
      id: "item-3",
      content: "item-3 content",
    },
    {
      id: "item-4",
      content: "item-4 content",
    },
    {
      id: "item-5",
      content: "item-5 content",
    },
    {
      id: "item-6",
      content: "item-6 content",
    },
  ]);

  const reorder = (
    list: IContentRow[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

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

  return (
    <div className="bg-blue-100 min-h-screen">
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
                  {(draggableProvided, draggableSnapshot) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      // @ts-ignore
                      style={getItemStyle(
                        draggableSnapshot.isDragging,
                        draggableProvided.draggableProps.style
                      )}
                    >
                      {contentRow.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
