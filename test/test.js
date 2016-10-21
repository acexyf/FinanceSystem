var Income require('../models/income.js');

// Income.getIncomeByMonth(2016,11,-1,function(result){
// 	console.log(result)
// })

Income.getIncomeByYear(2016,-1,function(result){
	console.log(result);
})


// for(let i=8;i<11;i++){
// 	for(let j=1;j<31;j++){
// 		let data={
// 			id:0,
// 			amount:Math.floor(Math.random()*50),
// 			times:'2016-'+i+'-'+j,
// 			explains:'2016-'+i+'-'+j+' income',
// 			genre:Math.floor(Math.random()*2),
// 			years:2016,
// 			months:i,
// 			days:j
// 		}
// 		let income=new Income(data);
// 		income.save(function(result){
// 			console.log(result)
// 		})
// 	}
// }