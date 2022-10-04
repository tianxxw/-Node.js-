const exporess = require('express')
const db = require('../db/index')
const { getinfo } = require('../router_function/index')
exports.all = async (req,res)=>{
 const sql = 'select * from food limit 0,?'
 const data = await getinfo(sql,[Number.parseInt(req.body.page)],res)
 res.send({
  message:'获取成功',
  data
 })
}
//展示
exports.ma_all = async (req,res) =>{
 const sql = 'select * from food'
 const data = await getinfo(sql,[],res)
 res.send({
  message:'获取成功',
  data
 })
 }
//展示所有
exports.delete = async(req,res)=>{
 const sql = 'delete from food where id = ?'
 const data = await getinfo(sql,[req.body.id],res)
 res.send({
  message:'食物删除成功'
 })
}
//删除
exports.add = async(req,res) =>{
 const sql = 'insert into food (id,name,image,link,number,area,address) values (?,?,?,?,?,?,?)'
 const data = await getinfo(sql,[null,req.body.name,req.body.image,req.body.link,req.body.number,req.body.area,req.body.address],res)
 res.send({
  message:'食物添加成功'
 })
}
//添加
exports.search = async(req,res) =>{
 const sql = 'select * from food where name like ? '
 const data = await getinfo(sql,['%'+req.body.name+'%'],res) 
 res.send({
  message:'搜索成功',
  data
 })
}
//查找
exports.update = async(req,res) =>{
 const sql = 'update food set name =?,image = ?,link = ?,number = ?,area = ?,address = ? where id = ?'
 const data = await getinfo(sql,[req.body.name,req.body.image,req.body.link,req.body.number,req.body.area,req.body.address,req.body.id],res)
 res.send({
  message:'食物修改成功'
 })
}
//更新
exports.details = async (req,res)=> {
 const sql = 'select * from food where id = ?'
 const data = await getinfo(sql,[req.body.id],res)
 res.send({
  message:'食物查询成功',
  data
 })
}