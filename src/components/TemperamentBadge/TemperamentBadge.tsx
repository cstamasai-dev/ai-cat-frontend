import React from 'react';
import './TemperamentBadge.css';

interface TemperamentBadgeProps {
    temperament: string[];
}

const temperamentColors: { [key: string]: { bg: string; color: string } } = {
    Friendly: { bg: '#dff2ec', color: '#0f6d5a' },
    Playful: { bg: '#ffe7c2', color: '#8a4a08' },
    Affectionate: { bg: '#fde1ea', color: '#8a2d4a' },
    Independent: { bg: '#e6e8f5', color: '#3d4b8f' },
    Curious: { bg: '#fff2b6', color: '#7a5b00' },
    Active: { bg: '#fbd9d6', color: '#9c2f29' },
};

const TemperamentBadge: React.FC<TemperamentBadgeProps> = ({ temperament }) => {
    const values = temperament.map(value => value.trim()).filter(Boolean);

    if (values.length === 0) {
        return null;
    }

    return (
        <div className="temperament-badges">
            {values.map((value, index) => {
                const palette = temperamentColors[value] || { bg: '#e9eef1', color: '#4b5a66' };

                return (
                    <span
                        key={`${value}-${index}`}
                        className="temperament-badge"
                        style={{ backgroundColor: palette.bg, color: palette.color }}
                    >
                        {value}
                    </span>
                );
            })}
        </div>
    );
};

export default TemperamentBadge;