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
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '15px', // Gap ridotto come in foto
      marginBottom: '40px'
    }}>
      <StatCard icon={<ListTodo size={22} color="#2DD4BF" />} label="Total Tasks" value={total.toString()} />
      <StatCard icon={<CheckCircle2 size={22} color="#2DD4BF" />} label="Completed" value={completed.toString()} />
      <StatCard icon={<Circle size={22} color="#2DD4BF" />} label="Active" value={active.toString()} />
      <StatCard icon={<TrendingUp size={22} color="#2DD4BF" />} label="Completion" value={`${completionRate}%`} />
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div style={{
      backgroundColor: '#0a0a0a', // Più scuro
      padding: '20px 25px',
      borderRadius: '12px',
      border: '1px solid #1a1a1a',
      display: 'flex',
      alignItems: 'center', // Allineamento orizzontale
      gap: '20px',
    }}>
      <div style={{ 
        backgroundColor: 'rgba(45, 212, 191, 0.05)', 
        padding: '12px', 
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff', lineHeight: '1.1' }}>{value}</div>
        <div style={{ color: '#555', fontSize: '0.75rem', marginTop: '4px', fontWeight: 500 }}>{label}</div>
      </div>
    </div>
  );
}