function getLocation() {

    //Get Location of user
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function (){
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
        });
        console.log(lat, long);
    }
    else {
        console.log('Location unavailable!');
    }
}