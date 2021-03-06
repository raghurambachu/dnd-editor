import styled from "@emotion/styled";
import { Popover } from "react-text-selection-popover";
import ContentEditable from "react-contenteditable";
import { IContentRow } from "../interfaces";
import { useEffect, useRef } from "react";

const ContentEditableWrapper = styled.div`
  font-size: 1.6rem;
  width: 100%;
  color: #37352f;
  .editable {
    white-space: pre-wrap;
    width: 100%;
    outline: none;
  }
`;

interface IPopoverWrapper {
  left: number;
  top: number;
  width: number;
}

const PopoverWrapper = styled.div`
  position: absolute;
  left: ${({ left, width }: IPopoverWrapper) => `${left + width - 80}px`};
  top: ${({ top }: IPopoverWrapper) => `${top - 30}px`};
  width: 20rem;
  background: #efefef;
  padding: 0.25rem;
  text-align: center;
  color: #35352f;
  border-radius: 3px;
  font-size: 1.6rem;
`;

interface IContentEditableRow {
  contentRow: IContentRow;
  setContentRows: React.Dispatch<React.SetStateAction<IContentRow[]>>;
  newlyCreatedContentRowId: string;
}

const ContentEditableRow = ({
  contentRow,
  setContentRows,
  newlyCreatedContentRowId,
}: IContentEditableRow) => {
  const { id, htmlContent } = contentRow;
  const newlyCreatedContentEditableRef = useRef<any>(null);
  console.log(htmlContent);

  useEffect(() => {
    // Sets the focus to newlyCreated content row
    if (newlyCreatedContentRowId && newlyCreatedContentEditableRef) {
      newlyCreatedContentEditableRef?.current?.focus();
    }
  }, [newlyCreatedContentRowId]);

  return (
    <ContentEditableWrapper>
      <ContentEditable
        className="editable"
        tagName="pre"
        html={htmlContent}
        innerRef={
          contentRow.id === newlyCreatedContentRowId
            ? newlyCreatedContentEditableRef
            : undefined
        }
        onChange={(e) =>
          setContentRows((contentRows) => {
            const editableContentRowIndex = contentRows.findIndex(
              (contentRow) => contentRow.id === id
            );
            const editedRow = {
              ...contentRows[editableContentRowIndex],
              htmlContent: e.target.value,
            };
            let editedContentRows = contentRows.slice();
            editedContentRows[editableContentRowIndex] = editedRow;
            return [...editedContentRows];
          })
        }
      />
      <Popover
        render={
          // Todo @ts-ignore needs to be removed
          ({ clientRect, isCollapsed, textContent }) => {
            if (clientRect == null || isCollapsed) return null;
            return (
              <PopoverWrapper
                left={clientRect.left}
                top={clientRect.top}
                width={clientRect.width}
              >
                Selecting {(textContent || "").length} characters
              </PopoverWrapper>
            );
          }
        }
      />
    </ContentEditableWrapper>
  );
};

export default ContentEditableRow;
