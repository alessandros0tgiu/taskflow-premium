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
  return (
    <form onSubmit={onAdd} style={{ 
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
  );
}