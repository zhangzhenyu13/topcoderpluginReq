//window.alert("hi, world");
//console.log("topcoderRS plugin running instance start");
var mode=1;
var data=null;

var plist=document.getElementById("list");
var fetching=false;
var taskID= chrome.extension.getBackgroundPage().taskID;
var topusers=null;
var counter=0;
//
function showResult(){
  if(data.code!=200){
    plist.innerHTML="Currently not available, but we are trying to update data.";
    return;
  };
  var userlist=data.data;
  console.log(userlist);
  n_users=userlist.length;
  var result="";
  for(let  i=0;i<5&&i<n_users;i++){
    let userurl="https://www.topcoder.com/members/"+userlist[i];
    result=result+"<h3><a href="+userurl+" name='top user'>Top "+(i+1)+": "+userlist[i]+"</a></h3>"

  }
  plist.innerHTML=result;
}
//set data
function setList(){
  fetching=true;
  plist.innerHTML="Loading...";
  var request=new XMLHttpRequest();

  var restAPI="http://192.168.7.112/topcoder/recommend/task?taskId="+taskID;

  document.getElementById("challengeid").value=taskID;
  
  request.open('GET', restAPI,true);
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
    //console.log('Status:', this.status,typeof this.status);
    //console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
    data=JSON.parse(this.responseText);
    fetching=false;
    showResult();
    clickUser();
    }
  };
  
  request.send();
  
}

function newtab(index){
  chrome.tabs.create({url:topusers[index].href})
}

function clickUser(){
  console.log("response to user click");
  topusers=document.getElementsByName("top user");
  
  console.log(topusers.length);
  for(let i=0;i<topusers.length;i++){
    counter=i;
    console.log(counter);
    //console.log(typeof topusers[i]);
    console.log(topusers[i].href);
    //console.log(topusers[i]);
    topusers[i].onclick = Function("newtab("+i+")");
  }
}

document.getElementById("all").onload=setList;

