(function(){

    angular
      .module("VocBuild")
      .controller("registerctrl", function($http,$window){
          var vm=this;
          /*
          var re = new RegExp("username" + "=([^;]+)");
          var value = re.exec(document.cookie);
          console.log(value[1]);//gives username
          var re = new RegExp("login" + "=([^;]+)");
          var value = re.exec(document.cookie);
          console.log(value[1])//gives login         
          */

          vm.submit=function(){
            // console.log("Adh");
            // console.log(vm.usr.uname);
            // console.log(vm.usr.passwd);
            var a={
              "username":vm.usr.uname,
              "password":vm.usr.passwd,
              "name":vm.usr.name,
              "email":vm.usr.email
            }
            console.log(a)
            $http.put("http://localhost:5000/api/register",a).then(function(response)
									{
                    vm.response = response.data;
                    // console.log(vm.response);
										//self.status = response.data;
                  });
            console.log(vm.response);  
            if(vm.response==1)
                $window.location.href="/login.html";
            else{
              vm.register=false;
            }
          }
          
      });
  
 
    
})();