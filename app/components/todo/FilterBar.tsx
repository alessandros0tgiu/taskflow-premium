"use client";

interface FilterBarProps {
  statusFilter: 'All' | 'Active' | 'Completed';
  setStatusFilter: (v: 'All' | 'Active' | 'Completed') => void;
  counts: { all: number; active: number; completed: number };
}

export function FilterBar({ statusFilter, setStatusFilter, counts }: FilterBarProps) {
  return (
    <div style={{ display: 'inline-flex', background: 'var(--panel)', padding: '6px', borderRadius: '14px', marginBottom: '30px', border: '1px solid var(--border)' }}>
      <FilterButton label="All" count={counts.all} active={statusFilter === 'All'} onClick={() => setStatusFilter('All')} />
      <FilterButton label="Active" count={counts.active} active={statusFilter === 'Active'} onClick={() => setStatusFilter('Active')} />
      <FilterButton label="Completed" count={counts.completed} active={statusFilter === 'Completed'} onClick={() => setStatusFilter('Completed')} />
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