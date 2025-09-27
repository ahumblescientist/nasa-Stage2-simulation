# This is a visualization for modelling "The Shadow Brokers" Team Solution to problem 2 in stage 2 in SAPA hackathon

## The Model
1. we are modelling recycable objects with green cubes, and unwanted objects with red
2. objects are attracted and repelled on demand
3. red objects are such that we attract them then repell them
4. green objects are attracted then thrown away

## The Algorithm
1. The space ship gets data about debris from various sensors on earth (we used a simple 1D to store the data).
2. it looks for the closest object that is calculated to intersect with the earth atmosphere (modelling the earth as a sphere and the objects paths as rays, we used a simple ray-sphere intersection equation).
3. the ship attracts the object using magnetic field (modelled as a line here).
4. if the object is of type red, the ship will repell it.
5. if the object is of type green, are stored in the ship.

## The GUI
### controller GUI
1. can control simulation speed: simSpeed.
2. can control space ship speed: shipSpeed.
3. can control the amount of "red" and "green" objects: red, and green respectivly.

### data GUI
1. views the amount of red objects repelled: repelled.
2. views the amount of green objects recycled: recycled.

