"use client";
import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { DashboardStats } from "./components/Dashboard";
import { TodoInput } from "./components/todo/TodoInput";
import { TodoItem } from "./components/todo/TodoItem";
import { FilterBar } from "./components/todo/FilterBar";
import { getTodos, saveTodos, getCategories, Todo } from "@/lib/storage";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [selectedCategory, setSelectedCategory] = useState("Personal");
  const [mounted, setMounted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Completed'>('All');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    setMounted(true);
    setTodos(getTodos());
  }, []);

  useEffect(() => {
    if (text.trim()) setIsError(false);
  }, [text]);

  const handleAdd = (e: any) => {
    e.preventDefault();
    if (!text.trim()) { setIsError(true); return; }
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      category: selectedCategory,
      priority,
      date: "Today"
    };
    const updated = [newTodo, ...todos];
    setTodos(updated);
    saveTodos(updated);
    setText("");
    setIsError(false);
  };

  const toggle = (id: string) => {
    const updated = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setTodos(updated);
    saveTodos(updated);
  };

  const deleteTask = (id: string) => {
    const updated = todos.filter(t => t.id !== id);
    setTodos(updated);
    saveTodos(updated);
  };

  const startEditing = (id: string, currentText: string) => {
    setEditingId(id);
    setEditingText(currentText);
  };

  const saveEdit = (id: string) => {
    if (!editingText.trim()) return;
    const updated = todos.map(t => t.id === id ? { ...t, text: editingText.trim() } : t);
    setTodos(updated);
    saveTodos(updated);
    setEditingId(null);
  };

  if (!mounted) return null;

  const categoryFiltered = activeCategory === "All" ? todos : todos.filter(t => t.category === activeCategory);
  
  // LOGICA DI FILTRO E ORDINAMENTO
  const finalFiltered = categoryFiltered
    .filter(t => {
      if (statusFilter === 'Active') return !t.completed;
      if (statusFilter === 'Completed') return t.completed;
      return true;
    })
    .sort((a, b) => {
      // Se lo stato di completamento è uguale, non cambiare ordine
      if (a.completed === b.completed) return 0;
      // Sposta i completati (true) dopo i non completati (false)
      return a.completed ? 1 : -1;
    });

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--background)', color: 'var(--text-main)', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar categories={getCategories()} activeCategory={activeCategory} onSelectCategory={setActiveCategory} todos={todos} />

      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <DashboardStats todos={categoryFiltered} />

        <TodoInput 
          text={text} setText={setText} 
          priority={priority} setPriority={setPriority}
          selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
          isError={isError} onAdd={handleAdd}
        />

        <FilterBar 
          statusFilter={statusFilter} 
          setStatusFilter={setStatusFilter}
          counts={{
            all: categoryFiltered.length,
            active: categoryFiltered.filter(t => !t.completed).length,
            completed: categoryFiltered.filter(t => t.completed).length
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {finalFiltered.map(t => (
            <TodoItem 
              key={t.id} todo={t}
              isEditing={editingId === t.id}
              editingText={editingText}
              setEditingText={setEditingText}
              onToggle={toggle} onDelete={deleteTask}
              onStartEdit={startEditing} onSaveEdit={saveEdit}
            />
          ))}
        </div>
      </main>
    </div>
  );
}