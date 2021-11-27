import styled from "@emotion/styled";
import ContentEditable from "react-contenteditable";
import { IContentRow } from "../interfaces";

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

interface IContentEditableRow {
  contentRow: IContentRow;
  setContentRows: React.Dispatch<React.SetStateAction<IContentRow[]>>;
}

const ContentEditableRow = ({
  contentRow,
  setContentRows,
}: IContentEditableRow) => {
  const { id, htmlContent } = contentRow;
  return (
    <ContentEditableWrapper>
      <ContentEditable
        className="editable"
        tagName="pre"
        html={htmlContent}
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
    </ContentEditableWrapper>
  );
};

export default ContentEditableRow;
