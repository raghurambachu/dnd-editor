import ContentEditable from "react-contenteditable";
import { IContentRow } from "../interfaces";

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
    <ContentEditable
      className="editable"
      tagName="pre"
      html={htmlContent}
      style={{ width: "100%" }}
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
  );
};

export default ContentEditableRow;
