// console.log("hello")
const express=require('express')
const app=express()
const morgan=require('morgan')

app.use(express.json())



app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))


morgan.token('data', function (req, res) { return JSON.stringify(req.body) })

let phonebook=[
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  },
  { 
    "id": "5",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/info',(req,res)=>{
  res.send(`<p>Phonebook has info for ${phonebook.length} people</p><p>${new Date()}</p>`)
})
app.get('/api/persons',(req,res)=>{
  res.json(phonebook)
})
app.post('/api/persons',(req,res)=>{
  const id= Math.floor(Math.random()*9000)
  const body = req.body
   if(!body.name && !body.number){
    return res.status(400).json({
      error:'name and number is missing'
    })
  }
  if(!body.name){
    return res.status(400).json({
      error:'name is missing'
    })
  }
  if(!body.number){
    return res.status(400).json({
     error:' number is missing'
    })
  }
  entry={
    id: id.toString(),
    name:body.name,
    number:body.number
  }
  // console.log(entry)
  // console.log(req.headers)
  phonebook= phonebook.concat(entry)
 

})



app.get('/api/persons/:id',(req,res)=>{
  const id= req.params.id
  const entry=phonebook[id-1]
  if (entry){
    res.send(entry)
  }
  else{
    res.status(404).end()
  }
 
})

app.delete('/api/persons/:id',(req,res)=>{
  const id= req.params.id
 phonebook= phonebook.filter(entry=>entry.id!==id)
  res.status(204).end
})




const port=3001
app.listen(port,()=>{
  console.log(`server running on port ${port}`)
})
