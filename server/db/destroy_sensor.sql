DELETE FROM sensors
WHERE user_id = $1
AND nickname = $2;
