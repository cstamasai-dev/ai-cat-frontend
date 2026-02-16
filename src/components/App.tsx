import React, { useState } from 'react';
import CatTable from './CatTable/CatTable';
import CreateCatModal from './Modals/CreateCatModal';
import EditCatModal from './Modals/EditCatModal';
import { Cat } from '../types/Cat';
import useCatData from '../hooks/useCatData';

const App: React.FC = () => {
    const { cats, createCat, updateCat, deleteCat } = useCatData();
    const [filteredCount, setFilteredCount] = useState(0);
    const [selectedCat, setSelectedCat] = useState<Cat | null>(null);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const handleEditCat = (cat: Cat) => {
        setSelectedCat(cat);
        setEditModalOpen(true);
    };

    const totalCats = cats.length;

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
                    <div className="stat-pill">Showing {filteredCount} out of {totalCats}</div>
                </div>
                <CatTable 
                    cats={cats} 
                    onEdit={handleEditCat} 
                    onDelete={deleteCat}
                    onFilteredCount={setFilteredCount}
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