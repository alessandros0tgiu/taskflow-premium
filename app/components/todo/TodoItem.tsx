"use client";
import { CheckCircle2, Circle, Trash2, Edit2, Check } from "lucide-react";
import { Todo } from "@/lib/storage";

interface TodoItemProps {
  todo: Todo;
  isEditing: boolean;
  editingText: string;
  setEditingText: (v: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStartEdit: (id: string, text: string) => void;
  onSaveEdit: (id: string) => void;
}

export function TodoItem({ todo, isEditing, editingText, setEditingText, onToggle, onDelete, onStartEdit, onSaveEdit }: TodoItemProps) {
  return (
    <div className="glow-card" style={{ 
      border: `1px solid ${todo.completed ? 'var(--border)' : 'var(--border-bright)'}`, 
      padding: '22px 28px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
        <div onClick={() => onToggle(todo.id)} style={{ cursor: 'pointer' }}>
          {todo.completed ? 
            <CheckCircle2 size={28} color="var(--accent)" style={{ filter: 'drop-shadow(0 0 8px var(--accent-glow))' }} /> : 
            <Circle size={28} color="var(--border-bright)" />
          }
        </div>
        
        <div style={{ flex: 1 }}>
          {isEditing ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input 
                value={editingText} 
                onChange={(e) => setEditingText(e.target.value)}
                autoFocus
                onBlur={() => onSaveEdit(todo.id)}
                onKeyDown={(e) => e.key === 'Enter' && onSaveEdit(todo.id)}
                style={{ background: '#1a1a1a', border: '1px solid var(--accent)', color: '#fff', padding: '4px 8px', borderRadius: '6px', outline: 'none', width: '80%' }}
              />
              <Check size={18} color="var(--accent)" cursor="pointer" onClick={() => onSaveEdit(todo.id)} />
            </div>
          ) : (
            <div 
              onClick={() => onStartEdit(todo.id, todo.text)}
              style={{ color: todo.completed ? 'var(--text-muted)' : '#fff', fontWeight: 600, fontSize: '1.1rem', textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'text' }}
            >
              {todo.text}
            </div>
          )}
          <div style={{ fontSize: '0.8rem', color: '#555', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            {todo.category} 
            <span style={{ 
              color: todo.priority === 'High' ? '#ff4d4d' : todo.priority === 'Medium' ? '#ffa500' : 'var(--accent)',
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
          onClick={() => onStartEdit(todo.id, todo.text)}
          style={{ transition: '0.2s' }}
          onMouseEnter={(e: any) => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={(e: any) => e.currentTarget.style.color = '#333'}
        />
        <button onClick={() => onDelete(todo.id)} style={{ background: 'transparent', border: 'none', color: '#333', cursor: 'pointer', padding: '10px' }}>
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}