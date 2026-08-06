import React, { useState } from 'react';
import { Utensils, Coffee, Gamepad2, Film, Sparkles, CheckCircle2, Flame, Church, Ticket, Fish, MoreHorizontal } from 'lucide-react';
import ClassyButton from './ClassyButton';

const DATE_OPTIONS = [
  {
    id: 'dinner', title: 'Dinner Date', description: 'Romantic food & candlelight vibes',
    icon: Utensils, emoji: '🍽️',
    border: '#fda4af', iconColor: '#e11d48', glow: 'rgba(225,29,72,0.25)',
  },
  {
    id: 'coffee', title: 'Coffee Date', description: 'Cozy chats & cute pastries',
    icon: Coffee, emoji: '☕',
    border: '#fdba74', iconColor: '#ea580c', glow: 'rgba(234,88,12,0.25)',
  },
  {
    id: 'sushi', title: 'Sushi Date', description: 'Fresh rolls & good vibes',
    icon: Fish, emoji: '🍣',
    border: '#6ee7b7', iconColor: '#059669', glow: 'rgba(5,150,105,0.25)',
  },
  {
    id: 'braai', title: 'Braai Date', description: 'Fire, food & good company',
    icon: Flame, emoji: '🔥',
    border: '#fca5a5', iconColor: '#dc2626', glow: 'rgba(220,38,38,0.25)',
  },
  {
    id: 'church', title: 'Church Date', description: 'Worship together in faith',
    icon: Church, emoji: '⛪',
    border: '#c4b5fd', iconColor: '#7c3aed', glow: 'rgba(124,58,237,0.25)',
  },
  {
    id: 'game', title: 'Game Date', description: 'Arcade, board games & laughs',
    icon: Gamepad2, emoji: '🎮',
    border: '#a5b4fc', iconColor: '#4f46e5', glow: 'rgba(79,70,229,0.25)',
  },
  {
    id: 'movie', title: 'Movie Date', description: 'Popcorn & a great film together',
    icon: Film, emoji: '🎬',
    border: '#93c5fd', iconColor: '#2563eb', glow: 'rgba(37,99,235,0.25)',
  },
  {
    id: 'event', title: 'Event Date', description: 'Concert, show or special event',
    icon: Ticket, emoji: '🎟️',
    border: '#f9a8d4', iconColor: '#db2777', glow: 'rgba(219,39,119,0.25)',
    isEvent: true,
  },
  {
    id: 'other', title: 'Other', description: 'Sleepover, painting & more...',
    icon: MoreHorizontal, emoji: '✨',
    border: '#d4b896', iconColor: '#92400e', glow: 'rgba(146,64,14,0.25)',
    isOther: true,
  },
];

export default function DateTypeSelector({ selectedType, onSelect, onNext }) {
  const [customTitle, setCustomTitle] = useState('');

  const handleSelect = (opt) => {
    if (opt.isOther) {
      onSelect({ ...opt, title: customTitle.trim() || 'Other' });
    } else {
      onSelect(opt);
    }
  };

  const handleCustomChange = (e) => {
    setCustomTitle(e.target.value);
    if (selectedType?.isOther) {
      onSelect({ ...selectedType, title: e.target.value.trim() || 'Other' });
    }
  };

  const isOtherSelected = selectedType?.isOther;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="flex items-center justify-center gap-2" style={{ color: '#c0395a' }}>
        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="font-black uppercase tracking-widest text-xs">Step 1 of 2</span>
      </div>

      <div>
        <h2
          className="text-2xl sm:text-3xl font-black mb-2"
          style={{ fontFamily: 'Playfair Display, serif', color: '#7a1535' }}
        >
          Choose Our Vibe 🌸
        </h2>
        <p className="text-xs sm:text-sm" style={{ color: '#b07090' }}>
          What kind of date sounds perfect?
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 sm:gap-7">
        {DATE_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selectedType?.id === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => handleSelect(opt)}
              className="relative p-3 sm:p-5 rounded-xl sm:rounded-2xl text-left cursor-pointer flex flex-col gap-2 sm:gap-3 transition-all duration-200 hover:-translate-y-1 hover:scale-105 active:scale-95"
              style={{
                background: isSelected
                  ? 'linear-gradient(135deg, #fde8e8f8 0%, #fcd5cef8 50%, #f9b8c4f8 100%)'
                  : 'linear-gradient(135deg, #fde8e8cc 0%, #fcd5cecc 50%, #f9b8c4cc 100%)',
                backdropFilter: 'blur(8px)',
                border: `2px solid ${isSelected ? opt.iconColor : opt.border}`,
                boxShadow: isSelected
                  ? `0 8px 28px ${opt.glow}, 0 0 0 3px ${opt.border}`
                  : `0 2px 10px ${opt.glow}`,
                transform: isSelected ? 'scale(1.04) translateY(-2px)' : undefined,
              }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-md"
                  style={{ background: opt.iconColor }}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                {isSelected && <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6" style={{ color: opt.iconColor }} />}
              </div>
              <div>
                <h3
                  className="font-black text-xs sm:text-base leading-tight"
                  style={{ color: '#4a1020', fontFamily: 'Playfair Display, serif' }}
                >
                  {opt.emoji} {opt.title}
                </h3>
                <p className="text-[10px] sm:text-xs mt-0.5 sm:mt-1 leading-snug" style={{ color: '#9d6070' }}>
                  {opt.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom input for Other */}
      {isOtherSelected && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
          <label style={{
            fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#92400e',
          }}>
            ✨ Describe your date idea
          </label>
          <input
            type="text"
            placeholder="e.g. Sleepover, Painting class, Hiking..."
            value={customTitle}
            onChange={handleCustomChange}
            style={{
              width: '100%',
              padding: '14px 18px',
              borderRadius: '16px',
              fontFamily: 'Lato, sans-serif',
              fontWeight: 700,
              fontSize: '1rem',
              color: '#7a1535',
              background: 'rgba(255,228,235,0.8)',
              border: '2px solid #d4b896',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
      )}

      <ClassyButton onClick={onNext} disabled={!selectedType || (isOtherSelected && !customTitle.trim())}>
        Continue →
      </ClassyButton>
    </div>
  );
}
