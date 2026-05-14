export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'Low' | 'Medium' | 'High';
  category: string;
  createdAt: string; // Indispensabile per l'ordinamento
}

export const getTodos = (): Todo[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('taskflow_p');
  return data ? JSON.parse(data) : [];
};

export const saveTodos = (todos: Todo[]) => {
  localStorage.setItem('taskflow_p', JSON.stringify(todos));
};

export const getCategories = () => [
  "Personal", "Work", "Shopping", "Health", "Learning"
];