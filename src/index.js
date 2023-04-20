const express = require('express');
const app = express();

const generateImage = require('./genrateImage.js')
app.use(express.json());       
app.use(express.urlencoded()); 

app.post('/', async (req, res) => {
    const path = await generateImage(req.body.currency, req.body.graphics) 
    res.sendFile(path)     
    
})


app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`)
  })
  






  




















