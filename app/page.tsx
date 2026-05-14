"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; 
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setTodos(getTodos());
  }, []);

  const handleAdd = (e: any) => {
    e.preventDefault();
    if (!text.trim()) { setIsError(true); return; }
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

  // 1. Filtro per categoria
  const categoryFiltered = activeCategory === "All" ? todos : todos.filter(t => t.category === activeCategory);

  // 2. Filtro per stato (All, Active, Completed) e ORDINAMENTO
  const finalTodos = categoryFiltered
    .filter(t => {
      if (statusFilter === 'Active') return !t.completed;
      if (statusFilter === 'Completed') return t.completed;
      return true;
    })
    .sort((a, b) => {
      // Regola 1: Aperte sopra, Completate sotto
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      // Regola 2: Più recenti in alto
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#000' }}>
      
      {/* HEADER RESPONSIVE */}
      <header style={{ 
        width: '100%', display: 'flex', alignItems: 'center', gap: '16px', 
        padding: '16px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', 
        backgroundColor: '#000', flexShrink: 0, zIndex: 110
      }}>
        {/* Bottone Menu: Visibile solo su Mobile via globals.css */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center' }}
          className="mobile-menu-btn"
        >
          {isMenuOpen ? <X size={24} color="#2DD4BF" /> : <Menu size={24} />}
        </button>

        <div style={{ backgroundColor: '#2DD4BF', padding: '8px', borderRadius: '10px', display: 'flex' }}>
          <svg style={{ width: '18px', height: '18px', color: '#000' }} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path d="M13 5h8M13 12h8M13 19h8M3 17l2 2 4-4M3 7l2 2 4-4" />
          </svg>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff', margin: 0 }}>TaskFlow</h1>
          <span className="header-subtitle" style={{ fontSize: '0.65rem', color: '#555' }}>Manage your tasks</span>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        
        {/* SIDEBAR: La classe 'open' è gestita dalle media queries in globals.css */}
        <div className={`sidebar-container ${isMenuOpen ? 'open' : ''}`}>
          <Sidebar 
            categories={getCategories()} 
            activeCategory={activeCategory} 
            onSelectCategory={(cat: string) => {
              setActiveCategory(cat);
              setIsMenuOpen(false); // Chiude il menu dopo la selezione su mobile
            }} 
            todos={todos} 
          />
        </div>

        {/* Overlay per chiudere il menu cliccando fuori (solo mobile) */}
        {isMenuOpen && <div onClick={() => setIsMenuOpen(false)} className="mobile-overlay" />}
        
        <main className="main-content" style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            <DashboardStats todos={categoryFiltered} />

            <TodoInput 
              text={text} setText={setText} 
              priority={priority} setPriority={setPriority}
              selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
              isError={isError} onAdd={handleAdd}
            />

            <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
              <FilterBar 
                statusFilter={statusFilter} setStatusFilter={setStatusFilter}
                counts={{
                  all: categoryFiltered.length,
                  active: categoryFiltered.filter(t => !t.completed).length,
                  completed: categoryFiltered.filter(t => t.completed).length
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '40px' }}>
              {finalTodos.map(t => (
                <TodoItem 
                  key={t.id} todo={t}
                  isEditing={editingId === t.id}
                  editingText={editingText}
                  setEditingText={setEditingText}
                  onToggle={(id) => {
                    const u = todos.map(x => x.id === id ? {...x, completed: !x.completed} : x);
                    setTodos(u); saveTodos(u);
                  }} 
                  onDelete={(id) => {
                    const u = todos.filter(x => x.id !== id);
                    setTodos(u); saveTodos(u);
                  }}
                  onStartEdit={(id, txt) => { setEditingId(id); setEditingText(txt); }} 
                  onSaveEdit={(id) => {
                    if(!editingText.trim()) return;
                    const u = todos.map(x => x.id === id ? {...x, text: editingText.trim()} : x);
                    setTodos(u); saveTodos(u); setEditingId(null);
                  }}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}