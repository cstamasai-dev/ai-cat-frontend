import React, { useState } from 'react';
import { Cat } from '../../types/Cat';
import './Modals.css';

interface CreateCatModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (cat: Cat) => void;
}

const CreateCatModal: React.FC<CreateCatModalProps> = ({ isOpen, onClose, onCreate }) => {
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [temperamentInput, setTemperamentInput] = useState('');
    const [temperamentList, setTemperamentList] = useState<string[]>([]);
    const [origin, setOrigin] = useState('');
    const [description, setDescription] = useState('');
    const [lifeSpan, setLifeSpan] = useState('');
    const [friendliness, setFriendliness] = useState(0);
    const [grooming, setGrooming] = useState(0);

    const addTemperament = () => {
        const value = temperamentInput.trim();
        if (!value) {
            return;
        }
        if (temperamentList.some(item => item.toLowerCase() === value.toLowerCase())) {
            setTemperamentInput('');
            return;
        }
        setTemperamentList(prev => [...prev, value]);
        setTemperamentInput('');
    };

    const removeTemperament = (value: string) => {
        setTemperamentList(prev => prev.filter(item => item !== value));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const pending = temperamentInput.trim();
        const finalTemperaments = [...temperamentList];
        if (pending && !finalTemperaments.some(item => item.toLowerCase() === pending.toLowerCase())) {
            finalTemperaments.push(pending);
        }
        const newCat: Cat = {
            id: Math.random(), // Simple ID generation
            name,
            weight: {
                imperial: weight,
                metric: weight,
            },
            temperament: finalTemperaments,
            origin,
            description,
            life_span: lifeSpan,
            indoor: 0,
            lap: 0,
            child_friendly: 0,
            dog_friendly: 0,
            energy_level: 0,
            grooming,
            health_issues: 0,
            intelligence: 0,
            stranger_friendly: friendliness,
            hairless: 0,
            rare: 0,
            short_legs: 0,
            hypoallergenic: 0,
            reference_image_id: '',
        };
        onCreate(newCat);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Create New Cat</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type="text" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} required />
                    <div className="temperament-input-row">
                        <input
                            type="text"
                            placeholder="Temperament"
                            value={temperamentInput}
                            onChange={(e) => setTemperamentInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addTemperament();
                                }
                            }}
                        />
                        <button type="button" className="temperament-add" onClick={addTemperament}>Add</button>
                    </div>
                    {temperamentList.length > 0 && (
                        <div className="temperament-list">
                            {temperamentList.map(value => (
                                <span key={value} className="temperament-chip">
                                    {value}
                                    <button
                                        type="button"
                                        className="temperament-remove"
                                        onClick={() => removeTemperament(value)}
                                        aria-label={`Remove ${value}`}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                    <input type="text" placeholder="Origin" value={origin} onChange={(e) => setOrigin(e.target.value)} required />
                    <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <input type="text" placeholder="Life Span" value={lifeSpan} onChange={(e) => setLifeSpan(e.target.value)} required />
                    <input type="number" placeholder="Friendliness" value={friendliness} onChange={(e) => setFriendliness(Number(e.target.value))} required />
                    <input type="number" placeholder="Grooming" value={grooming} onChange={(e) => setGrooming(Number(e.target.value))} required />
                    <button type="submit">Create</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default CreateCatModal;