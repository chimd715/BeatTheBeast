import React, { useState } from 'react';

const HealthReduction = ({ onHealthChange }) => {
    const [damage, setDamage] = useState(0);

    const handleChange = (e) => {
        setDamage(e.target.value);
    };

    const handleSubmit = () => {
        onHealthChange(damage);
    };

    return (
        <div>
            <span>Reduce Health: </span>
            <input type="number" onChange={handleChange} />
            <button onClick={handleSubmit}>Apply Damage</button>
        </div>
    );
};

export default HealthReduction;
