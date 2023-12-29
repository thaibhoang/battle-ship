const {makeShip} = require('./ship');

test('3 length ship', () => {
    const ship3 = makeShip(3)
    ship3.getHit();
    ship3.getHit();
    ship3.getHit();
    expect(ship3.length).toBe(3);
    expect(ship3.getTimeBeenHit()).toBe(3);    
    expect(ship3.getSunked()).toBe(true);
});