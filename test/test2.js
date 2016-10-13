import Consume from '../models/consume.js';



let countArray=[],
	timeArray=returnLastMonths(2017,2,10);


for(let i=0;i<timeArray.length;i++){
	let date=timeArray[i].split('-');
	Consume.getConsumeByMonth(date[0],date[1],-1,-1,function(result){
		countArray.push(date[0]+'-'+date[1]+':'+result);
	})
}


/**
 * 返回从year和month往前推的length个月
 * @param  {[int]} year   [description]
 * @param  {[int]} month  [description]
 * @param  {[int]} length [<=12]
 * @return {[array]}        [description]
 * @todo 
 */
function returnLastMonths(year,month,length){
	var arr=[];
	if(month>=length){
		for(let i=0;i<length;i++){
			arr.push(year+'-'+(month-i));
		}
	}
	else{
		for(let i=0;i<month;i++){
			arr.push(year+'-'+(month-i));
		}
		for(let i=0;i<length-month;i++){
			arr.push((year-1)+'-'+(12-i));
		}
	}
	return arr
}
