var document = { coordinates : '(' + x + ', ' + y + ')', x: x, y: y, windowWidth: windowWidth, windowHeight: windowHeight, value : 1 };

switch(region){
 case '"recordPreview"':
 	var res = db.recordpreviewclicks.find({x: x, y: y,  windowWidth: windowWidth, windowHeight: windowHeight}).toArray()[0];
 	if(res){
 		res.value = res.value ? res.value:0;
 		db.recordpreviewclicks.update({x: x, y: y,  windowWidth: windowWidth, windowHeight: windowHeight}, {$set: {value: res.value + 1}});
 	}
 	else{
		db.recordpreviewclicks.insert(document);
	}
	break;
  case '"searchSuggestions"':
 	var res = db.searchsuggestionclicks.find({x: x, y: y,  windowWidth: windowWidth, windowHeight: windowHeight}).toArray()[0];
 	if(res){
 		res.value = res.value ? res.value:0;
 		db.searchsuggestionclicks.update({x: x, y: y,  windowWidth: windowWidth, windowHeight: windowHeight}, {$set: {value: res.value + 1}});
 	}
 	else{
		db.searchsuggestionclicks.insert(document);
	}
	break;
	case '"leftNav"':
 	var res = db.leftnavclicks.find({x: x, y: y,  windowWidth: windowWidth, windowHeight: windowHeight}).toArray()[0];
 	if(res){
 		res.value = res.value ? res.value:0;
 		db.leftnavclicks.update({x: x, y: y,  windowWidth: windowWidth, windowHeight: windowHeight}, {$set: {value: res.value + 1}});
 	}
 	else{
		db.leftnavclicks.insert(document);
	}
	break;	
 default:
}
