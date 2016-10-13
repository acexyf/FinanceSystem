import Income from '../models/income.js';

// Income.getIncomeByMonth(2016,10,-1,function(result){
// 	console.log(result)
// })

// Income.getIncomeByYear(2017,-1,function(result){
// 	console.log(result);
// })


for(let i=10;i<11;i++){
	for(let j=1;j<10;j++){
		let data={
			id:0,
			amount:Math.floor(Math.random()*50),
			times:'2016-'+i+'-'+j,
			explains:'explaint',
			genre:Math.floor(Math.random()*2)
		}
		let income=new Income(data);
		income.save(function(result){
			console.log(result)
		})
	}
}