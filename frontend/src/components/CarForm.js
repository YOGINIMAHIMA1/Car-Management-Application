import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CarForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/cars', {
                title, description, tags: tags.split(','), images: images.split(',')
            });
            navigate('/');
        } catch (error) {
            console.error('Error adding car:', error);
        }
    };

    return (
        <div>
            <h2>Add Car</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Car Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div>
                    <label>Tags (comma separated):</label>
                    <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
                </div>
                <div>
                    <label>Image URLs (comma separated):</label>
                    <input type="text" value={images} onChange={(e) => setImages(e.target.value)} />
                </div>
                <button type="submit">Add Car</button>
            </form>
        </div>
    );
};

export default CarForm;
