import styled from "@emotion/styled";
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

const DraggableRowWrapper = styled.div`
  background: white;
`;

const DraggableRowInnerWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const DragHandle = styled.div`
  margin-right: 0.5rem;
  .drag-icon {
    &:hover {
      background: #efefef;
      border-radius: 0.4rem;
    }
  }
`;

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
    <DraggableRowWrapper
      ref={draggableProvided.innerRef}
      {...draggableProvided.draggableProps}
      //Todo : @ts-ignore needs to be removed
      style={getItemStyle(
        draggableSnapshot.isDragging,
        draggableProvided.draggableProps.style
      )}
    >
      <DraggableRowInnerWrapper
        onMouseEnter={() => setIsBeingHovered(true)}
        onMouseLeave={() => setIsBeingHovered(false)}
      >
        <DragHandle {...draggableProvided.dragHandleProps}>
          <MdDragIndicator
            className="drag-icon"
            visibility={isBeingHovered ? "visibile" : "hidden"}
            color="#c2c2c2"
            size={22}
          />
        </DragHandle>
        <ContentEditableRow
          contentRow={contentRow}
          setContentRows={setContentRows}
        />
      </DraggableRowInnerWrapper>
    </DraggableRowWrapper>
  );
};

export default DraggableRow;
