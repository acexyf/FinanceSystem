import db from './db.js';

function Consume(consume) {
    this.id = consume.id || 0,
        this.amount = consume.amount || 0,
        this.times = consume.times || '',
        this.explains = consume.explains || '',
        this.genre = consume.genre || 0,
        this.detail = consume.detail || 0
}
module.exports = Consume;

/**
 * 保存消费
 * @param  {Function} callback [description]
 * @return {boolean}            [description]
 */
Consume.prototype.save = function(callback) {
    let state = 'insert into finance_consume value(?,?,?,?,?,?)',
        param = [this.id, this.amount, this.times, this.explains, this.genre, this.detail];
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
 * 获取每个月的某种类型的消费
 * @param  {[int]}   year     [description]
 * @param  {[int]}   month    [description]
 * @param  {[int]}   type     [description]
 * @param  {[int]}   detail   [description]
 * @param  {Function} callback [description]
 * @return {[int]}            [description]
 */
Consume.getConsumeByMonth = function(year, month, type, detail, callback) {
    if (month > 12 || month < 1)
        return;
    let selectType = (type == -1 ? '' : ' and genre =' + type),
        detailType = (detail == -1 ? '' : ' and detail =' + detail),
        state = 'select sum(amount) as sum from finance_consume where times between ? and ?' + selectType + detailType,
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


Consume.getConsumeByYear = function(year, type, detail, callback) {
    let selectType = (type == -1 ? '' : ' and genre =' + type),
        detailType = (detail == -1 ? '' : ' and detail =' + type),
        state = 'select sum(amount) as sum from finance_consume where times between ? and ?' + selectType + detailType,
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