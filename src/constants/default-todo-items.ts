import { TodoItem } from "@/types/todo-items";

const DefaultTodoItems: TodoItem[] = [
  {
    id: "9b54572f-de4a-4235-b82f-71dc3d35f0f9",
    checked: true,
    content: "aeet",
  },
  {
    id: "0f2bef70-905e-4764-a353-a42d76360389",
    checked: false,
    content: "beet",
    parent: "9b54572f-de4a-4235-b82f-71dc3d35f0f9",
  },
  {
    id: "92bb2050-43f7-46d1-820e-ef7dbf0534c9",
    checked: true,
    content: "ceet",
    color: "#F00",
    parent: "9b54572f-de4a-4235-b82f-71dc3d35f0f9",
  },
  {
    id: "92bb2050-43f7-46d1-820e-ef7dbf0534cd",
    checked: true,
    content: "ceet",
    color: "#F00",
    parent: "92bb2050-43f7-46d1-820e-ef7dbf0534c9",
  },
  {
    id: "85d78829-ae35-48a3-a250-11781c991e16",
    checked: false,
    content: "deet",
  },
  {
    id: "adb05e07-a422-4a24-a5a5-53596c3c33ed",
    checked: true,
    content: "eeet",
  },
];

export default DefaultTodoItems;
