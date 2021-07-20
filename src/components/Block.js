import React from 'react';

export function Block({ res, setSubmitValute, submitValute, mass, handleValueLeftBar }) {
  const handleChoice = () => {
    setSubmitValute(res.Name);
    handleValueLeftBar(mass);
  };
  return (
    <section onClick={handleChoice}>
      <div className={submitValute === res.Name ? 'block active' : 'block'}>
        <div className='name-valute'>
          <h3>{res.Name}</h3>
        </div>

        <div className="group">
          <div className="valute-min">
            <p className="min-front">curent value:</p>
            <p>{res.Value.toFixed(2)} руб</p>
          </div>

          {submitValute === res.Name && (
            <div className="valute-min">
              <p className="min-front">previous value:</p>
              <p>{res.Previous.toFixed(2)} rub</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
