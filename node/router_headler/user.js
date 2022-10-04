const express = require('express');
const db = require('../db/index')
const { getinfo } = require('../router_function/index')

exports.login = async (req,res) => {
  const sql1 = 'select * from user where username = ?'
  const data = await getinfo(sql1,[req.body.username],res)
  if(req.body.password == data[0].password) {
   res.send({
    message:'登录成功',
    data:{
     'username':data[0].username,
     'nickname':data[0].nickname,
     'avatar':data[0].avatar,
     'type':data[0].type
    }
   })
  }else {
   res.send({
    message:'登录失败,账号或密码错误'
   })
  }
}
// 登录
// 参数 username,password
exports.register = (req,res)=>{
  const sql1 = 'select * from user where username = ?'
  const sql2 = 'insert into user value(?,?,?,?,?,?)'
  const avatar = 'http://127.0.0.1:3020/7a562ca8e42b1dc6.jpg'
  db.query(sql1,[req.body.username],(err,result)=>{
   console.log(result);
  if(err) {
    return res.cc(err)
  }
  else if(result.length == 0) {
   getinfo(sql2,[null,req.body.username,req.body.password,req.body.nickname,avatar,0],res)
   res.send({
    message:'注册成功'
   })
  }else {
   res.send({
    message:'此账号已存在，请重新注册'
   })
  }
 })
}
// 注册
// 参数 username,password,nickname
exports.update = async (req,res) =>{
 if(!req.body.avatar) {
  const sql0 = 'update user set password = ?,nickname = ? where username = ?'
  await getinfo(sql0,[req.body.password,req.body.nickname,req.body.username],res,1)

 }else {
  const sql0 = 'update user set password = ?,nickname = ?,avatar = ? where username = ?'
  await getinfo(sql0,[req.body.password,req.body.nickname,req.body.avatar,req.body.username],res,1)
 }
}
//信息修改
//参数 username,password,nickname,avatar