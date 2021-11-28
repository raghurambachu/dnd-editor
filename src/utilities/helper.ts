import {
  IContentRow,
  IHandleAddContentEditableRowFunc,
  IOnDragEndFunc,
} from "../interfaces";

export const reorder = (
  list: IContentRow[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export function onDragEnd({
  result,
  contentRows,
  setContentRows,
}: IOnDragEndFunc) {
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

export function handleAddContentEditableRow({
  contentRow,
  contentRows,
  setNewlyCreatedContentRowId,
  setContentRows,
}: IHandleAddContentEditableRowFunc) {
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
