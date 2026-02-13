import React, { useState, useEffect } from 'react';
import { Cat } from '../../types/Cat';
import './Modals.css';

interface EditCatModalProps {
    isOpen: boolean;
    onClose: () => void;
    catData: Cat | null;
    onSave: (updatedCat: Cat) => void;
}

const EditCatModal: React.FC<EditCatModalProps> = ({ isOpen, onClose, catData, onSave }) => {
    const [formData, setFormData] = useState<Cat | null>(null);
    const [temperamentInput, setTemperamentInput] = useState('');
    const [temperamentList, setTemperamentList] = useState<string[]>([]);

    useEffect(() => {
        if (catData) {
            setFormData(catData);
            setTemperamentList(catData.temperament ?? []);
            setTemperamentInput('');
        }
    }, [catData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (formData) {
            const { name, value } = e.target;
            
            if (name.startsWith('weight.')) {
                const weightField = name.split('.')[1];
                setFormData({
                    ...formData,
                    weight: {
                        ...formData.weight,
                        [weightField]: value,
                    },
                });
            } else {
                const numericFields = ['indoor', 'lap', 'child_friendly', 'dog_friendly', 'energy_level', 'grooming', 'health_issues', 'intelligence', 'stranger_friendly', 'hairless', 'rare', 'short_legs', 'hypoallergenic'];
                setFormData({
                    ...formData,
                    [name]: numericFields.includes(name) ? Number(value) : value,
                });
            }
        }
    };

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
        if (formData) {
            const pending = temperamentInput.trim();
            const finalTemperaments = [...temperamentList];
            if (pending && !finalTemperaments.some(item => item.toLowerCase() === pending.toLowerCase())) {
                finalTemperaments.push(pending);
            }
            onSave({
                ...formData,
                temperament: finalTemperaments,
            });
            onClose();
        }
    };

    if (!isOpen || !formData) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Edit Cat</h2>
                <form onSubmit={handleSubmit}>
                    {/* Basic Info */}
                    <fieldset>
                        <legend>Basic Information</legend>
                        <label>
                            Name
                            <input type="text" name="name" value={formData.name ?? ''} onChange={handleChange} />
                        </label>
                        <label>
                            Origin
                            <input type="text" name="origin" value={formData.origin ?? ''} onChange={handleChange} />
                        </label>
                        <label>
                            Life Span
                            <input type="text" name="life_span" value={formData.life_span ?? ''} onChange={handleChange} />
                        </label>
                    </fieldset>

                    {/* Weight */}
                    <fieldset>
                        <legend>Weight</legend>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <label>
                                Weight (Imperial)
                                <input type="text" name="weight.imperial" value={formData.weight?.imperial ?? ''} onChange={handleChange} />
                            </label>
                            <label>
                                Weight (Metric)
                                <input type="text" name="weight.metric" value={formData.weight?.metric ?? ''} onChange={handleChange} />
                            </label>
                        </div>
                    </fieldset>

                    {/* Description */}
                    <fieldset>
                        <legend>Description & Image</legend>
                        <label>
                            Description
                            <textarea name="description" value={formData.description ?? ''} onChange={handleChange} />
                        </label>
                        <label>
                            Reference Image ID
                            <input type="text" name="reference_image_id" value={formData.reference_image_id ?? ''} onChange={handleChange} />
                        </label>
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
                                <input type="number" min="0" max="5" name="indoor" value={formData.indoor ?? 0} onChange={handleChange} />
                            </label>
                            <label>
                                Lap
                                <input type="number" min="0" max="5" name="lap" value={formData.lap ?? 0} onChange={handleChange} />
                            </label>
                            <label>
                                Child Friendly
                                <input type="number" min="0" max="5" name="child_friendly" value={formData.child_friendly ?? 0} onChange={handleChange} />
                            </label>
                            <label>
                                Dog Friendly
                                <input type="number" min="0" max="5" name="dog_friendly" value={formData.dog_friendly ?? 0} onChange={handleChange} />
                            </label>
                            <label>
                                Energy Level
                                <input type="number" min="0" max="5" name="energy_level" value={formData.energy_level ?? 0} onChange={handleChange} />
                            </label>
                            <label>
                                Grooming
                                <input type="number" min="0" max="5" name="grooming" value={formData.grooming ?? 0} onChange={handleChange} />
                            </label>
                            <label>
                                Health Issues
                                <input type="number" min="0" max="5" name="health_issues" value={formData.health_issues ?? 0} onChange={handleChange} />
                            </label>
                            <label>
                                Intelligence
                                <input type="number" min="0" max="5" name="intelligence" value={formData.intelligence ?? 0} onChange={handleChange} />
                            </label>
                            <label>
                                Stranger Friendly
                                <input type="number" min="0" max="5" name="stranger_friendly" value={formData.stranger_friendly ?? 0} onChange={handleChange} />
                            </label>
                        </div>
                    </fieldset>

                    {/* Special Characteristics */}
                    <fieldset>
                        <legend>Special Characteristics</legend>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                            <label className="checkbox-label">
                                <input 
                                    type="checkbox" 
                                    name="hairless"
                                    checked={(formData.hairless ?? 0) === 1} 
                                    onChange={(e) => setFormData({ ...formData, hairless: e.target.checked ? 1 : 0 })} 
                                />
                                Hairless
                            </label>
                            <label className="checkbox-label">
                                <input 
                                    type="checkbox" 
                                    name="rare"
                                    checked={(formData.rare ?? 0) === 1} 
                                    onChange={(e) => setFormData({ ...formData, rare: e.target.checked ? 1 : 0 })} 
                                />
                                Rare
                            </label>
                            <label className="checkbox-label">
                                <input 
                                    type="checkbox" 
                                    name="short_legs"
                                    checked={(formData.short_legs ?? 0) === 1} 
                                    onChange={(e) => setFormData({ ...formData, short_legs: e.target.checked ? 1 : 0 })} 
                                />
                                Short Legs
                            </label>
                            <label className="checkbox-label">
                                <input 
                                    type="checkbox" 
                                    name="hypoallergenic"
                                    checked={(formData.hypoallergenic ?? 0) === 1} 
                                    onChange={(e) => setFormData({ ...formData, hypoallergenic: e.target.checked ? 1 : 0 })} 
                                />
                                Hypoallergenic
                            </label>
                        </div>
                    </fieldset>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        <button type="submit" className="btn btn-primary">Save</button>
                        <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCatModal;