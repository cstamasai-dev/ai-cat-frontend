import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Cat } from '../../types/Cat';
import TemperamentBadge from '../TemperamentBadge/TemperamentBadge';

interface CatTableRowProps {
    cat: Cat;
    onEdit: (cat: Cat) => void;
    onDelete: (id: number) => void;
}

const CatTableRow: React.FC<CatTableRowProps> = ({ cat, onEdit, onDelete }) => {
    const [isImageOpen, setImageOpen] = useState(false);
    const imageUrl = cat.reference_image_id
        ? `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`
        : '';

    return (
        <>
            <tr>
                <td>
                    {imageUrl ? (
                        <div className="cat-photo-wrap">
                            <button
                                className="cat-photo-button"
                                type="button"
                                onClick={() => setImageOpen(true)}
                                aria-label={`View ${cat.name ?? 'cat'} photo`}
                            >
                                <img
                                    className="cat-photo"
                                    src={imageUrl}
                                    alt={cat.name ? `${cat.name} cat` : 'Cat'}
                                    loading="lazy"
                                />
                            </button>
                            <div className="cat-photo-preview" role="tooltip">
                                <img
                                    className="cat-photo-preview-img"
                                    src={imageUrl}
                                    alt=""
                                    aria-hidden="true"
                                />
                            </div>
                        </div>
                    ) : (
                        <span className="cat-photo-placeholder">No image</span>
                    )}
                </td>
                <td>{cat.name ?? '—'}</td>
                <td>{cat.weight?.imperial ?? '—'}</td>
                <td>{cat.weight?.metric ?? '—'}</td>
                <td>
                    <TemperamentBadge temperament={cat.temperament ?? []} />
                </td>
                <td>{cat.origin ?? '—'}</td>
                <td className="description-cell">{cat.description ?? '—'}</td>
                <td>{cat.life_span ?? '—'}</td>
                <td>{cat.indoor ?? '—'}</td>
                <td>{cat.lap ?? '—'}</td>
                <td>{cat.child_friendly ?? '—'}</td>
                <td>{cat.dog_friendly ?? '—'}</td>
                <td>{cat.energy_level ?? '—'}</td>
                <td>{cat.grooming ?? '—'}</td>
                <td>{cat.health_issues ?? '—'}</td>
                <td>{cat.intelligence ?? '—'}</td>
                <td>{cat.stranger_friendly ?? '—'}</td>
                <td className="bool-cell">{(cat.hairless ?? 0) === 1 ? '✓' : '—'}</td>
                <td className="bool-cell">{(cat.rare ?? 0) === 1 ? '✓' : '—'}</td>
                <td className="bool-cell">{(cat.short_legs ?? 0) === 1 ? '✓' : '—'}</td>
                <td className="bool-cell">{(cat.hypoallergenic ?? 0) === 1 ? '✓' : '—'}</td>
                <td className="table-actions">
                    <button className="btn btn-ghost btn-sm" onClick={() => onEdit(cat)}>Edit</button>
                    <button className="btn btn-danger btn-sm" aria-label="Delete cat" onClick={() => onDelete(cat.id)}>🗑️</button>
                </td>
            </tr>
            {isImageOpen && imageUrl && createPortal(
                <div className="modal image-modal" role="dialog" aria-modal="true">
                    <div className="modal-content image-modal-content">
                        <div className="image-modal-header">
                            <h2>{cat.name ?? 'Cat photo'}</h2>
                            <button
                                type="button"
                                className="image-modal-close"
                                onClick={() => setImageOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                        <img className="image-modal-photo" src={imageUrl} alt={cat.name ?? 'Cat'} />
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default CatTableRow;