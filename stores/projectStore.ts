"use client";

import { create } from "zustand";
import type { ObjectType, Project } from "@/features/projects/types";

interface CreateProjectInput {
  name: string;
  clientName: string;
  address: string;
  objectType: ObjectType;
  phases: 1 | 3;
  comment: string;
}

interface ProjectStore {
  projects: Project[];
  createProject: (input: CreateProjectInput) => void;
}

function createProjectCode(index: number) {
  return `EB-${String(index + 1).padStart(4, "0")}`;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],

  createProject: (input) => {
    const now = new Date();
    const projects = get().projects;

    const project: Project = {
      id: crypto.randomUUID(),
      code: createProjectCode(projects.length),
      name: input.name,
      clientName: input.clientName,
      address: input.address,
      objectType: input.objectType,
      phases: input.phases,
      status: "draft",
      comment: input.comment,
      createdBy: "local",
      createdAt: now,
      updatedAt: now,
    };

    set({ projects: [project, ...projects] });
  },
}));