import React, { useState } from 'react';

const MonsterModal = ({ onSave }) => {
    const [monsterData, setMonsterData] = useState({
        image: '',
        strength: '',
        level: '',
        health: '',
    });

    const handleChange = (e) => {
        setMonsterData({ ...monsterData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        localStorage.setItem('monsterData', JSON.stringify(monsterData));
        onSave(monsterData);
    };

    return (
        <div>
            {/* Modal content here */}
            <input type="text" name="image" placeholder="Image URL" onChange={handleChange} />
            <input type="number" name="strength" placeholder="Strength" onChange={handleChange} />
            <input type="number" name="level" placeholder="Level" onChange={handleChange} />
            <input type="number" name="health" placeholder="Health" onChange={handleChange} />
            <button onClick={handleSubmit}>Save Monster</button>
        </div>
    );
};

export default MonsterModal;
