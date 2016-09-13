SELECT sensors.id FROM sensors
WHERE nickname = $1
AND user_id = $2; 
