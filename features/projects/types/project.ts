export type ObjectType =
  | "house"
  | "apartment"
  | "office"
  | "commercial"
  | "production"
  | "other";

export type ProjectStatus =
  | "draft"
  | "in_progress"
  | "completed"
  | "archived";

export interface Project {
  id: string;
  code: string;
  name: string;
  clientName: string;
  address: string;
  objectType: ObjectType;
  phases: 1 | 3;
  status: ProjectStatus;
  comment: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}