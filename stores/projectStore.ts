"use client";

import { create } from "zustand";
import type { ObjectType, Project } from "@/features/projects/types";

interface CreateProjectInput {
  name: string;
  clientName?: string;
  address?: string;
  objectType: ObjectType;
  phases: 1 | 3;
  comment?: string;
}

interface ProjectStore {
  projects: Project[];
  createProject: (input: CreateProjectInput) => Project;
  getProjectById: (id: string) => Project | undefined;
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
      name: input.name.trim(),
      clientName: input.clientName?.trim() ?? "",
      address: input.address?.trim() ?? "",
      objectType: input.objectType,
      phases: input.phases,
      status: "draft",
      comment: input.comment?.trim() ?? "",
      createdBy: "local",
      createdAt: now,
      updatedAt: now,
    };

    set({ projects: [project, ...projects] });

    return project;
  },

  getProjectById: (id) => {
    return get().projects.find((project) => project.id === id);
  },
}));