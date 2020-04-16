(function(){

    angular
      .module("VocBuild")
      .controller("learnctrl", function($http){
          var vm=this;
          
          var re = new RegExp("username" + "=([^;]+)");
          var value = re.exec(document.cookie);
          vm.login=false;
          vm.val=0;
          try{
              var e=value[0];
              vm.login=true;
          }
          catch(err)
          {
            //   console.log("Not logged in ");
              vm.login=false;
          }
          
            
        vm.op=null;
        vm.val=null;
        vm.syn=function(){
        $http.get("http://localhost:5000/api/synonym").then(function(response)
            {
                console.log(response.data);
                vm.op=response.data;
                vm.val=1;
                // console.log(response.data["name"]);
                // vm.details["name"]=response.data["name"];
                // vm.details["email"]=response.data["email"];
                // vm.details["uname"]=response.data["uname"];
                // vm.details=JSON.parse(response.data);
            });
        };
        vm.mean=function(){
            $http.post("http://localhost:5000/api/learn_data").then(function(response)
                {
                    console.log(response.data);
                    vm.op=response.data;
                    vm.val=2;
                    // console.log(response.data["name"]);
                    // vm.details["name"]=response.data["name"];
                    // vm.details["email"]=response.data["email"];
                    // vm.details["uname"]=response.data["uname"];
                    // vm.details=JSON.parse(response.data);
                });
            };
        // }

    });
  
 
    
})();