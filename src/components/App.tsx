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

    return (
        <div>
            <h1>Cat Data App</h1>
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            <CatTable 
                cats={filteredCats} 
                onEdit={handleEditCat} 
                onDelete={deleteCat}
                searchTerm={searchTerm}
            />
            <button onClick={() => setCreateModalOpen(true)}>Add Cat</button>

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