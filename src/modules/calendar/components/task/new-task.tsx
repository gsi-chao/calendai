import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CalendarTask } from "@/lib/server/types";
import TaskFormContainer from "./form/task-form-container";

type Props = {
  open: boolean;
  onOpenChange: () => void;
  defaultDate?: Date;
  task?: CalendarTask | null;
};

export function NewTask({ open, onOpenChange, defaultDate, task }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent
        className="min-w-[90%]  overflow-y-auto max-h-[90%]"
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{task ? task.title : "Create New Task"}</DialogTitle>
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
        />
      </DialogContent>
    </Dialog>
  );
}
