const exporess = require('express')
const db = require('../db/index')
const { getinfo } = require('../router_function/index')

exports.all = async (req,res) => {
 const sql = 'select * from notes limit 0,?'
 const data = await getinfo(sql,[Number.parseInt(req.body.page)],res)
 res.send({
  message:'获取成功',
  data
 })
}
//一部分
exports.ma_all = async (req,res) => {
 const sql = 'select * from notes'
 const data = await getinfo(sql,[],res)
 res.send({
  message:'获取成功',
  data
 })
}
//所有
exports.delete = async (req,res) =>{
 const sql = 'delete from notes where id = ?'
 const data = await getinfo(sql,[req.body.id],res)
 res.send({
  message:'游记删除成功'
 })
}
//删除
exports.add = async (req,res) => {
 const sql = 'insert into notes (id,link,image,title,assess,score) values (?,?,?,?,?,?)'
 const data = await getinfo(sql,[null,req.body.link,req.body.image,req.body.title,req.body.assess,req.body.socre],res)
 res.send({
  message:'游记添加成功'
 })
}
//添加
exports.search = async (req,res) => {
 const sql = 'select * from notes where title like ? limit 0,?'
 const data = await getinfo(sql,['%'+req.body.title+'%',req.body.page],res) 
 res.send({
  message:'搜索成功',
  data
 })
}
//搜索
exports.update = async (req,res) =>{
 const sql = 'update notes set link = ?,image = ?,title = ?,assess = ?,score = ? where id = ?'
  const data = await getinfo(sql,[req.body.link,req.body.image,req.body.title,req.body.assess,req.body.score,req.body.id],res)
  res.send({
   message:'游记修改成功'
  })
}
//更新
exports.details = async (req,res)=> {
  const sql = 'select * from notes where id = ?'
  const data = await getinfo(sql,[req.body.id],res)
  res.send({
   message:'游记查询成功',
   data
  })
 }