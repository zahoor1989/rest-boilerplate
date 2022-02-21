
const calculatDistance = (venue, office, unit) => {
let {longitude, latitude} = venue;
let officeLati = office.split(',')[0];
let officLong =  office.split(',')[1];

    // degrees to radians.
    longitude =  longitude * Math.PI / 180;
    latitude = latitude * Math.PI / 180;
    officLong = officLong * Math.PI / 180;
    officeLati = officeLati * Math.PI / 180;

    // Haversine formula
    let dlon = officLong - longitude;
    let dlat = officeLati - latitude;
    let a = Math.pow(Math.sin(dlat / 2), 2)
            + Math.cos(latitude) * Math.cos(officeLati)
            * Math.pow(Math.sin(dlon / 2),2);
    let c = 2 * Math.asin(Math.sqrt(a));
    let r = unit && unit === 'KM' ? 6371 : 3956 ;    // Radius of earth in kilometers. Use 3956 for miles
    // calculate the result
    return(c * r);
}
module.exports = {
  calculatDistance
  };