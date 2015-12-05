(function(){
var app=angular.module('appBattery',[]);
app.directive('appBattery',[function(){
return {
restrict:'E',
templateUrl:'AngularBattery/battery.html',
scope:{},
controller:['$window','$scope',function($window,$scope){
	this.bat={};
var bat=this;
$window.navigator.getBattery().then(function(battery){
	$scope.$apply(function(){
	setBattery(battery);
	});
});
this.display=function(){
	console.log(this.bat);
}
function setBattery(battery){
	bat.bat=battery;
	bat.bat.time=function(){
		if(bat.bat.charging){
			if(isFinite(bat.bat.chargingTime)){
				var time=bat.bat.chargingTime;
				var hour =Math.trunc(time/3600);
				time=time%3600;
				var min=Math.trunc(time/60);
				return "charging time "+hour+':'+min
			}else{
				return "charging"
			}
		}else if(isFinite(bat.bat.dischargingTime)){
		var time=bat.bat.dischargingTime;
		var hour =Math.trunc(time/3600);
		time=time%3600;
		var min=Math.trunc(time/60);
		return hour+':'+min +" left on charge"
		}else{
			return "discharging";
		}
	}
	bat.bat.getLevel=function(){
		if(angular.isNumber(bat.bat.level)){
			if(bat.bat.level=1){
				angular.element('.battery::after').css('background-color','#00ff00');
			}else{
				angular.element('.battery::after').css('background-color','#000000');
			}
			return Math.round(bat.bat.level*100)+"%";
		}
	};
	bat.bat.onchargingtimechange=function(){
		$scope.$apply();
	};
	bat.bat.ondischargingtimechange=function(){
		$scope.$apply();
	};
	bat.bat.onlevelchange=function(){
		$scope.$apply();
	}
	bat.bat.onchargingchange=function(){
		$scope.$apply();
	};
}
}],
controllerAs:'battery',
}
}]);
})();
