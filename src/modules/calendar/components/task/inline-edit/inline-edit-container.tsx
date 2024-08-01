import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { CalendarTask } from "@/lib/server/types";
import TaskFormContainer from "../form/task-form-container";

type Props = {
  open: boolean;
  onOpenChange: () => void;
  event: CalendarTask;
};

const InlineEditContainer: React.FC<Props> = ({ event, open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent className="min-w-[90%]  overflow-y-auto max-h-[90%]">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
        </DialogHeader>
        <TaskFormContainer task={event} onSuccess={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
};

export default InlineEditContainer;
