import React, { useState, useCallback } from "react";
import "./index.css";

const Wheel = ({ items, onSelectItem }) => {
  const [counter, setCounter] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  const selectItem = useCallback(async () => {
    const selectedItemIndex = Math.floor(Math.random() * items.length);
    onSelectItem && onSelectItem(selectedItemIndex);
    setSelectedItem(selectedItemIndex);
    setCounter((currentCounter) => currentCounter + 1);
  }, [items, onSelectItem, selectedItem, counter]);

  const wheelVars = {
    "--nb-item": items.length,
    "--selected-item": selectedItem,
    "--counter": counter,
    // "--wheel-size": "100%",
    // "--wheel-color": "#da3768",
    // "--wheel-color": "green",
    // "--neutral-color": "black",
    // "--nb-turn": 5,
    "--spinning-duration": "4s",
  };
  const spinning = selectedItem !== null ? "spinning" : "";

  return (
    <div className="wheel-container">
      <div
        className={`wheel ${spinning}`}
        style={wheelVars}
        onClick={selectItem}
      >
        {items.map((item, index) => (
          <div
            className="wheel-item"
            key={index}
            style={{ "--item-nb": index }}
          >
            {item}
          </div>
        ))}
      </div>
      <div>{items[selectedItem]}</div>
      <div>
        <button onClick={selectItem}>Spin</button>
      </div>
    </div>
  );
};

export default Wheel;
