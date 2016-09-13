SELECT * FROM history
WHERE user_id = $1 AND seen = false;
