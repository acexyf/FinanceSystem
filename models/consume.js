import db from './db.js';

function Consume(consume) {
    this.id = consume.id || 0,
        this.amount = consume.amount || 0,
        this.times = consume.times || '',
        this.explains = consume.explains || '',
        this.genre = consume.genre || 0,
        this.detail = consume.detail || 0,
        this.years = consume.years || 0,
        this.months = consume.months || 1,
        this.days = consume.days || 1
}
module.exports = Consume;

/**
 * 保存消费
 * @param  {Function} callback [description]
 * @return {boolean}            [description]
 */
Consume.prototype.save = function(callback) {
    let state = 'insert into finance_consume value(?,?,?,?,?,?,?,?,?)',
        param = [this.id, this.amount, this.times, this.explains, this.genre, this.detail, this.years, this.months, this.days];
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
        state = 'select sum(amount) as sum from finance_consume where years = ? and months = ?' + selectType + detailType,
        param = [year, month];
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
 * 获取每年的总支出
 * @param  {[string]}   year    ['2016']
 * @param  {[int]}      type    类型，-1表示全部
 * @param  {Function} callback [description]
 * @return {[int]}            [description]
 */
Consume.getConsumeByYear = function(year, type, detail, callback) {
    let selectType = (type == -1 ? '' : ' and genre =' + type),
        detailType = (detail == -1 ? '' : ' and detail =' + type),
        state = 'select sum(amount) as sum from finance_consume where years = ?' + selectType + detailType,
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

/**
 * 获取year年month月每个种类的数据
 * @param  {[int]}   year     [description]
 * @param  {[int]}   month    [description]
 * @param  {Function} callback [description]
 * @return {[Object]}            [description]
 */
Consume.getMonthConsumeByGenre=function(year,month,callback){
    let state='select genre,sum(amount) as sum from finance_consume where years = ? and months = ? group by genre',
    param=[year,month];
    db.query(state,param,function(err,result){
        let mydata={"other":0,"eat":0,"stay":0,"trip":0,"cloth":0,"life":0}
        if (err) {
            return callback(err);
        }
        if(result&&result.length){
            result.map((elem)=>{
                switch(elem.genre){
                    case 0:
                        mydata.other=elem.sum;
                    break;
                    case 1:
                        mydata.eat=elem.sum;
                    break;
                    case 2:
                        mydata.stay=elem.sum;
                    break;
                    case 3:
                        mydata.trip=elem.sum;
                    break;
                    case 4:
                        mydata.cloth=elem.sum;
                    break;
                    case 5:
                        mydata.life=elem.sum;
                    break;
                    default:
                    break;
                }
            });
        }
        callback(mydata);
    });
}

Consume.getLastTwelveMonths=function(callback){
    let state='select sum(amount) as sum,years,months from finance_consume where times between date_add(now(),interval -12 month) and now() group by months order by years desc,months desc';    db.query(state,function(err,result){
        if (err) {
            return callback(err);
        }
        callback(result);
    })
}


