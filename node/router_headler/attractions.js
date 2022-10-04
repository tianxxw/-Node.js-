const exporess = require('express')
const db = require('../db/index')
const { getinfo } = require('../router_function/index')

exports.all = async(req,res)=>{
  const sql = 'select * from attractions limit 0,?'
  const data = await getinfo(sql,[Number.parseInt(req.body.page)],res)
  res.send({
   message:'获取成功',
   data
  })
}
//展示
exports.ma_all = async (req,res) =>{
 const sql = 'select * from attractions'
 const data = await getinfo(sql,[],res)
 res.send({
  message:'获取成功',
  data
 })
}
//展示所有
exports.search = async(req,res)=>{
 const sql = 'select * from attractions where title like ? limit 0,?'
 const data = await getinfo(sql,['%'+req.body.title+'%',req.body.page],res) 
 res.send({
  message:'搜索成功',
  data
 })
}
//搜索
exports.delete = async(req,res)=>{
 const sql = 'delete from attractions where id = ?'
 const data = await getinfo(sql,[req.body.id],res)
 res.send({
  message:'景点删除成功'
 })
}
//删除
exports.add = async(req,res)=>{
 const sql = 'insert into attractions (id,title,image,level,area,product,address,information,price,amount) values (?,?,?,?,?,?,?,?,?,?)'
 const data = await getinfo(sql,[null,req.body.title,req.body.image,req.body.level,req.body.area,req.body.product,req.body.address,req.body.information,req.body.price,req.body.amount],res)
 res.send({
  message:'景点添加成功'
 })
}
//添加
exports.update = async(req,res)=>{
  console.log(req.body);
 const sql = 'update attractions set title =?,image = ?,level = ?,area = ?,product = ?,address = ?,information = ?,price = ?,amount = ? where id = ?'
  const data = await getinfo(sql,[req.body.title,req.body.image,req.body.level,req.body.area,req.body.product,req.body.address,req.body.information,req.body.price,req.body.amount,req.body.id],res)
  res.send({
   message:'景点修改成功'
  })
}
//更新
exports.details = async (req,res)=> {
  const sql = 'select * from attractions where id = ?'
  const data = await getinfo(sql,[req.body.id],res)
  res.send({
   message:'景点查询成功',
   data
  })
 }
