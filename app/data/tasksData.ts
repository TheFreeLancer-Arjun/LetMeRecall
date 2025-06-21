export type TaskType = {
  id: string;
  title: string;
  description?: string;
  date?: string;
  list?: string;
  priority?: string;
  visibility?: "public" | "private";
  tags?: string[];
  subTasks?: string[];
  links?: any[];
  media?: any[];
};
