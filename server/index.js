const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./UserModel.js')
const app = express()

app.use(cors())
app.use(express.json())
async function start() {
    await mongoose.connect('mongodb+srv://User:User@cluster0.nska2.mongodb.net/convertUsers?retryWrites=true&w=majority',
        {
            useUnifiedTopology: true,
            useFindAndModify: true
        }
        )
    app.listen(5000, ()=> console.log('started'))
}
app.post('/registration', async (req,res)=> {
    const {name, pass} = req.body
    const candidate = await User.findOne({name})
    if(candidate) {
        console.log(name)
       return  res.send('user est')
    }
    const user = new User({
        name,
        pass
    })
    await user.save()
    res.send('success')
})
app.post('/log', async (req,res)=> {
    const {name, pass} = req.body
    const candidate = await User.findOne({name})
    if(!name || !pass) {
        return res.status(400).send('bad data')
    }
    if(candidate) {
        if (candidate.pass !== pass) {
            console.log('ne tot pass')
            return res.status(400).send('err')

        }

        return  res.status(200).json(candidate)
    } else {
        return res.status(400).send('net usera')
    }

})
app.post('/history', async (req,res)=> {
    const {name, history} = req.body
    const candidate = await User.findOne({name})
    if(!candidate) {
        return res.status(400).send('bad data')
    }
    const dt = await User.findOneAndUpdate({name},  {'$push': {history},})
   console.log(dt)
    res.json(dt)


})
start()