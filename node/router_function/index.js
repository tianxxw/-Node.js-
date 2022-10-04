const db = require("../db");

function getinfo(sql,info,res,resSend = false) {
 return new Promise((resolve,reject)=>{
   console.log(info);
   db.query(sql,info,(err,result)=>{
     console.log(result);
    if(err) {
      return res.cc(err)
    }
    if(result.length == 0) {
      return res.cc(err)
    }
    console.log(resSend);
    if(resSend) {
     console.log(result);
     res.send({
       status:200,
       message:'success',
       result
     })
    }
   resolve(result)
   })
 })
}

module.exports = {
 getinfo
}