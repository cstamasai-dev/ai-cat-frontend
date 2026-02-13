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

    useEffect(() => {
        if (catData) {
            setFormData(catData);
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData) {
            onSave(formData);
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
                        <input type="text" name="temperament" value={formData.temperament} onChange={handleChange} required />
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