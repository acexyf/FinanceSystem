const urls = {
    index: '/',
    home: '/home',
    lastEightMonths: '/lastEightMonths'
}
import person from '../password.js';
import Consume from '../models/consume.js';
import Income from '../models/income.js';

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
        let date = new Date(),
            array = [];
        Income.getIncomeByMonth(date.getFullYear(), date.getMonth() + 1, -1, function(result) {
            array.push(result);
            for (let i = 0; i < 6; i++) {
                Consume.getConsumeByMonth(date.getFullYear(), date.getMonth() + 1, i, -1, function(result) {
                    array.push(result);
                    if (array.length == 7) {
                        res.render('home', {
                            title: '谢小飞的财务管理系统',
                            data: array
                        })
                    }
                })
            }
        })
    });
    app.get(urls.lastEightMonths, function(req, res) {
        let countArray = [],
            date = new Date(),
            timeArray = returnLastMonths(date.getFullYear(), date.getMonth() + 1, 8);
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
