import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CarList = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('/api/cars');
                setCars(response.data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        };

        fetchCars();
    }, []);

    return (
        <div>
            <h2>Cars List</h2>
            <ul>
                {cars.map((car) => (
                    <li key={car.id}>
                        <Link to={`/cars/${car.id}`}>{car.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CarList;
