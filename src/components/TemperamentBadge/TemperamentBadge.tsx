import React from 'react';
import './TemperamentBadge.css';

interface TemperamentBadgeProps {
    temperament: string;
}

const temperamentColors: { [key: string]: string } = {
    Friendly: 'green',
    Playful: 'blue',
    Affectionate: 'pink',
    Independent: 'orange',
    Curious: 'yellow',
    Active: 'red',
};

const TemperamentBadge: React.FC<TemperamentBadgeProps> = ({ temperament }) => {
    const color = temperamentColors[temperament] || 'gray';

    return (
        <span className="temperament-badge" style={{ backgroundColor: color }}>
            {temperament}
        </span>
    );
};

export default TemperamentBadge;