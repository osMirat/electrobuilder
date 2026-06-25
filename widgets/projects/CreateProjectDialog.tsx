"use client";

import { useState } from "react";
import type { Project } from "@/features/projects/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProjectForm } from "@/widgets/projects/ProjectForm";

interface CreateProjectDialogProps {
  project?: Project;
  trigger?: React.ReactNode;
}

export function CreateProjectDialog({
  project,
  trigger,
}: CreateProjectDialogProps) {
  const [open, setOpen] = useState(false);

  const isEditMode = Boolean(project);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button>+ Новый проект</Button>}
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Редактировать проект" : "Новый проект"}
          </DialogTitle>
        </DialogHeader>

        <ProjectForm project={project} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}