import React, { useState } from 'react';
import { Cat } from '../../types/Cat';

interface CreateCatModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (cat: Cat) => void;
}

const CreateCatModal: React.FC<CreateCatModalProps> = ({ isOpen, onClose, onCreate }) => {
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [temperament, setTemperament] = useState('');
    const [origin, setOrigin] = useState('');
    const [description, setDescription] = useState('');
    const [lifeSpan, setLifeSpan] = useState('');
    const [friendliness, setFriendliness] = useState(0);
    const [grooming, setGrooming] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newCat: Cat = {
            id: Math.random(), // Simple ID generation
            name,
            weight: {
                imperial: weight,
                metric: weight,
            },
            breed_group: null,
            cfa_url: null,
            vetstreet_url: null,
            vcahospitals_url: null,
            temperament,
            origin,
            country_codes: '',
            country_code: '',
            description,
            life_span: lifeSpan,
            indoor: 0,
            lap: 0,
            alt_names: '',
            adaptability: 0,
            affection_level: 0,
            child_friendly: 0,
            dog_friendly: 0,
            energy_level: 0,
            grooming,
            health_issues: 0,
            intelligence: 0,
            shedding_level: 0,
            social_needs: 0,
            stranger_friendly: friendliness,
            vocalisation: 0,
            experimental: 0,
            hairless: 0,
            natural: 0,
            rare: 0,
            rex: 0,
            suppressed_tail: 0,
            short_legs: 0,
            wikipedia_url: null,
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
                    <input type="text" placeholder="Temperament" value={temperament} onChange={(e) => setTemperament(e.target.value)} required />
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