"use client";

interface FilterBarProps {
  statusFilter: 'All' | 'Active' | 'Completed';
  setStatusFilter: (v: 'All' | 'Active' | 'Completed') => void;
  counts: { all: number; active: number; completed: number };
}

export function FilterBar({ statusFilter, setStatusFilter, counts }: FilterBarProps) {
  return (
    <div style={{ 
      display: 'flex', 
      width: '100%',
      overflowX: 'auto', // Permette lo scorrimento orizzontale su schermi piccoli
      gap: '8px',
      marginBottom: '30px',
      paddingBottom: '5px', // Spazio per non tagliare il focus ring
      msOverflowStyle: 'none',  // Nasconde scrollbar IE/Edge
      scrollbarWidth: 'none',   // Nasconde scrollbar Firefox
    }} className="hide-scrollbar">
      
      <div style={{ 
        display: 'inline-flex', 
        background: '#0a0a0a', 
        padding: '4px', 
        borderRadius: '12px', 
        border: '1px solid #111',
        whiteSpace: 'nowrap' // Impedisce ai bottoni di andare a capo
      }}>
        <FilterButton label="All" count={counts.all} active={statusFilter === 'All'} onClick={() => setStatusFilter('All')} />
        <FilterButton label="Active" count={counts.active} active={statusFilter === 'Active'} onClick={() => setStatusFilter('Active')} />
        <FilterButton label="Completed" count={counts.completed} active={statusFilter === 'Completed'} onClick={() => setStatusFilter('Completed')} />
      </div>
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
      gap: '8px',
      transition: '0.2s',
      whiteSpace: 'nowrap',
      flexShrink: 0 // <--- QUESTO IMPEDISCE AI BOTTONI DI SCHIACCIARSI
    }}>
      {label}
      <span style={{ 
        backgroundColor: active ? 'var(--accent)' : '#1a1a1a', 
        color: active ? '#000' : '#444',
        padding: '2px 8px',
        borderRadius: '6px',
        fontSize: '0.75rem',
        fontWeight: 800
      }}>
        {count}
      </span>
    </button>
  );
}