"use client";
import { Plus } from "lucide-react";
import { getCategories } from "@/lib/storage";

interface TodoInputProps {
  text: string;
  setText: (v: string) => void;
  priority: 'Low' | 'Medium' | 'High';
  setPriority: (v: 'Low' | 'Medium' | 'High') => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  isError: boolean;
  onAdd: (e: React.FormEvent) => void;
}

export function TodoInput({ text, setText, priority, setPriority, selectedCategory, setSelectedCategory, isError, onAdd }: TodoInputProps) {
  
  // Stile per i selettori (mantiene il look Premium della foto)
  const selectStyle = {
    background: '#1a1a1a', 
    border: '1px solid var(--border-bright)', 
    color: 'var(--accent)', 
    borderRadius: '8px', 
    padding: '6px 12px', 
    cursor: 'pointer', 
    outline: 'none',
    fontSize: '0.9rem'
  };

  return (
    <form onSubmit={onAdd} style={{ 
      background: 'var(--panel)', 
      border: `1px solid ${isError ? '#ff4d4d' : 'var(--border)'}`, 
      borderRadius: '16px', 
      padding: '14px', 
      display: 'flex', 
      flexWrap: 'wrap', // FONDAMENTALE: permette l'andata a capo su mobile
      alignItems: 'center', 
      gap: '12px', 
      marginBottom: '25px',
      boxShadow: isError ? '0 0 20px rgba(255, 77, 77, 0.2)' : '0 4px 25px rgba(0,0,0,0.4)',
      transition: '0.3s'
    }}>
      <input 
        type="text"
        value={text} 
        onChange={(e) => setText(e.target.value)}
        placeholder={isError ? "Please enter a task name!" : "Add a new task..."} 
        style={{ 
          flex: '1 1 300px', // Su PC resta largo, su mobile (sotto i 300px) manda i selettori sotto
          background: 'transparent', 
          border: 'none', 
          color: isError ? '#ff4d4d' : '#fff', 
          outline: 'none', 
          fontSize: '1rem',
          padding: '8px 4px'
        }}
      />
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px', 
        flex: '1 1 auto', // Si espande per riempire la riga su mobile
        justifyContent: 'flex-end',
        borderLeft: '1px solid var(--border)', 
        paddingLeft: '15px' 
      }} className="input-controls">
        
        {/* SELETTORE PRIORITÀ */}
        <select value={priority} onChange={(e: any) => setPriority(e.target.value)} style={selectStyle}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* SELETTORE CATEGORIA */}
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={selectStyle}>
          {getCategories().map(cat => (
            <option key={cat} value={cat} style={{ background: '#1a1a1a', color: '#fff' }}>
              {cat}
            </option>
          ))}
        </select>

        <button type="submit" style={{ 
          background: 'var(--accent)', 
          color: '#000', 
          border: 'none', 
          borderRadius: '12px', 
          padding: '10px 22px', 
          fontWeight: 800, 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px',
          boxShadow: '0 0 20px var(--accent-glow)',
          flexShrink: 0 // Evita che il bottone si rimpicciolisca
        }}>
          <Plus size={18} strokeWidth={3} /> Add
        </button>
      </div>
    </form>
  );
}