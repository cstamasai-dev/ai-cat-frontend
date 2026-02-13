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
    const [weightImperial, setWeightImperial] = useState('');
    const [weightMetric, setWeightMetric] = useState('');
    const [temperamentInput, setTemperamentInput] = useState('');
    const [temperamentList, setTemperamentList] = useState<string[]>([]);
    const [origin, setOrigin] = useState('');
    const [description, setDescription] = useState('');
    const [lifeSpan, setLifeSpan] = useState('');
    const [referenceImageId, setReferenceImageId] = useState('');
    const [indoor, setIndoor] = useState(0);
    const [lap, setLap] = useState(0);
    const [childFriendly, setChildFriendly] = useState(0);
    const [dogFriendly, setDogFriendly] = useState(0);
    const [energyLevel, setEnergyLevel] = useState(0);
    const [grooming, setGrooming] = useState(0);
    const [healthIssues, setHealthIssues] = useState(0);
    const [intelligence, setIntelligence] = useState(0);
    const [strangerFriendly, setStrangerFriendly] = useState(0);
    const [hairless, setHairless] = useState(0);
    const [rare, setRare] = useState(0);
    const [shortLegs, setShortLegs] = useState(0);
    const [hypoallergenic, setHypoallergenic] = useState(0);

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
            id: Math.floor(Math.random() * 100000),
            name: name || undefined,
            weight: {
                imperial: weightImperial || undefined,
                metric: weightMetric || undefined,
            },
            temperament: finalTemperaments,
            origin: origin || undefined,
            description: description || undefined,
            life_span: lifeSpan || undefined,
            reference_image_id: referenceImageId || undefined,
            indoor: indoor || undefined,
            lap: lap || undefined,
            child_friendly: childFriendly || undefined,
            dog_friendly: dogFriendly || undefined,
            energy_level: energyLevel || undefined,
            grooming: grooming || undefined,
            health_issues: healthIssues || undefined,
            intelligence: intelligence || undefined,
            stranger_friendly: strangerFriendly || undefined,
            hairless: hairless || undefined,
            rare: rare || undefined,
            short_legs: shortLegs || undefined,
            hypoallergenic: hypoallergenic || undefined,
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
                    {/* Basic Info */}
                    <fieldset>
                        <legend>Basic Information</legend>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="text" placeholder="Origin" value={origin} onChange={(e) => setOrigin(e.target.value)} />
                        <input type="text" placeholder="Life Span" value={lifeSpan} onChange={(e) => setLifeSpan(e.target.value)} />
                    </fieldset>

                    {/* Weight */}
                    <fieldset>
                        <legend>Weight</legend>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <input type="text" placeholder="Weight (Imperial)" value={weightImperial} onChange={(e) => setWeightImperial(e.target.value)} />
                            <input type="text" placeholder="Weight (Metric)" value={weightMetric} onChange={(e) => setWeightMetric(e.target.value)} />
                        </div>
                    </fieldset>

                    {/* Description */}
                    <fieldset>
                        <legend>Description & Image</legend>
                        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        <input type="text" placeholder="Reference Image ID" value={referenceImageId} onChange={(e) => setReferenceImageId(e.target.value)} />
                    </fieldset>

                    {/* Temperament */}
                    <fieldset>
                        <legend>Temperament</legend>
                        <div className="temperament-input-row">
                            <input
                                type="text"
                                placeholder="Add temperament trait"
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
                    </fieldset>

                    {/* Personality Traits (0-5 scale) */}
                    <fieldset>
                        <legend>Personality Traits (0-5 scale)</legend>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                            <label>
                                Indoor
                                <input type="number" min="0" max="5" value={indoor} onChange={(e) => setIndoor(Number(e.target.value))} />
                            </label>
                            <label>
                                Lap
                                <input type="number" min="0" max="5" value={lap} onChange={(e) => setLap(Number(e.target.value))} />
                            </label>
                            <label>
                                Child Friendly
                                <input type="number" min="0" max="5" value={childFriendly} onChange={(e) => setChildFriendly(Number(e.target.value))} />
                            </label>
                            <label>
                                Dog Friendly
                                <input type="number" min="0" max="5" value={dogFriendly} onChange={(e) => setDogFriendly(Number(e.target.value))} />
                            </label>
                            <label>
                                Energy Level
                                <input type="number" min="0" max="5" value={energyLevel} onChange={(e) => setEnergyLevel(Number(e.target.value))} />
                            </label>
                            <label>
                                Grooming
                                <input type="number" min="0" max="5" value={grooming} onChange={(e) => setGrooming(Number(e.target.value))} />
                            </label>
                            <label>
                                Health Issues
                                <input type="number" min="0" max="5" value={healthIssues} onChange={(e) => setHealthIssues(Number(e.target.value))} />
                            </label>
                            <label>
                                Intelligence
                                <input type="number" min="0" max="5" value={intelligence} onChange={(e) => setIntelligence(Number(e.target.value))} />
                            </label>
                            <label>
                                Stranger Friendly
                                <input type="number" min="0" max="5" value={strangerFriendly} onChange={(e) => setStrangerFriendly(Number(e.target.value))} />
                            </label>
                        </div>
                    </fieldset>

                    {/* Special Characteristics */}
                    <fieldset>
                        <legend>Special Characteristics</legend>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                            <label className="checkbox-label">
                                <input type="checkbox" checked={hairless === 1} onChange={(e) => setHairless(e.target.checked ? 1 : 0)} />
                                Hairless
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" checked={rare === 1} onChange={(e) => setRare(e.target.checked ? 1 : 0)} />
                                Rare
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" checked={shortLegs === 1} onChange={(e) => setShortLegs(e.target.checked ? 1 : 0)} />
                                Short Legs
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" checked={hypoallergenic === 1} onChange={(e) => setHypoallergenic(e.target.checked ? 1 : 0)} />
                                Hypoallergenic
                            </label>
                        </div>
                    </fieldset>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        <button type="submit" className="btn btn-primary">Create</button>
                        <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCatModal;