"use server";

import { prisma } from "@/lib/prisma";
import type { ObjectType } from "@/features/projects/types";

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
  return prisma.project.create({
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
}

export async function getProjects() {
  return prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}