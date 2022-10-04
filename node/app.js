const express = require('express')
const user = require('./router/user')
const attractions = require('./router/attractions')
const food = require('./router/food')
const hotel = require('./router/hotel')
const notes = require('./router/notes')
const restaurant = require('./router/restaurant')
const upload = require('./router/uploadGoodImg.js')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use((req, res, next) => {
res.cc = function(err, status = 1) {
     res.send({
         status,
         message: err instanceof Error ? err.message : err
     })
 }
 next()
})
app.use(express.static("goods_img"))
app.use('/user',user)
app.use('/attractions',attractions)
app.use('/food',food)
app.use('/hotel',hotel)
app.use('/notes',notes)
app.use('/restaurant',restaurant)
app.use('/img',upload)
//定义错误级别的中间件
app.listen(3020, () => {
 console.log('api server running at http://127.0.0.1:3020')
})