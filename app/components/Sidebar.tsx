"use client";
import { Hash, ListTodo, Home, Briefcase, ShoppingCart, Heart, GraduationCap } from 'lucide-react';

const iconMap: any = {
  Personal: <Home size={18} />,
  Work: <Briefcase size={18} />,
  Shopping: <ShoppingCart size={18} />,
  Health: <Heart size={18} />,
  Learning: <GraduationCap size={18} />,
};

export function Sidebar({ categories, activeCategory, onSelectCategory, todos }: any) {
  return (
    <aside style={{ width: '280px', backgroundColor: '#000', borderRight: '1px solid #111', padding: '24px', display: 'flex', flexDirection: 'column' }}>
      {/* HEADER SIDEBAR: Icona e Testo nudi su sfondo nero */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', paddingLeft: '4px' }}>
        <div style={{ color: '#2DD4BF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ListTodo size={28} strokeWidth={2.5} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.2, letterSpacing: '-0.5px' }}>TaskFlow</h2>
          <p style={{ fontSize: '0.75rem', color: '#555', margin: 0, fontWeight: 500 }}>Manage your tasks</p>
        </div>
      </div>

      <nav>
        <p style={{ fontSize: '0.65rem', color: '#444', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px', fontWeight: 600 }}>Categories</p>
        <div 
          onClick={() => onSelectCategory("All")}
          style={{ 
            padding: '12px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            backgroundColor: activeCategory === "All" ? 'rgba(45, 212, 191, 0.05)' : 'transparent',
            color: activeCategory === "All" ? '#2DD4BF' : '#666',
            transition: '0.2s'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: activeCategory === "All" ? 600 : 400 }}> All Categories</div>
        </div>

        {categories.map((cat: string) => {
          const count = todos.filter((t: any) => t.category === cat).length;
          const isActive = activeCategory === cat;
          return (
            <div 
              key={cat}
              onClick={() => onSelectCategory(cat)}
              style={{ 
                padding: '12px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px',
                backgroundColor: isActive ? '#0a0a0a' : 'transparent',
                color: isActive ? '#fff' : '#444',
                transition: '0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: isActive ? 600 : 400 }}>
                <span style={{ color: isActive ? '#2DD4BF' : 'inherit' }}>{iconMap[cat] || <Hash size={18}/>}</span>
                {cat}
              </div>
              <span style={{ fontSize: '0.7rem', opacity: isActive ? 0.8 : 0.4 }}>{count}</span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}