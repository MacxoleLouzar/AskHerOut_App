const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1/dates';

export const saveDateDetails = async (payload) => {
    const response = await fetch(`${API_BASE}/addDate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error('Failed to save date');
    return response.json();
};
