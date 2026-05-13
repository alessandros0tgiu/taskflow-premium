"use client";

interface FilterBarProps {
  statusFilter: 'All' | 'Active' | 'Completed';
  setStatusFilter: (v: 'All' | 'Active' | 'Completed') => void;
  counts: { all: number; active: number; completed: number };
}

export function FilterBar({ statusFilter, setStatusFilter, counts }: FilterBarProps) {
  return (
    <div style={{ 
      display: 'inline-flex', 
      background: '#0a0a0a', // Sfondo scuro come in foto
      padding: '4px', 
      borderRadius: '12px', 
      marginBottom: '30px', 
      border: '1px solid #111' 
    }}>
      <FilterButton label="All" count={counts.all} active={statusFilter === 'All'} onClick={() => setStatusFilter('All')} />
      <FilterButton label="Active" count={counts.active} active={statusFilter === 'Active'} onClick={() => setStatusFilter('Active')} />
      <FilterButton label="Completed" count={counts.completed} active={statusFilter === 'Completed'} onClick={() => setStatusFilter('Completed')} />
    </div>
  );
}

function FilterButton({ label, count, active, onClick }: { label: string, count: number, active: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ 
      background: active ? '#111' : 'transparent', 
      color: active ? '#fff' : '#555', 
      border: 'none', 
      padding: '8px 16px', 
      borderRadius: '10px', 
      cursor: 'pointer', 
      fontSize: '0.85rem', 
      fontWeight: active ? 700 : 500, 
      display: 'flex', 
      alignItems: 'center', 
      gap: '6px', 
      transition: '0.2s'
    }}>
      {label} 
      <span style={{ 
        fontSize: '0.7rem', 
        opacity: active ? 1 : 0.5, 
        color: active ? 'var(--text-muted)' : '#444' 
      }}>
        ({count})
      </span>
    </button>
  );
}