(function(){

    angular
      .module("VocBuild")
      .controller("loginctrl", function($window,$http){
          var vm=this;
          vm.submitlogin=function(){
            var a={
              "uname":vm.usr.username,
              "pword":vm.usr.passwd
            }
            // console.log(vm.usr);
            // console.log(a.username)
            // if(a.username==vm.usr.username && a.passwd==vm.usr.passwd)
            // {
              // console.log("Success");
              // document.cookie="username="+a.username+";login=1";
              // console.log(document.cookie);
              // $window.location.href="/index.html";
            // }
            vm.status=-1;
            $http.post("http://localhost:5000/api/validate",a).then(function(response)
									{
                    console.log(response.data)
                    if(response.data==0)
                    {
                      vm.status=0;//Success
                      document.cookie="username="+a.uname+";"; 
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
          
      });
  
 
    
})();