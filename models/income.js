import db from './db.js';

function Income(income) {
    this.id = income.id || 0,
        this.amount = income.amount || 0,
        this.times = income.times || '',
        this.explains = income.explains || '',
        this.genre = income.genre || 0,
        this.years = income.years || 0,
        this.months = income.months || 1,
        this.days = income.days || 1
}
module.exports = Income;

/**
 * 保存收入
 * @param  {Function} callback [description]
 * @return {[boolean]}            [description]
 */
Income.prototype.save = function(callback) {
        let state = 'insert into finance_income value(?,?,?,?,?,?,?,?)',
            param = [this.id, this.amount, this.times, this.explains, this.genre, this.years, this.months, this.days];
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
        state = 'select sum(amount) as sum from finance_income where years = ? and months = ?' + selectType,
        param = [year,month];
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
        state = 'select sum(amount) as sum from finance_income where years = ?' + selectType,
        param = [year];
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



