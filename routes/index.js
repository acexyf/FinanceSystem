const urls = {
    index: '/',
    home: '/home',
    lastEightMonths: '/lastEightMonths',
    getConsumeModels: '/getConsumeModels',
    getIncomeModels: '/getIncomeModels',
    addIncome: '/addIncome',
    addConsume: '/addConsume'
}
var person = require('../password.js');
var Consume = require('../models/consume.js');
var Income = require('../models/income.js');
var consumeModels = require('../models/consumeModels.js');
var incomeModels = require('../models/incomeModels.js');


module.exports = function(app) {
    app.get(urls.index, function(req, res) {
        res.render('index', {
            title: '登陆'
        })
    });
    app.post(urls.index, function(req, res) {
        var username = req.param('username'),
            pwd = req.param('password');
        if (!username && !pwd) {
            res.json({ "status": false, "flag": 0 })
        } else {
            if (username != person.username) {
                res.json({ "status": false, "flag": 2 })
            } else {
                if (pwd != person.password) {
                    res.json({ "status": false, "flag": 3 })
                } else {
                    res.json({ "status": true, "flag": 1 })
                }
            }
        }
    });
    app.get(urls.home, function(req, res) {
        let date = new Date();
        Income.getIncomeByMonth(date.getFullYear(), date.getMonth() + 1, -1, function(sum) {
            Consume.getMonthConsumeByGenre(date.getFullYear(), date.getMonth() + 1, function(mydata) {
                mydata.sum = sum;
                res.render('home', {
                    title: '谢小飞的财务管理系统',
                    data: mydata
                })
            })
        })
    });
    app.get(urls.lastEightMonths, function(req, res) {
        let countArray = [],
            date = new Date(),
            timeArray = returnLastMonths(date.getFullYear(), date.getMonth() + 1, 12);
        for (let i = 0; i < timeArray.length; i++) {
            let date = timeArray[i].split('-');
            Consume.getConsumeByMonth(date[0], date[1], -1, -1, function(result) {
                countArray.push('{"period":"' + date[0] + '-' + date[1] + '","count":' + result + '}');
                if (i == timeArray.length - 1) {
                    if (i == timeArray.length - 1) {
                        res.json('[' + countArray.join(',') + ']')
                    }
                }
            })
        }
    });
    app.get(urls.getConsumeModels, function(req, res) {
        res.json(consumeModels);
    });
    app.get(urls.getIncomeModels, function(req, res) {
        res.json(incomeModels);
    })
    app.get(urls.addIncome, function(req, res) {
        res.render('addIncome', {
            title: '新增收入'
        })
    });
    app.post(urls.addIncome, function(req, res) {
        let amount = req.param('amount'),
            genre = req.param('genre'),
            times = req.param('times'),
            explains = req.param('explains');
        if (!amount) {
            res.json('{"status":false}');
        } else {
            let datas;
            if (times) {
                let arr = times.split('-');
                datas = {
                    amount: amount,
                    times: times,
                    explains: explains,
                    genre: genre,
                    years: arr[0],
                    months: arr[1],
                    days: arr[2]
                }
            } else {
                let dates = new Date();
                datas = {
                    amount: amount,
                    times: dates.getFullYear() + '-' + (dates.getMonth() + 1) + '-' + dates.getDate(),
                    explains: explains,
                    genre: genre,
                    years: dates.getFullYear(),
                    months: dates.getMonth() + 1,
                    days: dates.getDate()
                }
            }
            var income = new Income(datas);
            income.save(function(result) {
                if (result) {
                    res.json('{"status":true}');
                } else {
                    res.json('{"status":false}');
                }
            })
        }
    });
    app.get(urls.addConsume, function(req, res) {
        res.render('addConsume', {
            title: '新增支出'
        })
    });
    app.post(urls.addConsume, function(req, res) {
        let amount = req.param('amount'),
            genre = req.param('genre'),
            times = req.param('times'),
            explains = req.param('explains'),
            detail = req.param('detail');
        if (!amount) {
            res.json('{"status":false}');
        } else {
            let datas;
            if (times) {
                let arr = times.split('-');
                datas = {
                    amount: amount,
                    times: times,
                    explains: explains,
                    genre: genre,
                    detail: detail,
                    years: arr[0],
                    months: arr[1],
                    days: arr[2],
                }
            } else {
                let dates = new Date();
                datas = {
                    amount: amount,
                    times: dates.getFullYear() + '-' + (dates.getMonth() + 1) + '-' + dates.getDate(),
                    explains: explains,
                    genre: genre,
                    detail: detail,
                    years: dates.getFullYear(),
                    months: dates.getMonth() + 1,
                    days: dates.getDate()
                }
            }
            var consume = new Consume(datas);
            consume.save(function(result) {
                if (result) {
                    res.json('{"status":true}');
                } else {
                    res.json('{"status":false}');
                }
            })
        }
    });
}

function returnLastMonths(year, month, length) {
    var arr = [];
    if (month >= length) {
        for (let i = 0; i < length; i++) {
            arr.push(year + '-' + (month - i));
        }
    } else {
        for (let i = 0; i < month; i++) {
            arr.push(year + '-' + (month - i));
        }
        for (let i = 0; i < length - month; i++) {
            arr.push((year - 1) + '-' + (12 - i));
        }
    }
    return arr
}
