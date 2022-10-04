const exporess = require('express')
const db = require('../db/index')
const { getinfo } = require('../router_function/index')

exports.all = async(req,res)=>{
 const sql = 'select * from hotel limit 0,?'
 const data = await getinfo(sql,[Number.parseInt(req.body.page)],res)
 res.send({
  message:'获取成功',
  data
 })
}
//展示
exports.ma_all = async (req,res) =>{
const sql = 'select * from hotel'
const data = await getinfo(sql,[],res)
res.send({
 message:'获取成功',
 data
})
}
//展示所有
exports.search = async(req,res)=>{
const sql = 'select * from hotel where name like ? limit 0,?'
const data = await getinfo(sql,['%'+req.body.name+'%',req.body.page],res) 
res.send({
 message:'搜索成功',
 data
})
}
//搜索
exports.delete = async(req,res)=>{
const sql = 'delete from hotel where id = ?'
const data = await getinfo(sql,[req.body.id],res)
res.send({
 message:'酒店删除成功'
})
}
//删除
exports.add = async(req,res)=>{
const sql = 'insert into hotel (id,link,image,name,assess,score) values (?,?,?,?,?,?)'
const data = await getinfo(sql,[null,req.body.link,req.body.image,req.body.name,req.body.assess,req.body.score],res)
res.send({
 message:'酒店添加成功'
})
}
//添加
exports.update = async(req,res)=>{
const sql = 'update into set link =?,image = ?,name = ?,assess = ?,score = ? where id = ?'
 const data = await getinfo(sql,[req.body.link,req.body.image,req.body.name,req.body.assess,req.body.score,req.body.id],res)
 res.send({
  message:'酒店修改成功'
 })
}
exports.details = async (req,res)=> {
 const sql = 'select * from hotel where id = ?'
 const data = await getinfo(sql,[req.body.id],res)
 res.send({
  message:'酒店查询成功',
  data
 })
}