import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TaskFormContainer from "./task-form-container";

type Props = {
  open: boolean;
  onOpenChange: () => void;
  defaultDate?: Date;
};

export function NewTask({ open, onOpenChange, defaultDate }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent className="min-w-[90%]  overflow-y-auto max-h-[90%]" >
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <TaskFormContainer defaultDate={defaultDate}/>
        <DialogFooter>
          <Button type="submit" form="task-form">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
