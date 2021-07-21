import React, {useState} from 'react'

export function Auth({user, setUser, isAuth, setIsAuth,story,setStory}) {


    async function getReg() {
        const res = await fetch('http://localhost:5000/registration', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        setUser({
            name: '',
            pass: ''
        })
    }
    async function getLog() {
        const res = await fetch('http://localhost:5000/log', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        if (res.ok) {
            const dt = await res.text()
            setStory(JSON.parse(dt).history)
            if (story.length) {
                setStory(story.reverse)
            }
            console.log(story)
            setIsAuth(true)
        }
    }
    console.log(story)

    function handleChange(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
        console.log(user)
    }
    return (


                     <div className="history">
                         {
                             !isAuth ? (
                                 <div>
                                     <h2>Войдите / Зарегестрируйтесь что бы увидеть историю запросов</h2>
                                     <p>Имя пользователя</p>
                                     <input type="text" value={user.name} name='name' onChange={handleChange}/>
                                     <p>Пароль</p>
                                     <input type="text" value={user.pass} name='pass' onChange={handleChange}/>
                                     <div className="buttons">
                                         <button onClick={getLog}>Войти</button>
                                         <button onClick={getReg}>Зарегестрироваться</button>
                                     </div>
                                 </div>

                             ) :
                                 <div className='isAuth'>
                                     <div onClick={()=> setIsAuth(false)} className="logout">
                                         <p>Log Out</p>
                                     </div>
                                     <h1>Привет, {user.name}</h1>
                                     <p>Твоя история запросов</p>
                                     <div className="scroll-history">
                                         {
                                             story?.length && story.map(e=> (
                                                 <div className='log-history'>
                                                     <div className="left-valute">
                                                         <p>Желаемая валюта</p>
                                                         <p>{e.to}</p>
                                                         <p>Изначальное значение</p>
                                                         <p>{e.value}</p>
                                                     </div>
                                                     <div className="right-valute">
                                                         <p>Изначальная валюта</p>
                                                         <p>{e.from}</p>
                                                         <p>Конечное значение</p>
                                                         <p>{e.result}</p>
                                                         <p>Дата</p>
                                                         <p>{e.date ? new Date(e.date).toString() : 'пока что нет даты'}</p>
                                                     </div>

                                                 </div>
                                             ))
                                         }
                                     </div>

                                 </div>

                         }

                     </div>



    )
}