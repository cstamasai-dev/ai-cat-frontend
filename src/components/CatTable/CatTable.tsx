import React, { useState } from 'react';
import CatTableRow from './CatTableRow';
import { Cat } from '../../types/Cat';
import './CatTable.css';

interface CatTableProps {
  cats: Cat[];
  onEdit: (cat: Cat) => void;
  onDelete: (catId: number) => void;
  searchTerm: string;
}

interface Filters {
  name: string;
  weightImperial: string;
  weightMetric: string;
  temperament: string;
  origin: string;
  description: string;
  lifeSpan: string;
  indoor: string;
  lap: string;
  childFriendly: string;
  dogFriendly: string;
  energyLevel: string;
  grooming: string;
  healthIssues: string;
  intelligence: string;
  strangerFriendly: string;
  hairless: string;
  rare: string;
  shortLegs: string;
  hypoallergenic: string;
}

const CatTable: React.FC<CatTableProps> = ({ cats, onEdit, onDelete, searchTerm }) => {
  const [filters, setFilters] = useState<Filters>({
    name: '',
    weightImperial: '',
    weightMetric: '',
    temperament: '',
    origin: '',
    description: '',
    lifeSpan: '',
    indoor: '',
    lap: '',
    childFriendly: '',
    dogFriendly: '',
    energyLevel: '',
    grooming: '',
    healthIssues: '',
    intelligence: '',
    strangerFriendly: '',
    hairless: '',
    rare: '',
    shortLegs: '',
    hypoallergenic: '',
  });

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const filteredCats = cats.filter(cat => {
    const matchesSearchTerm = (cat.name ?? '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesName = (cat.name ?? '').toLowerCase().includes(filters.name.toLowerCase());
    const matchesWeightImperial = (cat.weight?.imperial ?? '').toLowerCase().includes(filters.weightImperial.toLowerCase());
    const matchesWeightMetric = (cat.weight?.metric ?? '').toLowerCase().includes(filters.weightMetric.toLowerCase());
    const matchesOrigin = (cat.origin ?? '').toLowerCase().includes(filters.origin.toLowerCase());
    const matchesDescription = (cat.description ?? '').toLowerCase().includes(filters.description.toLowerCase());
    const matchesLifeSpan = (cat.life_span ?? '').toLowerCase().includes(filters.lifeSpan.toLowerCase());
    const matchesTemperament = !filters.temperament || (cat.temperament ?? []).some(t => t.toLowerCase().includes(filters.temperament.toLowerCase()));
    const matchesIndoor = !filters.indoor || (cat.indoor ?? 0).toString() === filters.indoor;
    const matchesLap = !filters.lap || (cat.lap ?? 0).toString() === filters.lap;
    const matchesChildFriendly = !filters.childFriendly || (cat.child_friendly ?? 0).toString() === filters.childFriendly;
    const matchesDogFriendly = !filters.dogFriendly || (cat.dog_friendly ?? 0).toString() === filters.dogFriendly;
    const matchesEnergyLevel = !filters.energyLevel || (cat.energy_level ?? 0).toString() === filters.energyLevel;
    const matchesGrooming = !filters.grooming || (cat.grooming ?? 0).toString() === filters.grooming;
    const matchesHealthIssues = !filters.healthIssues || (cat.health_issues ?? 0).toString() === filters.healthIssues;
    const matchesIntelligence = !filters.intelligence || (cat.intelligence ?? 0).toString() === filters.intelligence;
    const matchesStrangerFriendly = !filters.strangerFriendly || (cat.stranger_friendly ?? 0).toString() === filters.strangerFriendly;
    const matchesHairless = !filters.hairless || (cat.hairless ?? 0).toString() === filters.hairless;
    const matchesRare = !filters.rare || (cat.rare ?? 0).toString() === filters.rare;
    const matchesShortLegs = !filters.shortLegs || (cat.short_legs ?? 0).toString() === filters.shortLegs;
    const matchesHypoallergenic = !filters.hypoallergenic || (cat.hypoallergenic ?? 0).toString() === filters.hypoallergenic;

    return matchesSearchTerm && matchesName && matchesWeightImperial && matchesWeightMetric && 
           matchesTemperament && matchesOrigin && matchesDescription && matchesLifeSpan &&
           matchesIndoor && matchesLap && matchesChildFriendly && matchesDogFriendly &&
           matchesEnergyLevel && matchesGrooming && matchesHealthIssues && matchesIntelligence &&
           matchesStrangerFriendly && matchesHairless && matchesRare && matchesShortLegs &&
           matchesHypoallergenic;
  });

  return (
    <div className="cat-table-wrapper">
      <table className="cat-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Weight (Imperial)</th>
            <th>Weight (Metric)</th>
            <th>Temperament</th>
            <th>Origin</th>
            <th>Description</th>
            <th>Life Span</th>
            <th>Indoor</th>
            <th>Lap</th>
            <th>Child Friendly</th>
            <th>Dog Friendly</th>
            <th>Energy Level</th>
            <th>Grooming</th>
            <th>Health Issues</th>
            <th>Intelligence</th>
            <th>Stranger Friendly</th>
            <th>Hairless</th>
            <th>Rare</th>
            <th>Short Legs</th>
            <th>Hypoallergenic</th>
            <th>Actions</th>
          </tr>
          <tr className="filter-row">
            <th></th>
            <th><input type="text" placeholder="Filter name" value={filters.name} onChange={(e) => handleFilterChange('name', e.target.value)} className="filter-input" /></th>
            <th><input type="text" placeholder="Filter" value={filters.weightImperial} onChange={(e) => handleFilterChange('weightImperial', e.target.value)} className="filter-input" /></th>
            <th><input type="text" placeholder="Filter" value={filters.weightMetric} onChange={(e) => handleFilterChange('weightMetric', e.target.value)} className="filter-input" /></th>
            <th><input type="text" placeholder="Filter" value={filters.temperament} onChange={(e) => handleFilterChange('temperament', e.target.value)} className="filter-input" /></th>
            <th><input type="text" placeholder="Filter" value={filters.origin} onChange={(e) => handleFilterChange('origin', e.target.value)} className="filter-input" /></th>
            <th><input type="text" placeholder="Filter" value={filters.description} onChange={(e) => handleFilterChange('description', e.target.value)} className="filter-input" /></th>
            <th><input type="text" placeholder="Filter" value={filters.lifeSpan} onChange={(e) => handleFilterChange('lifeSpan', e.target.value)} className="filter-input" /></th>
            <th><input type="number" placeholder="0-5" min="0" max="5" value={filters.indoor} onChange={(e) => handleFilterChange('indoor', e.target.value)} className="filter-input" /></th>
            <th><input type="number" placeholder="0-5" min="0" max="5" value={filters.lap} onChange={(e) => handleFilterChange('lap', e.target.value)} className="filter-input" /></th>
            <th><input type="number" placeholder="0-5" min="0" max="5" value={filters.childFriendly} onChange={(e) => handleFilterChange('childFriendly', e.target.value)} className="filter-input" /></th>
            <th><input type="number" placeholder="0-5" min="0" max="5" value={filters.dogFriendly} onChange={(e) => handleFilterChange('dogFriendly', e.target.value)} className="filter-input" /></th>
            <th><input type="number" placeholder="0-5" min="0" max="5" value={filters.energyLevel} onChange={(e) => handleFilterChange('energyLevel', e.target.value)} className="filter-input" /></th>
            <th><input type="number" placeholder="0-5" min="0" max="5" value={filters.grooming} onChange={(e) => handleFilterChange('grooming', e.target.value)} className="filter-input" /></th>
            <th><input type="number" placeholder="0-5" min="0" max="5" value={filters.healthIssues} onChange={(e) => handleFilterChange('healthIssues', e.target.value)} className="filter-input" /></th>
            <th><input type="number" placeholder="0-5" min="0" max="5" value={filters.intelligence} onChange={(e) => handleFilterChange('intelligence', e.target.value)} className="filter-input" /></th>
            <th><input type="number" placeholder="0-5" min="0" max="5" value={filters.strangerFriendly} onChange={(e) => handleFilterChange('strangerFriendly', e.target.value)} className="filter-input" /></th>
            <th><input type="number" placeholder="0-1" min="0" max="1" value={filters.hairless} onChange={(e) => handleFilterChange('hairless', e.target.value)} className="filter-input" /></th>
            <th><input type="number" placeholder="0-1" min="0" max="1" value={filters.rare} onChange={(e) => handleFilterChange('rare', e.target.value)} className="filter-input" /></th>
            <th><input type="number" placeholder="0-1" min="0" max="1" value={filters.shortLegs} onChange={(e) => handleFilterChange('shortLegs', e.target.value)} className="filter-input" /></th>
            <th><input type="number" placeholder="0-1" min="0" max="1" value={filters.hypoallergenic} onChange={(e) => handleFilterChange('hypoallergenic', e.target.value)} className="filter-input" /></th>
            <th></th>
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
    </div>
  );
};

export default CatTable;