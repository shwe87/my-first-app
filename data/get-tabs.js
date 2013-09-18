var tabsList = "";
var tabsAux="";
var tabsArray = new Array();
var counter = 0;
//var tabsList = new Array();
self.port.on('tabs',function(tabsName){
	tabsArray[counter] = tabsName;
	counter = counter + 1;
	tabsAux="<li> <a href=\"" +tabsName+"\">"+ tabsName +"</a> </li>"
	tabsList = tabsList + tabsAux;
	console.log("Aqui estoy");
	console.log("\t\t\t Tabs name:" + tabsName);
	console.log("\t\t\t Tabs List:" + tabsList);
	var tabsArea = document.getElementById("tabs");
	tabsArea.innerHTML = tabsList;
		
});


self.port.on('clear',function(empty){
	console.log("clear");
	tabsList = "";
	tabsAux = "";
	counter = 0;
	tabsArray = new Array();
	index = 0;
});

var button = document.getElementById("myButton");
if (button != null){
	console.log("BUTTON NOT NULL!!!");
	button.addEventListener('click',function onClick(event){
		console.log("CLICKED!!!"+tabsArray);
		self.port.emit("clicked",tabsArray);
		
	},false);
}



