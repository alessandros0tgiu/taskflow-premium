"use client";
import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { DashboardStats } from "./components/Dashboard";
import { getTodos, saveTodos, getCategories, Todo } from "@/lib/storage";
import { CheckCircle2, Circle, Plus, Trash2, Edit2, Check } from "lucide-react";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [selectedCategory, setSelectedCategory] = useState("Personal");
  const [mounted, setMounted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Completed'>('All');
  
  // Stato per la modifica
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
    // Gestione errore se vuoto
    if (!text.trim()) {
      setIsError(true);
      return;
    }
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

  // Funzioni per la modifica
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
  const finalFiltered = categoryFiltered.filter(t => {
    if (statusFilter === 'Active') return !t.completed;
    if (statusFilter === 'Completed') return t.completed;
    return true;
  });

  const countAll = categoryFiltered.length;
  const countActive = categoryFiltered.filter(t => !t.completed).length;
  const countCompleted = categoryFiltered.filter(t => t.completed).length;

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--background)', color: 'var(--text-main)', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar categories={getCategories()} activeCategory={activeCategory} onSelectCategory={setActiveCategory} todos={todos} />

      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <DashboardStats todos={categoryFiltered} />

        {/* INPUT BAR con Errore Luminoso */}
        <form onSubmit={handleAdd} style={{ 
          background: 'var(--panel)', 
          border: `1px solid ${isError ? '#ff4d4d' : 'var(--border)'}`, 
          borderRadius: '16px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px',
          boxShadow: isError ? '0 0 20px rgba(255, 77, 77, 0.2)' : '0 4px 25px rgba(0,0,0,0.4)',
          transition: '0.3s'
        }}>
          <input 
            value={text} onChange={(e) => setText(e.target.value)}
            placeholder={isError ? "Please enter a task name!" : "Add a new task..."} 
            style={{ flex: 1, background: 'transparent', border: 'none', color: isError ? '#ff4d4d' : '#fff', outline: 'none', fontSize: '1rem' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderLeft: '1px solid var(--border)', paddingLeft: '15px' }}>
            <select value={priority} onChange={(e: any) => setPriority(e.target.value)} style={{ background: '#1a1a1a', border: '1px solid var(--border-bright)', color: 'var(--accent)', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', outline: 'none' }}>
              <option value="Low">Low</option><option value="Medium">Medium</option><option value="High">High</option>
            </select>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', outline: 'none' }}>
              {getCategories().map(cat => (<option key={cat} value={cat}>{cat}</option>))}
            </select>
            <button type="submit" style={{ 
              background: 'var(--accent)', color: '#000', border: 'none', borderRadius: '12px', padding: '10px 22px', 
              fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
              boxShadow: '0 0 20px var(--accent-glow)' 
            }}>
              <Plus size={18} strokeWidth={3} /> Add
            </button>
          </div>
        </form>

        {/* FILTERS */}
        <div style={{ display: 'inline-flex', background: 'var(--panel)', padding: '6px', borderRadius: '14px', marginBottom: '30px', border: '1px solid var(--border)' }}>
          <FilterButton label="All" count={countAll} active={statusFilter === 'All'} onClick={() => setStatusFilter('All')} />
          <FilterButton label="Active" count={countActive} active={statusFilter === 'Active'} onClick={() => setStatusFilter('Active')} />
          <FilterButton label="Completed" count={countCompleted} active={statusFilter === 'Completed'} onClick={() => setStatusFilter('Completed')} />
        </div>

        {/* TASK LIST con Funzione Edit */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {finalFiltered.map(t => (
            <div key={t.id} className="glow-card" style={{ 
              border: `1px solid ${t.completed ? 'var(--border)' : 'var(--border-bright)'}`, 
              padding: '22px 28px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
                <div onClick={() => toggle(t.id)} style={{ cursor: 'pointer' }}>
                  {t.completed ? 
                    <CheckCircle2 size={28} color="var(--accent)" style={{ filter: 'drop-shadow(0 0 8px var(--accent-glow))' }} /> : 
                    <Circle size={28} color="var(--border-bright)" />
                  }
                </div>
                
                <div style={{ flex: 1 }}>
                  {editingId === t.id ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input 
                        value={editingText} 
                        onChange={(e) => setEditingText(e.target.value)}
                        autoFocus
                        onBlur={() => saveEdit(t.id)}
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit(t.id)}
                        style={{ background: '#1a1a1a', border: '1px solid var(--accent)', color: '#fff', padding: '4px 8px', borderRadius: '6px', outline: 'none', width: '80%' }}
                      />
                      <Check size={18} color="var(--accent)" cursor="pointer" onClick={() => saveEdit(t.id)} />
                    </div>
                  ) : (
                    <div 
                      onClick={() => startEditing(t.id, t.text)}
                      style={{ color: t.completed ? 'var(--text-muted)' : '#fff', fontWeight: 600, fontSize: '1.1rem', textDecoration: t.completed ? 'line-through' : 'none', cursor: 'text' }}
                    >
                      {t.text}
                    </div>
                  )}
                  <div style={{ fontSize: '0.8rem', color: '#555', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {t.category} 
                    <span style={{ 
                      color: t.priority === 'High' ? '#ff4d4d' : t.priority === 'Medium' ? '#ffa500' : 'var(--accent)',
                      filter: 'brightness(1.2)' 
                    }}>●</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Edit2 
                  size={18} 
                  color="#333" 
                  cursor="pointer" 
                  onClick={() => startEditing(t.id, t.text)}
                  style={{ transition: '0.2s' }}
                  onMouseEnter={(e: any) => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={(e: any) => e.currentTarget.style.color = '#333'}
                />
                <button onClick={() => deleteTask(t.id)} style={{ background: 'transparent', border: 'none', color: '#333', cursor: 'pointer', padding: '10px' }}>
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function FilterButton({ label, count, active, onClick }: { label: string, count: number, active: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ 
      background: active ? 'var(--border-bright)' : 'transparent', color: active ? '#fff' : 'var(--text-muted)', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: active ? 700 : 500, display: 'flex', alignItems: 'center', gap: '8px', transition: '0.3s'
    }}>
      {label} <span style={{ fontSize: '0.75rem', opacity: 0.8, background: active ? 'var(--accent)' : 'var(--border-bright)', color: active ? '#000' : 'var(--text-muted)', padding: '2px 8px', borderRadius: '6px' }}>{count}</span>
    </button>
  );
}