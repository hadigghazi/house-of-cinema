import { useState } from "react";
import PropTypes from "prop-types";

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

const containerStyle = {
  display: "flex",
  gap: "16px",
  alignItems: "center",
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  messages: PropTypes.array,
  defaultRating: PropTypes.number,
  onSetRating: PropTypes.func,
};

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);
  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };
  function handleRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }
  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onClick={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}

function Star({ onClick, full, onHoverIn, onHoverOut, color, size }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };

  return (
    <span onClick={onClick} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut}>
      {full ? (
        <svg
          style={starStyle}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="100"
          height="100"
          fill={color}
          stroke={color}
        >
          <polygon points="12 2 15.09 9.5 23 10.36 17 15.39 19.18 22 12 17.77 4.82 22 7 15.39 1 10.36 8.91 9.5 12 2" />
        </svg>
      ) : (
        <svg
          style={starStyle}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="100"
          height="100"
          fill="none"
          stroke={color}
        >
          <polygon points="12 2 15.09 9.5 23 10.36 17 15.39 19.18 22 12 17.77 4.82 22 7 15.39 1 10.36 8.91 9.5 12 2" />
        </svg>
      )}
    </span>
  );
}
