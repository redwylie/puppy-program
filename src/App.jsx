import { useState } from 'react';
import WeeklyPlan from './components/WeeklyPlan';
import Tracker from './components/Tracker';

export default function App() {
  const [tab, setTab] = useState('plan');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 16px' }}>
          <div style={{ padding: '14px 0 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 26 }}>🐾</span>
              <div>
                <h1 style={{ fontSize: 19, fontWeight: 700, color: 'var(--text)', margin: 0 }}>Goldiva Puppy Program</h1>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>Based on Goldiva Goldens course materials</p>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 0 }}>
            {[{ key: 'plan', label: '📅 Weekly Plan' }, { key: 'tracker', label: '✅ 100 Experiences' }].map(t => (
              <button key={t.key} onClick={() => setTab(t.key)} style={{
                padding: '10px 16px', fontSize: 15, fontWeight: tab === t.key ? 700 : 400,
                color: tab === t.key ? 'var(--text)' : 'var(--text-muted)',
                background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: tab === t.key ? '2px solid var(--text)' : '2px solid transparent',
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
