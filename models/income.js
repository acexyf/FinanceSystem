import db from './db.js';

function Income(income) {
    this.id = income.id || 0,
        this.amount = income.amount || 0,
        this.times = income.times || '',
        this.explains = income.explains || '',
        this.genre = income.genre || 0
}
module.exports = Income;

/**
 * 保存收入
 * @param  {Function} callback [description]
 * @return {[boolean]}            [description]
 */
Income.prototype.save = function(callback) {
        let state = 'insert into finance_income value(?,?,?,?,?)',
            param = [this.id, this.amount, this.times, this.explains, this.genre];
        db.query(state, param, function(err, result) {
            if (err) {
                return callback(err);
            }
            if (result && result.affectedRows == 1) {
                callback(true);
            } else {
                callback(false);
            }
        })
    }
    /**
     * 获取每个月的总收入
     * @param  {[int]}   year    [2016]
     * @param  {[int]}   month    [10]
     * @param  {[int]}      type    类型，-1表示全部
     * @param  {Function} callback [description]
     * @return {[int]}            [description]
     */
Income.getIncomeByMonth = function(year, month, type, callback) {
    if (month > 12 || month < 1)
        return;
    let selectType = (type == -1 ? '' : ' and genre =' + type),
        state = 'select sum(amount) as sum from finance_income where times between ? and ?' + selectType,
        param = [year + '-' + month + '-01 00:00:00', year + '-' + month + '-' + getLastDay(year, month) + ' 23:59:59'];
    db.query(state, param, function(err, result) {
        if (err) {
            return callback(err);
        }
        if (result && result[0].sum) {
            callback(result[0].sum)
        } else {
            callback(0)
        }
    })
}

/**
 * 获取每年的总收入
 * @param  {[string]}   year    ['2016']
 * @param  {[int]}      type    类型，-1表示全部
 * @param  {Function} callback [description]
 * @return {[int]}            [description]
 */
Income.getIncomeByYear = function(year, type, callback) {
    let selectType = (type == -1 ? '' : ' and genre =' + type),
        state = 'select sum(amount) as sum from finance_income where times between ? and ?' + selectType,
        param = [year + '-1-1 00:00:00', year + '-12-31 23:59:59'];
    db.query(state, param, function(err, result) {
        if (err) {
            return callback(err);
        }
        if (result && result[0].sum) {
            callback(result[0].sum)
        } else {
            callback(0)
        }
    })
}



/**
 * 获得某月的最后一天 
 * @param  {[int]} year  [description]
 * @param  {[month]} month [description]
 * @return {[int]}       [description]
 */
function getLastDay(year, month) {
    var new_year = year; //取当前的年份          
    var new_month = month++; //取下一个月的第一天，方便计算（最后一天不固定）          
    if (month > 12) {
        new_month -= 12; //月份减          
        new_year++; //年份增          
    }
    var new_date = new Date(new_year, new_month, 1); //取当年当月中的第一天          
    return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate(); //获取当月最后一天日期          
}
