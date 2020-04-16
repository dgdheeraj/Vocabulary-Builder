(function(){

    angular
      .module("VocBuild")
      .controller("learnctrl", function($http){
          var vm=this;
          var re = new RegExp("username" + "=([^;]+)");
          var value = re.exec(document.cookie);
          vm.login=false;
          try{
              var e=value[0];
              vm.login=true;
          }
          catch(err)
          {
            //   console.log("Not logged in ");
              vm.login=false;
          }
          
            
        console.log("Learn")  
        vm.op=null;
        // vm.send_req=function(){
            $http.get("http://localhost:5000/api/synonym").then(function(response)
            {
                console.log(response.data);
                vm.op=response.data;
                // console.log(response.data["name"]);
                // vm.details["name"]=response.data["name"];
                // vm.details["email"]=response.data["email"];
                // vm.details["uname"]=response.data["uname"];
                // vm.details=JSON.parse(response.data);
            });
        // }

    });
  
 
    
})();