import { ReactNode, useState } from "react";
import { TodoItem, TodoItemsAction } from "@/types/todo-items";
import { useTodoItemsDispatch } from "@/hooks/todo-items";
import ContextMenu from "@/components/Shared/Radix/Menu/Context";
import { HighlighterColors } from "@/constants/highlighter-colors";
import DeleteAlert from "@/components/Shared/Dialogs/DeleteAlert";

export default function TodoContextMenu({
  children,
  data,
}: {
  children: ReactNode;
  data: TodoItem;
}) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const todoItemDispatch = useTodoItemsDispatch();

  const handleColorChange = (color: string) => {
    todoItemDispatch!({
      type: TodoItemsAction.Update,
      payload: { ...data, color },
    });
  };

  const handleDelete = () => {
    todoItemDispatch!({ type: TodoItemsAction.Delete, payload: data });
  };

  return (
    <>
      <ContextMenu.Root>
        <ContextMenu.Trigger>{children}</ContextMenu.Trigger>
        <ContextMenu.Portal>
          <ContextMenu.Content>
            <ContextMenu.Sub>
              <ContextMenu.SubTrigger>
                Colors
                <ContextMenu.RightSlot>{`>`}</ContextMenu.RightSlot>
              </ContextMenu.SubTrigger>
              <ContextMenu.Portal>
                <ContextMenu.SubContent sideOffset={-2} alignOffset={-5}>
                  <ContextMenu.Item
                    onClick={() => handleColorChange(HighlighterColors.Red)}
                  >
                    <ColorSwatch color={HighlighterColors.Red}>Red</ColorSwatch>
                  </ContextMenu.Item>
                  <ContextMenu.Item
                    onClick={() => handleColorChange(HighlighterColors.Orange)}
                  >
                    <ColorSwatch color={HighlighterColors.Orange}>
                      Orange
                    </ColorSwatch>
                  </ContextMenu.Item>
                  <ContextMenu.Item
                    onClick={() => handleColorChange(HighlighterColors.Yellow)}
                  >
                    <ColorSwatch color={HighlighterColors.Yellow}>
                      Yellow
                    </ColorSwatch>
                  </ContextMenu.Item>
                  <ContextMenu.Item
                    onClick={() => handleColorChange(HighlighterColors.Green)}
                  >
                    <ColorSwatch color={HighlighterColors.Green}>
                      Green
                    </ColorSwatch>
                  </ContextMenu.Item>
                  <ContextMenu.Item
                    onClick={() => handleColorChange(HighlighterColors.Blue)}
                  >
                    <ColorSwatch color={HighlighterColors.Blue}>
                      Blue
                    </ColorSwatch>
                  </ContextMenu.Item>
                  <ContextMenu.Item
                    onClick={() => handleColorChange(HighlighterColors.Purple)}
                  >
                    <ColorSwatch color={HighlighterColors.Purple}>
                      Purple
                    </ColorSwatch>
                  </ContextMenu.Item>
                  <ContextMenu.Item
                    onClick={() => handleColorChange(HighlighterColors.Gray)}
                  >
                    <ColorSwatch color={HighlighterColors.Gray}>
                      Gray
                    </ColorSwatch>
                  </ContextMenu.Item>
                </ContextMenu.SubContent>
              </ContextMenu.Portal>
            </ContextMenu.Sub>
            <ContextMenu.DangerousItem
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete
            </ContextMenu.DangerousItem>
          </ContextMenu.Content>
        </ContextMenu.Portal>
      </ContextMenu.Root>
      <DeleteAlert
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onAccept={handleDelete}
      />
    </>
  );
}

function ColorSwatch({
  children,
  color,
}: {
  children: ReactNode;
  color: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          minHeight: "50%",
          marginRight: ".5rem",
          aspectRatio: "1/1",
          borderRadius: 9999,
          backgroundColor: `rgb(var(--${color}))`,
          border: `1px solid rgb(var(--accent-color))`,
        }}
      />
      {children}
    </div>
  );
}
