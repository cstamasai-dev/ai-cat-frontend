import React from 'react';
import { Cat } from '../../types/Cat';
import TemperamentBadge from '../TemperamentBadge/TemperamentBadge';

interface CatTableRowProps {
    cat: Cat;
    onEdit: (cat: Cat) => void;
    onDelete: (id: number) => void;
}

const CatTableRow: React.FC<CatTableRowProps> = ({ cat, onEdit, onDelete }) => {
    return (
        <tr>
            <td>{cat.name}</td>
            <td>{cat.weight?.metric}</td>
            <td>
                <TemperamentBadge temperament={cat.temperament?? ''} />
            </td>
            <td>{cat.origin}</td>
            <td>{cat.description}</td>
            <td>{cat.life_span}</td>
            <td>
                <button onClick={() => onEdit(cat)}>Edit</button>
                <button aria-label="Delete cat" onClick={() => onDelete(cat.id)}>🗑️</button>
            </td>
        </tr>
    );
};

export default CatTableRow;