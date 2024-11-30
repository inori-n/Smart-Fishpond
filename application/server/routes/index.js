var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");
//邮件系统
var connection = require('../db/sql.js')

var code;

var transPort = nodemailer.createTransport({
  service: '163',
  host: 'smtp.163.com',
  port: 456,
  secure: true,
  auth: {
    user: '*****',
	pass: '*****'
  }
});

connection.on('error', (err) => {
  if (err.code === 'ER_NO_SUCH_TABLE') {
    console.log('表不存在，但程序继续运行');
    // 这里记录错误日志，或者执行其他操作
  } else {
    throw err;
  }
});


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post("/newdevice",function(req, res, next) {
    let projectname = req.body.name
    let projectid = req.body.id
    let sqlSentence = `CREATE TABLE ${projectname}${projectid} (ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,Time VARCHAR(255),TimeStamp BIGINT,WaterTemperature TEXT,LON DOUBLE,LAT DOUBLE,Prediction TEXT,imei BIGINT)`
	connection.query(sqlSentence,(err,results) => {
		res.send('Create Device Successful')
	});
});

router.post("/push",function(req, res, next) {
    let projectname = req.body.name
    let projectid = req.body.id
	let Time = req.body.time
	let TimeStamp = req.body.timestamp
	let Watertemperature = req.body.watertemperature
	let LON = req.body.lon
	let LAT = req.body.lat
	let imei = req.body.imei
    let sqlSentence = `INSERT INTO ${projectname}${projectid} (Time,TimeStamp,WaterTemperature,LON,LAT,imei) values ("${Time}",${TimeStamp},${Watertemperature},${LON},${LAT},${imei}) `
	console.log(sqlSentence)
	connection.query(sqlSentence,(err,results) => {
		res.send('Push Data Successful')
	});
});


//用req访问请求值，别用res，res返回undefined
router.post("/data",function(req, res, next) {
	// console.log(req.body);
	var name = req.body.name;
	console.log(name);
	var limit = req.body.limit;
	//正取10行
	// var sqlSentence = 'SELECT * FROM device_' + name + ' Where ID < ?';
	//倒取10行
	var sqlSentence = 'SELECT * FROM device_' + name + ' ORDER BY ID DESC LIMIT ?';
	//注意！！！！语句里的空格别漏了，完整的语句应该是'select * from PondWaterMetrics Where ID < 3'
	// ?是占位符，当然也可以用c的占位符如%s，多个占位符可以查询指定表格的指定内容
	//或者这样写connection.query('select * from PondWaterMetrics Where ID < ?',[limit],function(error, results, field
    connection.query(sqlSentence,limit,(err, results) => {
    if (err) {
      if (err.code === 'ER_NO_SUCH_TABLE') {
        console.log('表不存在，但继续处理请求');
        // 处理错误，返回一个错误响应
      } else {
        // 处理其他类型的数据库错误
        return res.status(500).send('数据库错误');
      }
    }
    // 处理查询结果
    res.send(results);
  });
});

//当前水温预警记录
router.post("/warn1",function(req, res, next) {
	//SELECT * FROM device_111 WHERE WaterTemperature < 24 OR WaterTemperature > 28 OR WaterTemperature_BOTTOM < 24 OR WaterTemperature_BOTTOM >28;
	var name = req.body.name;
	var sqlSentence = 'SELECT * FROM device_' + name + ' WHERE WaterTemperature < 24 OR WaterTemperature > 28 OR WaterTemperature_BOTTOM < 24 OR WaterTemperature_BOTTOM >28 ORDER BY ID DESC LIMIT 50'
	// console.log(sqlSentence)
	// var sqlSentence = 'SELECT * FROM device_' + name + ' WHERE WaterTemperature < 24 OR WaterTemperature > 28 OR WaterTemperature_BOTTOM < 24 OR WaterTemperature_BOTTOM >28';
    connection.query(sqlSentence,(err, results) => {
    if (err) {
      if (err.code === 'ER_NO_SUCH_TABLE') {
        console.log('表不存在，但继续处理请求');
        // 处理错误，返回一个错误响应
      } else {
        // 处理其他类型的数据库错误
        return res.status(500).send('数据库错误');
      }
    }
    // 处理查询结果
    res.send(results);
  });
});


router.post("/login",function(req, res, next) {
	var account = req.body.account
	var password = req.body.password
	var sqlSentence = 'SELECT * FROM user WHERE account = ? AND password = ?'
	console.log(account)
	console.log(sqlSentence)
	console.log(password)
    connection.query(sqlSentence,[account,password],(err,results) => {
		if(results.length > 0 ){
			res.send('Login Successful')
		}else{
			res.send('Login Failed')
		}
	});
});


router.post("/change",function(req, res, next) {
	let email = req.body.account
	let newpassword = req.body.password
	let vercode = req.body.vercode
	let sqlSentence = `UPDATE user SET password = ${newpassword} WHERE account = '${email}'`
	if(code == vercode.toUpperCase()){
		connection.query(sqlSentence,(err,results) => {
			res.send('Update Successful')
		});
	}else{
		res.send('Verify Failed')
	}

});

router.post("/register",function(req, res, next) {
	let email = req.body.account
	let newpassword = req.body.password
	let vercode = req.body.vercode
	let sqlSentence = `INSERT IGNORE INTO user (account,password) values ('${email}','${newpassword}') `
	console.log(sqlSentence)
	if(code == vercode.toUpperCase()){
		connection.query(sqlSentence,(err,results) => {
			res.send('Update Successful')
		});
	}else{
		res.send('Verify Failed')
	}

});

router.post("/verify",function(req, res, next) {
	let email = req.body.account
	let newpassword = req.body.password
	let vercode = req.body.vercode
	code = Math.random().toString(16).slice(2, 8).toUpperCase();
	const sendConfig = {
		// 目标邮箱
	    to: `${email}`,
		// 发件人邮箱
	    from: 'fzudzry@163.com',
		// 邮件标题
	    subject: '验证码',
		// 邮件内容
	    text: `您的验证码是：${code}, 如非您本人操作请忽略。`
	}
	transPort.sendMail(sendConfig, (error, result) => {
	    if (error) {
	      res.end('fail')
	    } else {
	      res.end('success')
	    }
	})

});

router.post("/add",function(req, res, next) {
	let devicename = req.body.name
	let sqlSentence = `INSERT IGNORE INTO device (devicename) values (${devicename})`
	console.log(sqlSentence)
	connection.query(sqlSentence,(err,results) => {
		res.send('Update Successful')
	});
});


module.exports = router;