//https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#ECMAScript_(JavaScript/ActionScript,_etc.)

export const lon2tile = (lon,zoom) => {
    return (Math.floor((lon+180)/360*Math.pow(2,zoom)));
}
export const lat2tile = (lat,zoom) => {
    return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom)));
}