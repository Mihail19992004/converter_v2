import './App.css';
import { Convert } from './components/Convert';
import React, { useEffect, useState } from 'react';
import { Block } from './components/Block';
import GitHubIcon from '@material-ui/icons/GitHub';
import {Auth} from "./components/Auth";

export function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState({
    name: '',
    pass: ''
  })
  const [story, setStory] = useState([])
  const [res, setRes] = useState([]);
  const [submitValute, setSubmitValute] = useState(false);
  const [first, setFirst] = useState('Австралийский доллар');
  const [second, setSecond] = useState(0);
  const getValue = async () => {
    const response = await fetch(`https://www.cbr-xml-daily.ru/daily_json.js`);
    const data = await response.json();
    await setRes(Object.entries(data.Valute));
  };

  const [valueLeftBar, setValueLeftBar] = useState(0);

  const handleValueLeftBar = (id) => {
    setValueLeftBar(id);
  };

  useEffect(() => {
    getValue();
  }, []);

  return (
    <div className="App">
      <header className="header">
        <h1>My converter</h1>
        <div className="git-hub">
          <a href="https://github.com/Mihail19992004" target='_blank'>
            <GitHubIcon />
          </a>

        </div>
      </header>
      <div className="flex-box">
        <div className="left-side">
          {res.length === 34 ? (
              <Convert
                  setStory={setStory} story={story}
                  user={user}
                  isAuth={isAuth} setIsAuth={setIsAuth}
                  valueLeftBar={valueLeftBar}
                  setSecond={setSecond}
                  first={first}
                  second={second}
                  setFirst={setFirst}
                  length={res}
                  setValueLeftBar={setValueLeftBar}
                  res={res[1]}
              />
          ) : (
              <div className="progress">
                <div className="indeterminate"></div>
              </div>
          )}
          <Auth user={user} setStory={setStory} story={story} isAuth={isAuth} setIsAuth={setIsAuth} setUser={setUser}/>
        </div>

        <div className="line"></div>
        <section className="conteiner-width">
          {res.map((e, i) => (
            <Block
              res={e[1]}
              setSubmitValute={setSubmitValute}
              submitValute={submitValute}
              mass={i}
              handleValueLeftBar={handleValueLeftBar}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

export default App;
