UPDATE settings SET active = $3, email = $4, sms = $5, start_time = $6, end_time = $7
WHERE module_id = $1
AND user_id = $2;
