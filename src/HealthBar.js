import React, { useState } from 'react';

const HealthBar = ({ health, initialHealth }) => {
    const barStyle = {
        width: `${(health / initialHealth) * 100}%`,
    };

    return (
        <div style={{margin: "10px"}}>
            <span style={{verticalAlign: "top", margin: "10px"}}>체력</span>
            <div style={{ display: "inline-block", border: '1px solid black', width: '80%' }}>
                <div style={{ height: '20px', backgroundColor: 'red', ...barStyle }}></div>
            </div>
            <span style={{verticalAlign: "top", margin: "10px"}}>{health}/{initialHealth}</span>
        </div>
    );
};

export default HealthBar;
