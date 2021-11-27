import { useState } from "react";
import {
  DraggableProvided,
  DraggableStateSnapshot,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import { MdDragIndicator } from "react-icons/md";
import { IContentRow } from "../interfaces";
import ContentEditableRow from "./ContentEditableRow";

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
) => ({
  // some basic styles to make the items look a bit nicer

  // change background colour if dragging
  background: isDragging ? "white" : "white",

  // styles we need to apply on draggables
  ...draggableStyle,
});

interface IDraggableRow {
  draggableProvided: DraggableProvided;
  draggableSnapshot: DraggableStateSnapshot;
  contentRow: IContentRow;
  setContentRows: React.Dispatch<React.SetStateAction<IContentRow[]>>;
}

const DraggableRow = ({
  draggableProvided,
  draggableSnapshot,
  contentRow,
  setContentRows,
}: IDraggableRow) => {
  const [isBeingHovered, setIsBeingHovered] = useState(false);

  return (
    <div
      ref={draggableProvided.innerRef}
      {...draggableProvided.draggableProps}
      //Todo : @ts-ignore needs to be removed
      style={getItemStyle(
        draggableSnapshot.isDragging,
        draggableProvided.draggableProps.style
      )}
    >
      <div
        className="flex items-start"
        onMouseEnter={() => setIsBeingHovered(true)}
        onMouseLeave={() => setIsBeingHovered(false)}
      >
        <div className="mr-2" {...draggableProvided.dragHandleProps}>
          <MdDragIndicator
            visibility={isBeingHovered ? "visibile" : "hidden"}
            color="#c2c2c2"
            size={22}
          />
        </div>
        <ContentEditableRow
          contentRow={contentRow}
          setContentRows={setContentRows}
        />
      </div>
    </div>
  );
};

export default DraggableRow;
