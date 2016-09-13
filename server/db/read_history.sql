
SELECT history.id, history.user_id, sensor_id, alert, seen, status, time_stamp, nickname
FROM history
JOIN sensors
ON sensors.id = history.sensor_id
WHERE history.user_id = $1
AND seen = false;
