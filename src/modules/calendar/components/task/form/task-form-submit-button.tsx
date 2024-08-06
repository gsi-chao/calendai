"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Loader2, Save } from "lucide-react";
import React from "react";

type Props = {
  isSubmitting: boolean;
  isEditing?: boolean;
};

const TaskFormSubmitButton: React.FC<Props> = ({ isSubmitting, isEditing }) => {
  return (
    <DialogFooter>
      <Button
        type="submit"
        form="task-form"
        disabled={isSubmitting || isEditing}
      >
        {isSubmitting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Save className="mr-2 h-4 w-4" />
        )}
        {isSubmitting ? "Saving..." : "Save changes"}
      </Button>
    </DialogFooter>
  );
};

export default TaskFormSubmitButton;
