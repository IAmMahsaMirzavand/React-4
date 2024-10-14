import React, { useState } from 'react';


function RandomAdviceRenderin() {
  const [advice, setAdvice] = useState('');

  const fetchAdvice = async () => {
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json();
      setAdvice(data.slip.advice);
    } catch (error) {
      console.error('Error fetching advice:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">Random Advice</h1>

      <div className="card">
        <div className="card-body">
          <p className="card-text" id="advice-text">
            {advice ? advice : 'Click the button to get a random advice'}
          </p>
        </div>
      </div>

      <button className="btn btn-primary mt-3" onClick={fetchAdvice}>
        New Advice
      </button>
    </div>
  );
}

export default RandomAdviceRenderin;
