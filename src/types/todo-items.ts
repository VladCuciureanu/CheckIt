export type TodoItemData = {
  id: string;
  checked: boolean;
  content: string;
  parent?: string;
  color?: string;
};

export enum TodoItemsAction {
  Init,
  Create,
  Update,
  Delete,
  Clear,
}
