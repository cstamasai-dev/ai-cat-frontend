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
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
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
                    <label>
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </label>
                    <label>
                        Weight:
                        <input type="text" name="weight" value={formData.weight?.metric} onChange={handleChange} required />
                    </label>
                    <label>
                        Temperament:
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
                    </label>
                    <label>
                        Origin:
                        <input type="text" name="origin" value={formData.origin} onChange={handleChange} required />
                    </label>
                    <label>
                        Description:
                        <textarea name="description" value={formData.description} onChange={handleChange} required />
                    </label>
                    <label>
                        Life Span:
                        <input type="text" name="life_span" value={formData.life_span} onChange={handleChange} required />
                    </label>
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditCatModal;