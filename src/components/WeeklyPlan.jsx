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
    <div style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', background: 'var(--surface)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 16px', background: 'var(--surface-2)', border: 'none',
          borderBottom: '1px solid var(--border)', cursor: 'pointer', textAlign: 'left'
        }}
      >
        <span style={{
          fontSize: 13, fontWeight: 600, padding: '2px 10px', borderRadius: 20,
          background: week.badgeColor, color: week.badgeText, whiteSpace: 'nowrap'
        }}>{week.badge}</span>
        <span style={{ fontSize: 16, fontWeight: 600, flex: 1, color: 'var(--text)' }}>{week.week}</span>
        <span style={{ fontSize: 14, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{week.age}</span>
        <ChevronDown size={16} color="var(--text-subtle)" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
      </button>

      {open && (
        <div style={{ padding: 16 }}>
          {/* Milestone */}
          <div style={{
            background: 'var(--milestone-bg)', border: '1px solid var(--milestone-border)', borderRadius: 8,
            padding: '10px 14px', marginBottom: 14, display: 'flex', alignItems: 'flex-start', gap: 8
          }}>
            <Flag size={14} color="#7C3AED" style={{ marginTop: 2, flexShrink: 0 }} />
            <span style={{ fontSize: 15, color: 'var(--milestone-text)' }}>{week.milestone}</span>
          </div>

          {/* Task groups */}
          {week.groups.map((group) => (
            <div key={group.label} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: group.color, flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-subtle)' }}>
                  {group.label}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {group.tasks.map((task, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: group.color, flexShrink: 0, marginTop: 7 }} />
                    <span style={{ fontSize: 15, color: 'var(--text-body)', lineHeight: 1.5 }}>{task}</span>
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
                <span style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-subtle)' }}>
                  100 experiences this week
                </span>
              </div>
              {expData.groups.map((g) => (
                <div key={g.title} style={{
                  background: 'var(--exp-bg)', border: '1px solid var(--exp-border)', borderRadius: 8,
                  padding: '10px 12px', marginBottom: 8
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <CheckSquare size={13} color="#2563EB" />
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--exp-title)' }}>{g.title}</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {g.items.map((item) => (
                      <span key={item} style={{
                        fontSize: 14, padding: '3px 9px', borderRadius: 20,
                        background: 'var(--exp-chip-bg)', color: 'var(--exp-chip-text)', border: '1px solid var(--exp-border)'
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
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Week-by-week program</h2>
        <p style={{ fontSize: 15, color: 'var(--text-muted)' }}>Health · Training · Daily care · Exercise · 100 Experiences — from your Goldiva Goldens course materials</p>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
        {LEGEND.map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.color }} />
            <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{l.label}</span>
          </div>
        ))}
      </div>

      {/* Phase filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        {PHASES.map(p => (
          <button key={p.key} onClick={() => setPhase(p.key)} style={{
            padding: '5px 12px', borderRadius: 20, fontSize: 14, cursor: 'pointer',
            border: '1px solid', transition: 'all 0.15s',
            borderColor: phase === p.key ? 'var(--text-body-strong)' : 'var(--border-strong)',
            background: phase === p.key ? 'var(--chip-bg)' : 'var(--surface)',
            color: phase === p.key ? 'var(--text)' : 'var(--text-muted)',
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
