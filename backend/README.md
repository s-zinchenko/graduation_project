select flights.flight_id, 
flights.flight_no, 
flights.aircraft_code
from flights join aircrafts 
on flights.aircraft_code = aircrafts.aircraft_code 
where aircrafts.range > 5000 limit 10;
