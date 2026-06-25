"use server";

import { prisma } from "@/lib/prisma";
import type { ObjectType } from "@/features/projects/types";
import { revalidatePath } from "next/cache";

interface CreateProjectInput {
  name: string;
  clientName?: string;
  address?: string;
  objectType: ObjectType;
  phases: 1 | 3;
  comment?: string;
}

async function getNextProjectCode() {
  const count = await prisma.project.count();
  return `EB-${String(count + 1).padStart(4, "0")}`;
}

export async function createProject(input: CreateProjectInput) {
  const project = await prisma.project.create({
    data: {
      code: await getNextProjectCode(),
      name: input.name.trim(),
      clientName: input.clientName?.trim() || null,
      address: input.address?.trim() || null,
      objectType: input.objectType,
      phases: input.phases,
      comment: input.comment?.trim() || null,
      status: "draft",
    },
  });

  revalidatePath("/projects");

  return project;
}

export async function getProjects() {
  return prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProject(id: string) {
  return prisma.project.findUnique({
    where: {
      id,
    },
  });
}

export async function deleteProject(id: string) {
  await prisma.project.delete({
    where: {
      id,
    },
  });

  revalidatePath("/projects");
}

interface UpdateProjectInput {
  name: string;
  clientName?: string;
  address?: string;
  objectType: ObjectType;
  phases: 1 | 3;
  comment?: string;
}

export async function updateProject(
  id: string,
  input: UpdateProjectInput
) {
  const project = await prisma.project.update({
    where: {
      id,
    },
    data: {
      name: input.name.trim(),
      clientName: input.clientName?.trim() || null,
      address: input.address?.trim() || null,
      objectType: input.objectType,
      phases: input.phases,
      comment: input.comment?.trim() || null,
    },
  });

  revalidatePath("/projects");
  revalidatePath(`/projects/${id}`);

  return project;
}