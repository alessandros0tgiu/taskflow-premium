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
  const [isError, setIsError] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Completed'>('All');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    setTodos(getTodos());
  }, []);

  // Reset errore quando l'utente ricomincia a scrivere
  useEffect(() => {
    if (text.trim()) setIsError(false);
  }, [text]);

  const handleAdd = (e: any) => {
    e.preventDefault();
    if (!text.trim()) { 
      setIsError(true); 
      return; 
    }
    
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      priority,
      category: selectedCategory,
      createdAt: new Date().toISOString()
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

  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = (id: string) => {
    // CONTROLLO ERRORI IN MODIFICA: No nomi vuoti o solo spazi
    if (!editingText.trim()) {
      alert("Il nome della task non può essere vuoto!");
      return;
    }
    const updated = todos.map(t => t.id === id ? { ...t, text: editingText.trim() } : t);
    setTodos(updated);
    saveTodos(updated);
    setEditingId(null);
  };

  // 1. FILTRO PER CATEGORIA (SIDEBAR)
  const categoryFiltered = activeCategory === "All" 
    ? todos 
    : todos.filter(t => t.category === activeCategory);

  // 2. FILTRO PER STATO (FILTERBAR: All, Active, Completed)
  const statusFiltered = categoryFiltered.filter(t => {
    if (statusFilter === 'Active') return !t.completed;
    if (statusFilter === 'Completed') return t.completed;
    return true;
  });

  // 3. ORDINAMENTO: Le più recenti appaiono per prime
  const finalTodos = [...statusFiltered].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#000' }}>
      
      {/* HEADER SUPERIORE */}
      <header style={{ 
        width: '100%', display: 'flex', alignItems: 'center', gap: '16px', 
        padding: '20px 32px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', 
        backgroundColor: '#000', flexShrink: 0 
      }}>
        <div style={{ backgroundColor: '#2DD4BF', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center' }}>
          <svg style={{ width: '20px', height: '20px', color: '#000' }} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M13 5h8M13 12h8M13 19h8M3 17l2 2 4-4M3 7l2 2 4-4" />
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff', margin: 0, lineHeight: 1 }}>TaskFlow</h1>
          <span style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '6px', fontWeight: 500 }}>Manage your tasks</span>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar 
          categories={getCategories()} 
          activeCategory={activeCategory} 
          onSelectCategory={setActiveCategory} 
          todos={todos} 
        />
        
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
            {finalTodos.map(t => (
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
    </div>
  );
}