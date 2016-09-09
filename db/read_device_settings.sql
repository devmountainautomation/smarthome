SELECT active, email, sms, start_time, end_time FROM settings
WHERE sensor_id = $1;
