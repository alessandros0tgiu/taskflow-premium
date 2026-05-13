"use client";
import React from 'react';
import { ListTodo, CheckCircle2, Circle, TrendingUp } from 'lucide-react';
import { Todo } from "@/lib/storage";

interface DashboardStatsProps {
  todos: Todo[];
}

export function DashboardStats({ todos }: DashboardStatsProps) {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const active = total - completed;
  
  // Calcolo della percentuale di completamento
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
      marginBottom: '30px'
    }}>
      <StatCard 
        icon={<ListTodo size={20} color="#00ffa3" />} 
        label="Total Tasks" 
        value={total.toString()} 
      />
      <StatCard 
        icon={<CheckCircle2 size={20} color="#00ffa3" />} 
        label="Completed" 
        value={completed.toString()} 
      />
      <StatCard 
        icon={<Circle size={20} color="#00ffa3" />} 
        label="Active" 
        value={active.toString()} 
      />
      <StatCard 
        icon={<TrendingUp size={20} color="#00ffa3" />} 
        label="Completion" 
        value={`${completionRate}%`} 
      />
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div style={{
      backgroundColor: '#050505',
      padding: '24px',
      borderRadius: '16px',
      border: '1px solid #111',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      minWidth: '0'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#444', fontSize: '0.85rem' }}>
        {icon} <span style={{ fontWeight: 500 }}>{label}</span>
      </div>
      <div style={{ fontSize: '2rem', fontWeight: 700, color: '#fff' }}>
        {value}
      </div>
    </div>
  );
}