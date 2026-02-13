import React, { useState } from 'react';
import CatTable from './CatTable/CatTable';
import CreateCatModal from './Modals/CreateCatModal';
import EditCatModal from './Modals/EditCatModal';
import SearchBar from './SearchBar/SearchBar';
import { Cat } from '../types/Cat';
import useCatData from '../hooks/useCatData';

const App: React.FC = () => {
    const { cats, createCat, updateCat, deleteCat } = useCatData();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCat, setSelectedCat] = useState<Cat | null>(null);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
    };

    const handleEditCat = (cat: Cat) => {
        setSelectedCat(cat);
        setEditModalOpen(true);
    };

    const filteredCats = cats.filter(cat => 
        (cat.name ?? '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalCats = cats.length;
    const filteredCount = filteredCats.length;

    return (
        <div className="app">
            <header className="app-header">
                <div className="title-wrap">
                    <span className="eyebrow">Feline registry</span>
                    <h1 className="app-title">Cat Data App</h1>
                    <p className="app-subtitle">Browse breed profiles, scan temperaments, and keep your favorite cats organized.</p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-primary" onClick={() => setCreateModalOpen(true)}>Add Cat</button>
                </div>
            </header>

            <section className="content-card">
                <div className="toolbar">
                    <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
                    <div className="stat-pill">Showing {filteredCount} of {totalCats}</div>
                </div>
                <CatTable 
                    cats={filteredCats} 
                    onEdit={handleEditCat} 
                    onDelete={deleteCat}
                    searchTerm={searchTerm}
                />
            </section>

            {isCreateModalOpen && (
                <CreateCatModal 
                    isOpen={isCreateModalOpen}
                    onClose={() => setCreateModalOpen(false)} 
                    onCreate={createCat} 
                />
            )}
            {isEditModalOpen && selectedCat && (
                <EditCatModal 
                    isOpen={isEditModalOpen}
                    catData={selectedCat} 
                    onClose={() => setEditModalOpen(false)} 
                    onSave={updateCat} 
                />
            )}
        </div>
    );
};

export default App;