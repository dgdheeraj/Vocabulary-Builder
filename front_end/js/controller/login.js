(function(){

    angular
      .module("VocBuild")
      .controller("loginctrl", function($window,$http){
          var vm=this;
          var re = new RegExp("username" + "=([^;]+)");
          var value = re.exec(document.cookie);
          vm.login=false;
          try{
              vm.username=value[1];
              vm.login=true;
          }
          catch(err)
          {
              console.log("Not logged in ");
              vm.login=false;
          }
          vm.details={
            "name":"",
            "email":"",
            "uname":"",
            "score":""
          };
          vm.details=null;
          if(vm.login==1)
          {
            // console.log(value[1]);
            $http.get("http://localhost:5000/api/details/"+vm.username).then(function(response)
									{
                    // console.log(response.data["name"]);
                    // vm.details["name"]=response.data["name"];
                    // vm.details["email"]=response.data["email"];
                    // vm.details["uname"]=response.data["uname"];
                    // vm.details["score"]=response.data["score"];
                    vm.details=response.data;
                    // vm.details=JSON.parse(response.data);
            });
            console.log(vm.details);
          }
          vm.submitlogin=function(){
            vm.status=-1;
            var a={
              "uname":vm.usr.username,
              "pword":vm.usr.passwd
            }
            
            $http.post("http://localhost:5000/api/validate",a).then(function(response)
									{
                    console.log(response.data)
                    if(response.data==0)
                    {
                      vm.status=0;//Success
                      document.cookie="username="+a.uname+";";
                      vm.login=true; 
                      // document.cookie = "myCookie=" + JSON.stringify({username: a.uname, login: 1});
                      $window.location.href="/index.html";
                    }
                    else if(response.data==1)
                      vm.status=1;//Invalid Username
                    else if(response.data==2)
                      vm.status=2;//Invalid Password
                    // vm.response = response.data;
                    // if(vm.response==1)
                    //   $window.location.href="/login.html";
                    // else{
                    //   vm.register=false;
                    // }
            });
          }

          vm.logout=function(){
            document.cookie="username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            vm.login=false;
          }
          
      });
  
      
    
})();