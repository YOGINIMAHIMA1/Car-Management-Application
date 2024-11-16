import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CarDetail = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCarDetail = async () => {
            try {
                const response = await axios.get(`/api/cars/${id}`);
                setCar(response.data);
            } catch (error) {
                console.error('Error fetching car details:', error);
                navigate('/');
            }
        };

        fetchCarDetail();
    }, [id, navigate]);

    if (!car) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>{car.title}</h2>
            <p>{car.description}</p>
            <h3>Tags:</h3>
            <ul>
                {car.tags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                ))}
            </ul>
            <h3>Images:</h3>
            {car.images.map((image, index) => (
                <img key={index} src={image} alt={car.title} width="200" />
            ))}
        </div>
    );
};

export default CarDetail;
