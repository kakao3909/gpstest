// 戻り値でIDが返る（監視を終わらせる際に使用します）
var gpsId = null;
var compassId = null;
var target, options;

function gpsSuccess(a) {
    var pos = a.coords;

    notif({
        msg: "<b>精度:</b>"+pos.accuracy,
        type: "success",
        time: 1500
    });
    $("#latitude").text(pos.latitude);
    $("#longitude").text(pos.longitude);
    $("#accuracy").text(pos.accuracy);
    $("#altitude").text(pos.altitude);
    $("#altitudeAccuracy").text(pos.altitudeAccuracy);
    $("#heading").text(pos.heading);
    $("#speed").text(pos.speed);
    
    
    
    $("#timestamp").text(Date());


}

function gpsError(e) {
    notif({
        msg: "<b>ERROR(" + e.code + "):" + e.message,
        type: "error"
    });
}


var gpsOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function compassSuccess(heading){
    $("#compass").text(heading.magneticHeading);
}

function compassError(compassError){
    notif({
        msg: "<b>Commpas ERROR:" + compassError.code,
        type: "error"
    });
}

var compassOptions = {
    frequency: 1000
};

$(function () {
    notif({
        msg: "<b>Success:</b> In 5 seconds i'll be gone",
        type: "success"
    });
    
    gpsId = navigator.geolocation.watchPosition(gpsSuccess, gpsError, gpsOptions);
    
});

