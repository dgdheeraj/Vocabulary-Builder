(function(){

    angular
      .module("VocBuild")
      .controller("sctrl", function($http){
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
        var s = location.href.split("search=")[1];
        var a={
            "inputword":s
        }
        console.log(a);
        vm.op=null;
        $http.post("http://localhost:5000/api/search",a).then(function(response)
        {
            console.log(response.data);
            vm.op=response.data;
        });
    });
  
 
    
})();