import React from 'react';
import CatTableRow from './CatTableRow';
import { Cat } from '../../types/Cat';
import './CatTable.css';

interface CatTableProps {
  cats: Cat[];
  onEdit: (cat: Cat) => void;
  onDelete: (catId: number) => void;
  searchTerm: string;
}

const CatTable: React.FC<CatTableProps> = ({ cats, onEdit, onDelete, searchTerm }) => {
  const filteredCats = cats.filter(cat => 
    (cat.name ?? '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <table className="cat-table">
      <thead>
        <tr>
          <th>Photo</th>
          <th>Name</th>
          <th>Weight</th>
          <th>Temperament</th>
          <th>Origin</th>
          <th>Description</th>
          <th>Life Span</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredCats.map(cat => (
          <CatTableRow 
            key={cat.id} 
            cat={cat} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        ))}
      </tbody>
    </table>
  );
};

export default CatTable;