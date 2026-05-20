import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { allExps } from '../data/experiences';

const CAT_COLORS = {
  "At home": "#D97706",
  "Outside": "#059669",
  "People & interactions": "#2563EB",
  "Handling & grooming": "#DC2626",
  "Gear": "#7C3AED",
};

const STORAGE_KEY = 'goldiva-puppy-100-experiences';

function loadChecked() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveChecked(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export default function Tracker() {
  const [checked, setChecked] = useState(loadChecked);
  const [openCats, setOpenCats] = useState({ "At home": true });

  const total = Object.values(allExps).reduce((s, items) => s + items.length, 0);
  const done = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);

  useEffect(() => { saveChecked(checked); }, [checked]);

  function toggle(cat, item) {
    const key = `${cat}::${item}`;
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function catDone(cat) {
    return allExps[cat].filter(item => checked[`${cat}::${item}`]).length;
  }

  function toggleCat(cat) {
    setOpenCats(prev => ({ ...prev, [cat]: !prev[cat] }));
  }

  function resetAll() {
    if (window.confirm('Reset all 100 experiences? This cannot be undone.')) {
      setChecked({});
    }
  }

  const progressMsg = pct === 100 ? '🎉 All 100 done!' :
    pct >= 75 ? 'Almost there — final push!' :
    pct >= 50 ? 'Halfway there, keep going!' :
    pct >= 25 ? 'Great start!' : 'Just getting started!';

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 4 }}>100 experiences in 100 days</h2>
        <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>
          Goal: complete all experiences before 16 weeks of age. Your progress saves automatically on this device.
        </p>

        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 32, fontWeight: 700, color: '#111827' }}>{done}</span>
          <span style={{ fontSize: 15, color: '#6b7280' }}>of {total} completed</span>
        </div>
        <div style={{ background: '#e5e7eb', borderRadius: 6, height: 10, overflow: 'hidden', marginBottom: 4 }}>
          <div style={{
            height: '100%', background: '#059669', borderRadius: 6,
            width: `${pct}%`, transition: 'width 0.4s ease'
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6b7280' }}>
          <span>{pct}% complete</span>
          <span>{progressMsg}</span>
        </div>
      </div>

      {/* Category cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {Object.entries(allExps).map(([cat, items]) => {
          const catColor = CAT_COLORS[cat] || '#6b7280';
          const catDoneCount = catDone(cat);
          const isOpen = openCats[cat];

          return (
            <div key={cat} style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
              <button
                onClick={() => toggleCat(cat)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '12px 16px', background: '#f9fafb', border: 'none',
                  borderBottom: isOpen ? '1px solid #e5e7eb' : 'none', cursor: 'pointer', textAlign: 'left'
                }}
              >
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: catColor, flexShrink: 0 }} />
                <span style={{ fontSize: 14, fontWeight: 600, flex: 1, color: '#111827' }}>{cat}</span>
                <span style={{ fontSize: 12, color: catDoneCount === items.length ? '#059669' : '#6b7280', fontWeight: catDoneCount === items.length ? 700 : 400 }}>
                  {catDoneCount} / {items.length}
                </span>
                <ChevronDown size={16} color="#9ca3af" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
              </button>

              {isOpen && (
                <div style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 4 }}>
                    {items.map((item) => {
                      const key = `${cat}::${item}`;
                      const isChecked = !!checked[key];
                      return (
                        <label key={item} style={{
                          display: 'flex', alignItems: 'flex-start', gap: 8, padding: '6px 6px',
                          borderRadius: 6, cursor: 'pointer',
                          background: isChecked ? '#f0fdf4' : 'transparent',
                          transition: 'background 0.1s'
                        }}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggle(cat, item)}
                            style={{ marginTop: 2, flexShrink: 0, accentColor: catColor, cursor: 'pointer' }}
                          />
                          <span style={{
                            fontSize: 13, lineHeight: 1.4, cursor: 'pointer',
                            color: isChecked ? '#6b7280' : '#374151',
                            textDecoration: isChecked ? 'line-through' : 'none'
                          }}>{item}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={resetAll}
        style={{
          marginTop: 16, padding: '8px 16px', border: '1px solid #d1d5db',
          borderRadius: 8, background: '#fff', color: '#6b7280', fontSize: 13,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
        }}
      >
        ↺ Reset all checkboxes
      </button>
    </div>
  );
}
