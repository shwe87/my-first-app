var data = require("sdk/self").data;
var openTabs = require("sdk/tabs");
var windows = require("sdk/windows").browserWindows;
 
 
/*Open some tabs so that the tabs' list isn't empty.*/

openTabs.activeTab.url = "http://www.gmail.com";
openTabs.open("http://www.google.com");
openTabs.open("http://www.urjc.es");

/*Set-up the panel and link it with it's content script (get-tabs.js)*/
var myPanel = require("sdk/panel").Panel({
  width:500,
  height:500,
  contentURL: data.url("myPage.html"),	//The current page is a personalized page.
  contentScriptFile: data.url("get-tabs.js"),
  onHide: clear		
  /*When the panel hides, clear off the list so to make a new list on the next click.*/
});


function clear(){
  //function to clear the list.
  myPanel.contentURL = data.url("myPage.html");
  //myPanel.contentURL = "about:blank";
  myPanel.port.emit('clear',"");
}

/* Set-up the widget. The widget's button is a Tabs! message. 
 * A click on the button will open a panel (myPanel)*/
var myWidget = require("sdk/widget").Widget({
  id: "my-widget",
  label: "My Widget",
  content: "Tabs!",
  width: 50,
  panel: myPanel,
  onClick: listTabs 
  /*Clicking on the button will list the tabs that are open right now.*/
});


/*The following function will obtain all the tabs that are open and sent one 
 * by one to the content script.*/
function listTabs() {
  //myPanel.contentURL = data.url("myPage.html")
  //myPanel.show();
  console.log("listTabs!!!");
  var tabs = require("sdk/tabs");
  for each (var tab in tabs){
    console.log(tab.url);
    //myPanel.port.emit('tabs',tab.title);
    myPanel.port.emit('tabs',tab.url);
  }  
}


myPanel.port.on("clicked",function(click){
  var index = 0;
  openTabs.open({
  	url: click[index],
  	inNewWindow: true
  });
  //windows.activate();
  for(index=1;index<click.length;index++)
  	openTabs.open(click[index]);
  //myPanel.contentURL= "http://www.wikipedia.com";	//The current page is a personalized page.
  //contentScriptFile: data.url("get-tabs.js"),
  //onHide: clear		
  /*When the panel hides, clear off the list so to make a new list on the next click.*/
});
	

