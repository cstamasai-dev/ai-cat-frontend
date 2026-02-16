import { useState, useEffect } from 'react';
import { Cat } from '../types/Cat';
import sampleCats from '../data/sampleCats2.json';

const useCatData = () => {
    const [cats, setCats] = useState<Cat[]>(sampleCats);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCats = async () => {
            setLoading(true);
            try {
                // Simulate fetching data from an API
                const response = await new Promise<Cat[]>((resolve) => {
                    setTimeout(() => resolve(sampleCats), 1000);
                });
                setCats(response);
            } catch (err) {
                setError('Failed to fetch cat data');
            } finally {
                setLoading(false);
            }
        };

        fetchCats();
    }, []);

    const createCat = (newCat: Cat) => {
        setCats((prevCats) => [...prevCats, newCat]);
    };

    const updateCat = (updatedCat: Cat) => {
        setCats((prevCats) =>
            prevCats.map((cat) => (cat.id === updatedCat.id ? updatedCat : cat))
        );
    };

    const deleteCat = (catId: number) => {
        setCats((prevCats) => prevCats.filter((cat) => cat.id !== catId));
    };

    return { cats, loading, error, createCat, updateCat, deleteCat };
};

export default useCatData;