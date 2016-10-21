var Consume require('../models/consume.js');

// for(let i=8;i<11;i++){
// 	for(let j=1;j<31;j++){
// 		let data={
// 			id:0,
// 			amount:Math.floor(Math.random()*500),
// 			times:'2016-0'+i+'-'+j,
// 			explains:'2016-0'+i+'-'+j+' consume',
// 			genre:Math.floor(Math.random()*6),
// 			detail:Math.floor(Math.random()*6),
// 			years:2016,
// 			months:i,
// 			days:j
// 		}
// 		let consume=new Consume(data);
// 		consume.save(function(result){
// 			console.log(result);
// 		})
// 	}
// }


// Consume.getConsumeByMonth(2016,8,-1,-1,function(result){
// 	console.log(result);
// })

// for(let i=1;i<12;i++){
// 	Consume.getConsumeByMonth(2016,i,-1,-1,function(result){
// 		console.log('2016-'+i+':'+result);
// 	})
// }

// Consume.getConsumeByYear(2016,-1,-1,function(result){
// 	console.log(result);
// })

Consume.getMonthConsumeByGenre(2016,10,function(result){
	console.log(result);
})





