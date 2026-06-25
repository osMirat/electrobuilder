"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useProjectStore } from "@/stores/projectStore";
import { Button } from "@/components/ui/button";

const objectTypeLabels = {
  house: "Частный дом",
  apartment: "Квартира",
  office: "Офис",
  commercial: "Коммерческое помещение",
  production: "Производство",
  other: "Другое",
};

export default function ProjectDetailsPage() {
  const params = useParams<{ id: string }>();

  const project = useProjectStore((state) =>
    state.projects.find((item) => item.id === params.id)
  );

  if (!project) {
    return (
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Проект не найден</h1>
        <p className="mt-2 text-slate-500">
          Сейчас проекты хранятся временно. После обновления страницы данные
          очищаются.
        </p>

        <Button asChild className="mt-6">
          <Link href="/projects">Вернуться к проектам</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{project.code}</p>
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
          <p className="mt-2 text-slate-500">
            Карточка проекта ElectroBuilder
          </p>
        </div>

        <Button asChild variant="outline">
          <Link href="/projects">Назад к проектам</Link>
        </Button>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <dl className="grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-slate-500">Тип объекта</dt>
            <dd className="font-medium">
              {objectTypeLabels[project.objectType]}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-slate-500">Количество фаз</dt>
            <dd className="font-medium">{project.phases}</dd>
          </div>

          <div>
            <dt className="text-sm text-slate-500">Заказчик</dt>
            <dd className="font-medium">{project.clientName || "—"}</dd>
          </div>

          <div>
            <dt className="text-sm text-slate-500">Адрес</dt>
            <dd className="font-medium">{project.address || "—"}</dd>
          </div>

          <div>
            <dt className="text-sm text-slate-500">Статус</dt>
            <dd className="font-medium">Черновик</dd>
          </div>

          <div className="sm:col-span-2">
            <dt className="text-sm text-slate-500">Комментарий</dt>
            <dd className="font-medium">{project.comment || "—"}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}