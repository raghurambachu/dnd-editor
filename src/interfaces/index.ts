import { DropResult } from "react-beautiful-dnd";

export interface IContentRow {
  id: string;
  htmlContent: string;
}

export interface IOnDragEndFunc {
  result: DropResult;
  contentRows: IContentRow[];
  setContentRows: React.Dispatch<React.SetStateAction<IContentRow[]>>;
}

export interface IHandleAddContentEditableRowFunc {
  contentRow: IContentRow;
  contentRows: IContentRow[];
  setNewlyCreatedContentRowId: React.Dispatch<React.SetStateAction<string>>;
  setContentRows: React.Dispatch<React.SetStateAction<IContentRow[]>>;
}
