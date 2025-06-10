export type TaskType = {
  title: string;
  description: string;
  date: string;
  subtasks: string[];
  tags: string[];
  list: string;
  priority: string;
  priviteOrPublic: string;
};

export const initialTasks: TaskType[] = [
  {
    title: "Research content ideas",
    description: "Find trending and useful content to plan future posts and videos.",
    date: "2022-03-22",
    subtasks: ["Find topics", "Check trends"],
    tags: ["content", "research", "research", "research", "research", "research", "research"],
    list: "Personal",
    priority: "medium",
    priviteOrPublic: "private",
  },
  {
    title: "Create a database of guest authors",
    description: "Collect and organize emails of potential guest writers for the blog.",
    date: "2022-03-22",
    subtasks: ["Collect emails", "Design layout"],
    tags: ["work"],
    list: "Work",
    priority: "high",
    priviteOrPublic: "Public",
  },
];
