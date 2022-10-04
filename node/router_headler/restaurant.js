const exporess = require('express')
const db = require('../db/index')
const { getinfo } = require('../router_function/index')

exports.all = async(req,res)=>{
 const sql = 'select * from restaurant limit 0,?'
 const data = await getinfo(sql,[Number.parseInt(req.body.page)],res)
 res.send({
  message:'获取成功',
  data
 })
}
//展示
exports.ma_all = async (req,res) =>{
const sql = 'select * from restaurant'
const data = await getinfo(sql,[],res)
res.send({
 message:'获取成功',
 data
})
}
//展示所有
exports.search = async(req,res)=>{
const sql = 'select * from restaurant where name like ? limit 0,?'
const data = await getinfo(sql,['%'+req.body.name+'%',req.body.page],res) 
res.send({
 message:'搜索成功',
 data
})
}
//搜索
exports.delete = async(req,res)=>{
const sql = 'delete from restaurant where id = ?'
const data = await getinfo(sql,[req.body.id],res)
res.send({
 message:'餐厅删除成功'
})
}
//删除
exports.add = async(req,res)=>{
const sql = 'insert into restaurant (id,name,link,image,address,price,score,comment) values (?,?,?,?,?,?,?,?)'
const data = await getinfo(sql,[null,req.body.name,req.body.link,req.body.image,req.body.address,req.body.price,req.body.score,req.body.comment],res)
res.send({
 message:'餐厅添加成功'
})
}
//添加
exports.update = async(req,res)=>{
const sql = 'update restaurant set name = ?,link = ?,image = ?,address = ?,price = ?,score = ?,comment = ? where id = ?'
 const data = await getinfo(sql,[req.body.name,req.body.link,req.body.image,req.body.address,req.body.price,req.body.score,req.body.comment,req.body.id],res)
 res.send({
  message:'餐厅修改成功'
 })
}
//更新
exports.details = async (req,res)=> {
 const sql = 'select * from restaurant where id = ?'
 const data = await getinfo(sql,[Number.parseInt(req.body.id)],res)
 res.send({
  message:'餐厅查询成功',
  data
 })
}
