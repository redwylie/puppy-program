import { useState } from 'react';
import { ChevronDown, Flag, CheckSquare } from 'lucide-react';
import { weeks } from '../data/weeks';
import { weekExps } from '../data/experiences';

const PHASES = [
  { key: 'all', label: 'All phases' },
  { key: 'arrival', label: 'Weeks 1–2: Arrival' },
  { key: 'foundation', label: 'Weeks 3–6: Foundation' },
  { key: 'growth', label: 'Weeks 7–12: Growth' },
  { key: 'adolescent', label: 'Weeks 13+: Adolescent' },
];

const LEGEND = [
  { color: '#DC2626', label: 'Health & vet' },
  { color: '#D97706', label: 'Daily care' },
  { color: '#059669', label: 'Training' },
  { color: '#7C3AED', label: 'Exercise' },
  { color: '#2563EB', label: '100 experiences this week' },
];

function WeekCard({ week }) {
  const [open, setOpen] = useState(false);
  const expData = weekExps[week.expKey];

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 16px', background: '#f9fafb', border: 'none',
          borderBottom: '1px solid #e5e7eb', cursor: 'pointer', textAlign: 'left'
        }}
      >
        <span style={{
          fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 20,
          background: week.badgeColor, color: week.badgeText, whiteSpace: 'nowrap'
        }}>{week.badge}</span>
        <span style={{ fontSize: 14, fontWeight: 600, flex: 1, color: '#111827' }}>{week.week}</span>
        <span style={{ fontSize: 12, color: '#6b7280', whiteSpace: 'nowrap' }}>{week.age}</span>
        <ChevronDown size={16} color="#9ca3af" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
      </button>

      {open && (
        <div style={{ padding: 16 }}>
          {/* Milestone */}
          <div style={{
            background: '#EDE9FE', border: '1px solid #c4b5fd', borderRadius: 8,
            padding: '10px 14px', marginBottom: 14, display: 'flex', alignItems: 'flex-start', gap: 8
          }}>
            <Flag size={14} color="#7C3AED" style={{ marginTop: 2, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: '#5B21B6' }}>{week.milestone}</span>
          </div>

          {/* Task groups */}
          {week.groups.map((group) => (
            <div key={group.label} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: group.color, flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9ca3af' }}>
                  {group.label}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {group.tasks.map((task, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: group.color, flexShrink: 0, marginTop: 7 }} />
                    <span style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.5 }}>{task}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Experiences */}
          {expData && (
            <div style={{ marginBottom: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2563EB', flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9ca3af' }}>
                  100 experiences this week
                </span>
              </div>
              {expData.groups.map((g) => (
                <div key={g.title} style={{
                  background: '#EFF6FF', border: '1px solid #bfdbfe', borderRadius: 8,
                  padding: '10px 12px', marginBottom: 8
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <CheckSquare size={13} color="#2563EB" />
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#1d4ed8' }}>{g.title}</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {g.items.map((item) => (
                      <span key={item} style={{
                        fontSize: 12, padding: '3px 9px', borderRadius: 20,
                        background: '#dbeafe', color: '#1e40af', border: '1px solid #bfdbfe'
                      }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function WeeklyPlan() {
  const [phase, setPhase] = useState('all');
  const filtered = phase === 'all' ? weeks : weeks.filter(w => w.phase === phase);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 4 }}>Week-by-week program</h2>
        <p style={{ fontSize: 13, color: '#6b7280' }}>Health · Training · Daily care · Exercise · 100 Experiences — from your Goldiva Goldens course materials</p>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
        {LEGEND.map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.color }} />
            <span style={{ fontSize: 12, color: '#6b7280' }}>{l.label}</span>
          </div>
        ))}
      </div>

      {/* Phase filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        {PHASES.map(p => (
          <button key={p.key} onClick={() => setPhase(p.key)} style={{
            padding: '5px 12px', borderRadius: 20, fontSize: 12, cursor: 'pointer',
            border: '1px solid', transition: 'all 0.15s',
            borderColor: phase === p.key ? '#374151' : '#d1d5db',
            background: phase === p.key ? '#f3f4f6' : '#fff',
            color: phase === p.key ? '#111827' : '#6b7280',
            fontWeight: phase === p.key ? 600 : 400
          }}>{p.label}</button>
        ))}
      </div>

      {/* Week cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map((w, i) => <WeekCard key={i} week={w} />)}
      </div>
    </div>
  );
}
