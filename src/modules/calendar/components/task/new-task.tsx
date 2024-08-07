import { addMinutes } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CalendarTask } from "@/lib/server/types";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import TaskFormContainer from "./form/task-form-container";
import { FormStatusMode } from "./form/type";

type Props = {
  open: boolean;
  onOpenChange: () => void;
  defaultDate?: Date;
  task?: CalendarTask | null;
};

export function NewTask({ open, onOpenChange, defaultDate, task }: Props) {
  const [formStatusMode, setFormStatusMode] = useState<FormStatusMode>(
    task ? "PREVIEW" : "CREATE"
  );

  useEffect(() => {
    task ? setFormStatusMode("PREVIEW") : setFormStatusMode("CREATE");
  }, [task]);

  const changeToEditMode = () => {
    setFormStatusMode("EDIT");
  };

  const onCloseModal = () => {
    setFormStatusMode(task ? "PREVIEW" : "CREATE");
    onOpenChange();
  };

  return (
    <Dialog open={open} onOpenChange={onCloseModal} modal>
      <DialogContent
        className="min-w-[90%]  overflow-y-auto max-h-[90%]"
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            {task ? task.title : "Create New Task"}

            {task && formStatusMode === "PREVIEW" && (
              <Button
                variant="outline"
                size="sm"
                className="ml-4"
                onClick={changeToEditMode}
                disabled={addMinutes(new Date(), 10) > new Date(task.postDate)}
              >
                Edit
                <Pencil className="ml-2 h-4 w-4" />
              </Button>
            )}
          </DialogTitle>
          {!task && (
            <DialogDescription>
              Fill the form below to create a new task.
            </DialogDescription>
          )}
        </DialogHeader>
        <TaskFormContainer
          defaultDate={defaultDate}
          onSuccess={() => onOpenChange()}
          task={task ?? undefined}
          mode={formStatusMode}
        />
      </DialogContent>
    </Dialog>
  );
}
