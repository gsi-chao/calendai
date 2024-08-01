import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TaskFormContainer from "./form/task-form-container";

type Props = {
  open: boolean;
  onOpenChange: () => void;
  defaultDate?: Date;
};

export function NewTask({ open, onOpenChange, defaultDate }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent className="min-w-[90%]  overflow-y-auto max-h-[90%]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Fill the form below to create a new task.
          </DialogDescription>
        </DialogHeader>
        <TaskFormContainer
          defaultDate={defaultDate}
          onSuccess={() => onOpenChange()}
        />
      </DialogContent>
    </Dialog>
  );
}
