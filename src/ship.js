function makeShip(shipLength) {
    const length = shipLength;
    let timeBeenHit = 0;
    let isSunked = false;
    function getHit() {
        timeBeenHit += 1;
        if (timeBeenHit === shipLength) {isSunked = true;}
    }
    function getTimeBeenHit() {
        return timeBeenHit;
    }
    function getSunked() {
        return isSunked;
    }
    return {length, getTimeBeenHit, getSunked, getHit};
}


module.exports = {makeShip};