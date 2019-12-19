var document = { coordinates : '(' + x + ', ' + y + ')', value : 1 };  
switch(region){
 case '"recordPreview"':
 	var res = db.recordpreviewclicks.find({coordinates: '(' + x + ', ' + y + ')'}).toArray()[0];
 	if(res){
 		res.value = res.value ? res.value:0;
 		db.recordpreviewclicks.update({coordinates: '(' + x + ', ' + y + ')'}, {$set: {value: res.value + 1}});
 	}
 	else{
		db.recordpreviewclicks.insert(document);
	}
	break;
 default:
}
