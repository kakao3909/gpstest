// 戻り値でIDが返る（監視を終わらせる際に使用します）
var gpsId = null;
var compassId = null;
var target, options;
var heading = 0;

var latlng = null;
var map = null;
var map_opts = null;
var pos_marker = null;

function gpsSuccess(a) {
  var pos = a.coords;

  notif({
    msg: "<b>精度:</b>" + pos.accuracy,
    type: "success",
    time: 1500
  });

  if(pos.heading != null){
    if(heading |= pos.heading){
      heading = pos.heading;

    }
  }

  //座標設定
  latlng = new google.maps.LatLng(pos.latitude, pos.longitude);
  //地図移動
  map.panTo(latlng);
  //ピン表示
  pos_marker.setOptions({
    position: latlng,
    title:'現在地'
  });
  //地図の回転
  map.setHeading(180);

  $("#latitude").text(pos.latitude);
  $("#longitude").text(pos.longitude);
  $("#accuracy").text(pos.accuracy);
  $("#altitude").text(pos.altitude);
  $("#altitudeAccuracy").text(pos.altitudeAccuracy);
  $("#heading").text(heading);
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
  maximumAge: 0,
  rotateControl : true
};

function compassSuccess(heading) {
  $("#compass").text(heading.magneticHeading);
}

function compassError(compassError) {
  notif({
    msg: "<b>Commpas ERROR:" + compassError.code,
    type: "error"
  });
}

var compassOptions = {
  frequency: 1000
};

//googlemap 初期化
function initialize() {
  latlng = new google.maps.LatLng(33.2408362, 131.6003257);
  map_opts = {
    zoom: 17,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI : 'disable'
  };
  map = new google.maps.Map(document.getElementById("map_canvas"), map_opts);
  pos_marker = new google.maps.Marker({
    position: latlng,
    map: map,
    animation : google.maps.Animation.BOUNCE,
    clickable : false
  });
}


$(function() {
  notif({
    msg: "<b>Success:</b> In 5 seconds i'll be gone",
    type: "success"
  });

  gpsId = navigator.geolocation.watchPosition(gpsSuccess, gpsError, gpsOptions);
  initialize();


});
