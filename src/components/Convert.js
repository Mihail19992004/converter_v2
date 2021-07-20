import React, { useEffect, useState, useRef } from 'react';

export function Convert({
  isAuth,
  length, user,
  setFirst,
  setValueLeftBar,
    strory,
    setStory,
  valueLeftBar,
}) {
  const [firsInput, setFirstImp] = useState([]);

  const [result, setResult] = useState(0);
  const [state, setState] = useState(length[1]);
  const [secondState, setSecondState] = useState(length[2]);

  const [disabled, setDisabled] = useState(0);

  function changeFirstInput(e) {
    setFirstImp(e.target.value);
  }
  useEffect(() => {
    console.log(state);
  }, []);
 async  function startConvert() {

    console.log(state[1].Value);
    console.log(secondState[1].Value);
    setResult(+((firsInput * state[1].Value) / (+secondState[1].Value)).toFixed(2));
     if (isAuth) {
         const res = await fetch('http://localhost:5000/history', {
             method: 'POST',

             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 name: user.name,
                 history: {
                     to: state[1].Name,
                     from: secondState[1].Name,
                     value: firsInput,
                     result: +((firsInput * state[1].Value) / (+secondState[1].Value)).toFixed(2),
                     date: Date.now()

                 }
             })
         })
         const dt = await res.text()
         setStory(JSON.parse(dt).history)
     }

  }

  function changeFirstSelect(e) {
    setState(length[e.target.value]);
    setDisabled(e.target.value);

    setFirst(e.target.value);
  }
  function changeSecondSelect(e) {
    setValueLeftBar(e.target.value);
    setSecondState(valueLeftBar);
    console.log('cov', length[e.target.value]);
  }

  useEffect(() => {
    setSecondState(length[valueLeftBar])


  }, [valueLeftBar]);
  return (
    <section>
      <div className="container">
        <input type="number" min="0" onChange={changeFirstInput} />
        <select onChange={changeFirstSelect}>
          {length.length === 34 ? (
            length.map((e, i) => (
              <option id={i} value={i}>
                {e[1].Name}
              </option>
            ))
          ) : (
            <option>Netu</option>
          )}
        </select>
        <select onChange={changeSecondSelect} value={valueLeftBar ? valueLeftBar : null}>
          {length.length === 34 ? (
            length.map((e, i) => (i !== disabled ? <option value={i}>{e[1].Name}</option> : null))
          ) : (
            <option>Netu</option>
          )}
        </select>
        <div className="start">
          <button onClick={startConvert}>Конвертировать</button>
        </div>
        <p>{result !== 0 ? `${result}` : ''}</p>
      </div>
    </section>
  );
}
