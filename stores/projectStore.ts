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

interface UpdateProjectInput extends Partial<CreateProjectInput> {
  status?: Project["status"];
}

interface ProjectStore {
  projects: Project[];
  createProject: (input: CreateProjectInput) => Project;
  updateProject: (id: string, input: UpdateProjectInput) => void;
  deleteProject: (id: string) => void;
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

  updateProject: (id, input) => {
    const now = new Date();

    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === id
          ? {
              ...project,
              ...input,
              name: input.name?.trim() ?? project.name,
              clientName: input.clientName?.trim() ?? project.clientName,
              address: input.address?.trim() ?? project.address,
              comment: input.comment?.trim() ?? project.comment,
              updatedAt: now,
            }
          : project
      ),
    }));
  },

  deleteProject: (id) => {
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== id),
    }));
  },

  getProjectById: (id) => {
    return get().projects.find((project) => project.id === id);
  },
}));