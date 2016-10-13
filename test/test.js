import Income from '../models/income.js';

// Income.getIncomeByMonth(2016,10,-1,function(result){
// 	console.log(result)
// })

// Income.getIncomeByYear(2017,-1,function(result){
// 	console.log(result);
// })


var data={
	id:0,
	amount:652,
	times:'2017-02-13',
	explains:'explaint',
	genre:1
}
var income=new Income(data);
income.save(function(result){
	console.log(result)
})