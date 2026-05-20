import { useState } from 'react';
import WeeklyPlan from './components/WeeklyPlan';
import Tracker from './components/Tracker';

export default function App() {
  const [tab, setTab] = useState('plan');

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 16px' }}>
          <div style={{ padding: '14px 0 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 24 }}>🐾</span>
              <div>
                <h1 style={{ fontSize: 17, fontWeight: 700, color: '#111827', margin: 0 }}>Goldiva Puppy Program</h1>
                <p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>Based on Goldiva Goldens course materials</p>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 0 }}>
            {[{ key: 'plan', label: '📅 Weekly Plan' }, { key: 'tracker', label: '✅ 100 Experiences' }].map(t => (
              <button key={t.key} onClick={() => setTab(t.key)} style={{
                padding: '10px 16px', fontSize: 13, fontWeight: tab === t.key ? 700 : 400,
                color: tab === t.key ? '#111827' : '#6b7280',
                background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: tab === t.key ? '2px solid #111827' : '2px solid transparent',
                marginBottom: -1, transition: 'all 0.15s'
              }}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '20px 16px 40px' }}>
        {tab === 'plan' ? <WeeklyPlan /> : <Tracker />}
      </div>
    </div>
  );
}
