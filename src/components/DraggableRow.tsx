import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import {
  DraggableProvided,
  DraggableStateSnapshot,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import { MdDragIndicator } from "react-icons/md";
import { CgMathPlus } from "react-icons/cg";
import { IContentRow } from "../interfaces";
import ContentEditableRow from "./ContentEditableRow";

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
) => ({
  // change background colour if dragging
  background: isDragging ? "white" : "white",
  ...draggableStyle,
});

const DraggableRowWrapper = styled.div`
  background: white;
`;

const DraggableRowInnerWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

interface IRowActions {
  isVisible: boolean;
}

const RowActions = styled.div`
  visibility: ${({ isVisible }: IRowActions) =>
    isVisible ? "visible" : "hidden"};
  font-size: 2.2rem;
  color: #c2c2c2;
  .add-icon,
  .drag-icon {
    &:hover {
      background: #efefef;
      border-radius: 0.4rem;
    }
  }
  .add-icon {
    cursor: pointer;
  }
`;

const DragHandle = styled.div`
  margin-right: 0.5rem;
`;

interface IDraggableRow {
  draggableProvided: DraggableProvided;
  draggableSnapshot: DraggableStateSnapshot;
  contentRow: IContentRow;
  setContentRows: React.Dispatch<React.SetStateAction<IContentRow[]>>;
  handleAddContentEditableRow: (contentRowVal: IContentRow) => void;
}

const DraggableRow = ({
  draggableProvided,
  draggableSnapshot,
  contentRow,
  setContentRows,
  handleAddContentEditableRow,
}: IDraggableRow) => {
  const [isBeingHovered, setIsBeingHovered] = useState(false);

  useEffect(() => {
    //   Ensures row actions to be visible even on dragging state
    if (draggableSnapshot.isDragging) {
      setIsBeingHovered(true);
    } else {
      setIsBeingHovered(false);
    }
  }, [draggableSnapshot.isDragging]);

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
        <RowActions className="flex" isVisible={isBeingHovered}>
          <CgMathPlus
            onClick={() => handleAddContentEditableRow(contentRow)}
            className="add-icon"
          />
          <DragHandle {...draggableProvided.dragHandleProps}>
            <MdDragIndicator className="drag-icon" />
          </DragHandle>
        </RowActions>
        <ContentEditableRow
          contentRow={contentRow}
          setContentRows={setContentRows}
        />
      </DraggableRowInnerWrapper>
    </DraggableRowWrapper>
  );
};

export default DraggableRow;
