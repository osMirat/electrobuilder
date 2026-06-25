"use client";

import { useWatch } from "react-hook-form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Project } from "@/features/projects/types";
import { useProjectStore } from "@/stores/projectStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const projectSchema = z.object({
  name: z.string().min(1, "Введите название проекта"),
  clientName: z.string().optional(),
  address: z.string().optional(),
  objectType: z.enum([
    "house",
    "apartment",
    "office",
    "commercial",
    "production",
    "other",
  ]),
  phases: z.enum(["1", "3"]),
  comment: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  project?: Project;
  onSuccess?: () => void;
}

export function ProjectForm({ project, onSuccess }: ProjectFormProps) {
  const createProject = useProjectStore((state) => state.createProject);
  const updateProject = useProjectStore((state) => state.updateProject);

  const isEditMode = Boolean(project);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project?.name ?? "",
      clientName: project?.clientName ?? "",
      address: project?.address ?? "",
      objectType: project?.objectType ?? "house",
      phases: project ? (String(project.phases) as "1" | "3") : "1",
      comment: project?.comment ?? "",
    },
  });

  const objectTypeValue = useWatch({
    control,
    name: "objectType",
  });

  const phasesValue = useWatch({
    control,
    name: "phases",
  });

  function onSubmit(values: ProjectFormValues) {
    const payload = {
      name: values.name,
      clientName: values.clientName ?? "",
      address: values.address ?? "",
      objectType: values.objectType,
      phases: Number(values.phases) as 1 | 3,
      comment: values.comment ?? "",
    };

    if (project) {
      updateProject(project.id, payload);
    } else {
      createProject(payload);
      reset();
    }

    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label>Название проекта *</Label>
        <Input placeholder="Например: Дом Иванова" {...register("name")} />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Тип объекта</Label>
          <Select
            value={objectTypeValue}
            onValueChange={(value) =>
              setValue("objectType", value as ProjectFormValues["objectType"])
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="house">Частный дом</SelectItem>
              <SelectItem value="apartment">Квартира</SelectItem>
              <SelectItem value="office">Офис</SelectItem>
              <SelectItem value="commercial">Коммерческое помещение</SelectItem>
              <SelectItem value="production">Производство</SelectItem>
              <SelectItem value="other">Другое</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Количество фаз</Label>
          <RadioGroup
            value={phasesValue}
            onValueChange={(value) => setValue("phases", value as "1" | "3")}
            className="flex gap-6 pt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="phase-1" />
              <Label htmlFor="phase-1">1 фаза</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3" id="phase-3" />
              <Label htmlFor="phase-3">3 фазы</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Заказчик</Label>
        <Input placeholder="Имя клиента" {...register("clientName")} />
      </div>

      <div className="space-y-2">
        <Label>Адрес</Label>
        <Input placeholder="Адрес объекта" {...register("address")} />
      </div>

      <div className="space-y-2">
        <Label>Комментарий</Label>
        <Textarea
          placeholder="Дополнительная информация по проекту"
          {...register("comment")}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Отмена
        </Button>

        <Button type="submit">
          {isEditMode ? "Сохранить изменения" : "Создать проект"}
        </Button>
      </div>
    </form>
  );
}