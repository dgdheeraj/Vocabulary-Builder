(function(){

    angular
      .module("VocBuild")
      .controller("homectrl", function($window,$http,$timeout){
            var vm=this;
            vm.func0=func0;

            $timeout(func0, 3000);
            function func0()
            {
                console.log("First Image Loaded")
                $http.get("http://localhost:5000/img/1",{responseType: 'arraybuffer'}).then(function(response)
                {
                    let blob = new Blob([response.data], {type: 'image/png'});
                    vm.image1=($window.URL || $window.webkitURL).createObjectURL(blob);
                    $timeout(func1, 3000);
                });
            
            }
            vm.func1=func1;
            function func1()
            {
                console.log("Second Image Loaded");
                $http.get("http://localhost:5000/img/2",{responseType: 'arraybuffer'}).then(function(response)
                {
                    let blob = new Blob([response.data], {type: 'image/png'});
                    vm.image2=($window.URL || $window.webkitURL).createObjectURL(blob);
                    $timeout(func2, 3000);
                });
            }
            vm.func2=func2;
            function func2()
            {
                console.log("Third Image Loaded");
                $http.get("http://localhost:5000/img/3",{responseType: 'arraybuffer'}).then(function(response)
                {
                    let blob = new Blob([response.data], {type: 'image/png'});
                    vm.image3=($window.URL || $window.webkitURL).createObjectURL(blob);
                    // $timeout(func1, 3000);
                });
            }
        });
  
 
    
})();