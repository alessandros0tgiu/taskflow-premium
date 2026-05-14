"use client";
import { LayoutGrid, Hash, ListTodo, Home, Briefcase, ShoppingCart, Heart, GraduationCap } from 'lucide-react';

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
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
        <div style={{ backgroundColor: '#2DD4BF', padding: '8px', borderRadius: '10px' }}>
          <ListTodo size={22} color="#000" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', margin: 0 }}>TaskFlow</h2>
          <p style={{ fontSize: '0.7rem', color: '#444', margin: 0 }}>Manage your tasks</p>
        </div>
      </div>

      <nav>
        <p style={{ fontSize: '0.65rem', color: '#444', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Categories</p>
        <div 
          onClick={() => onSelectCategory("All")}
          style={{ 
            padding: '12px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            backgroundColor: activeCategory === "All" ? 'rgba(0,255,163,0.05)' : 'transparent',
            color: activeCategory === "All" ? '#2DD4BF' : '#666'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><LayoutGrid size={18} /> All Categories</div>
        </div>

        {categories.map((cat: string) => {
          const count = todos.filter((t: any) => t.category === cat).length;
          return (
            <div 
              key={cat}
              onClick={() => onSelectCategory(cat)}
              style={{ 
                padding: '12px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px',
                backgroundColor: activeCategory === cat ? '#0a0a0a' : 'transparent',
                color: activeCategory === cat ? '#fff' : '#444'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>{iconMap[cat] || <Hash size={18}/>} {cat}</div>
              <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>{count}</span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}