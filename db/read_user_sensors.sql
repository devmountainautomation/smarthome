SELECT sensors.id, nickname, module_id, type FROM sensors
JOIN modules
ON modules.id = sensors.module_id
WHERE sensors.user_id = $1;
