function create_geohash(lat,long,radius,precision,georaptor_flag = false,minlevel=1,maxlevel=12){
    x = 0.0
    y = 0.0
    points = []
    geohashes = []
    grid_width = [5009400.0, 1252300.0, 156500.0, 39100.0, 4900.0, 1200.0, 152.9, 38.2, 4.8, 1.2, 0.149, 0.0370]
    grid_height = [4992600.0, 624100.0, 156000.0, 19500.0, 4900.0, 609.4, 152.4, 19.0, 4.8, 0.595, 0.149, 0.0199]
    height = (grid_height[precision - 1])/2
    width = (grid_width[precision-1])/2
    lat_moves = int(Math.ceil(radius / height))
    lon_moves = int(Math.ceil(radius / width)) 
    for (var i=0;i<lat_moves;i++){
        temp_lat = y + height*i;
        for (var j = 0;j<lon_moves;j++){
            temp_lon = x + width*j
            if( in_circle_check(temp_lat, temp_lon, y, x, radius) ){
                x_cen, y_cen = get_centroid(temp_lat, temp_lon, height, width)
                lat, lon = convert_to_latlon(y_cen, x_cen, latitude, longitude)
                points += [[lat, lon]]
                lat, lon = convert_to_latlon(-y_cen, x_cen, latitude, longitude)
                points += [[lat, lon]]
                lat, lon = convert_to_latlon(y_cen, -x_cen, latitude, longitude)
                points += [[lat, lon]]
                lat, lon = convert_to_latlon(-y_cen, -x_cen, latitude, longitude)
                points += [[lat, lon]]
            }
        }

    }
    points.forEach( (point)=> {
        geohashes += [Geohash.encode(point[0], point[1], precision)]
    })

    return (georaptor_flag === true) ? ( georaptor.compress(set(geohashes), int(minlevel), int(maxlevel)) ).join() : (Array.from( set(geohashes) )).join()
}

function convert_to_latlon(y,x,lat,long){
    pi = 3.14159265359;
    r_earth = 6371000;
    lat_diff = (y / r_earth) * (180 / pi)
    lon_diff = (x / r_earth) * (180 / pi) / Math.cos(latitude * pi/180)

    final_lat = latitude+lat_diff
    final_lon = longitude+lon_diff

    return [final_lat, final_lon]
}

function in_circle_check(lat,long,centre_lat,centre_lon,radius){
    x_diff = long - centre_lon;
    y_diff = lat - centre_lat;
    return ( Math.pow(x_diff,2)+Math.pow(y_diff,2) <= Math.pow(radius,2) )? true:false


function get_centroid(lat,long,height,width){
    y_cen = lat + (height / 2)
    x_cen = long + (width / 2)

    return [x_cen, y_cen];
}