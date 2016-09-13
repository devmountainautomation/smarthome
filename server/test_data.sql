INSERT INTO users (name, email, phone, password, location, pubsub, pubpub, pubchan, photo, google, fb)
VALUES ('Craig Andersen', 'andersen.craigm@gmail.com', '8013690655', '$2a$10$JxVR/IumyRGkM87QhJzwkOq2bB7igigK3yte/6dkkXEEJ02Fveu/C', 'America/Los_Angeles', null, null, null, null, null, null);
INSERT INTO users (name, email, phone, password, location, pubsub, pubpub, pubchan, photo, google, fb)
VALUES ('Noelle Reid', 'reidnoelle2@gmail.com', '8019606245', '$2a$10$istbkvCPQrwYmdAW.hERMOs2/aqkwu/uXzuqqTBWoYoRd.6Hego.y', 'America/Denver', null, null, null, null, null, null);
INSERT INTO users (name, email, phone, password, location, pubsub, pubpub, pubchan, photo, google, fb)
VALUES ('Steven Isbell', 'steven.isbell18@gmail.com', '5412150391', '$2a$10$AelEHJI2GSSe7ZRGMxkGre6LbSdeWEHl854BDgZ7g6G5lHw1SUKnG', 'America/Chicago', null, null, null, null, null, null);
INSERT INTO users (name, email, phone, password, location, pubsub, pubpub, pubchan, photo, google, fb)
VALUES ('Jonathan Junca', 'junca8@gmail.com', '8019202933', '$2a$10$FAm8BdNiAUPnOO8rVEMk/uN4ZZoz5rd60fIMsU2.8RdNIb2q9Ja4.', 'America/New_York', null, null, null, null, null, null);
INSERT INTO users (name, email, phone, password, location, pubsub, pubpub, pubchan, photo, google, fb)
VALUES ('Jeremy Robertson', 'jeremy@devmounta.in', '8015555555', '$2a$10$RQ1CZJ92p3Cjtc8JOxWg7.Io6iVbI.kl/Yowrlf2zljrbIHwjIiOa', 'America/Phoenix', null, null, null, null, null, null);
INSERT INTO users (name, email, phone, password, location, pubsub, pubpub, pubchan, photo, google, fb)
VALUES ('Jim Bob', 'jim_bob@aol.com', '5555555555', '$2a$10$eu8PD5V2/WrOLuzWCdvbWuxJmVjKgs67WcR.NZj6zefgLi2Oxzckq', 'America/Vancouver', null, null, null, null, null, null);

INSERT INTO modules (type) VALUES ('Sound Sensor');
INSERT INTO modules (type) VALUES ('Smoke Detector');
INSERT INTO modules (type) VALUES ('Motion Sensor');

INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Front Door', 1, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Front Door', 2, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Front Door', 3, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Front Door', 4, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Front Door', 5, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Front Door', 6, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Back Door', 1, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Back Door', 2, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Back Door', 3, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Back Door', 4, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Back Door', 5, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Back Door', 6, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Kids Window', 1, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Kids Window', 2, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Master Bedroom Window', 3, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Kids Window', 4, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Kitchen Window', 5, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Kids Window', 6, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Living Room Motion', 1, 4);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Living Room Motion', 2, 4);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Living Room Motion', 3, 4);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Living Room Motion', 4, 4);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Living Room Motion', 5, 4);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Living Room Motion', 6, 4);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Kitchen Smoke Detector', 2, 3);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Kitchen Smoke Detector', 3, 3);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Kitchen Smoke Detector', 5, 3);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Kitchen Smoke Detector', 6, 3);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Laundry Sensor', 1, 2);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Laundry Sensor', 4, 2);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Laundry Sensor', 5, 2);

INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (1, 1, 1, true, true, true, '2016-09-12 10:30 PM', '2016-09-12 07:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (2, 1, 2, true, true, true, '2016-09-12 10:00 PM', '2016-09-12 08:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (3, 1, 3, true, true, true, '2016-09-12 10:30 PM', '2016-09-12 06:30 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (4, 1, 4, true, true, true, '2016-09-12 11:00 PM', '2016-09-12 07:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (5, 1, 5, true, true, true, '2016-09-12 12:30 AM', '2016-09-12 05:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (6, 1, 6, true, true, true, '2016-09-12 10:00 PM', '2016-09-12 07:30 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (1, 1, 7, true, true, true, '2016-09-12 10:30 PM', '2016-09-12 07:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (2, 1, 8, true, true, true, '2016-09-12 10:00 PM', '2016-09-12 08:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (3, 1, 9, true, true, true, '2016-09-12 10:30 PM', '2016-09-12 06:30 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (4, 1, 10, true, true, true, '2016-09-12 11:00 PM', '2016-09-12 07:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (5, 1, 11, true, true, true, '2016-09-12 12:30 AM', '2016-09-12 05:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (6, 1, 12, true, true, true, '2016-09-12 10:00 PM', '2016-09-12 07:30 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (1, 1, 13, true, true, true, '2016-09-12 10:30 PM', '2016-09-12 07:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (2, 1, 14, true, true, true, '2016-09-12 10:00 PM', '2016-09-12 08:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (3, 1, 15, true, true, true, '2016-09-12 10:30 PM', '2016-09-12 06:30 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (4, 1, 16, true, true, true, '2016-09-12 11:00 PM', '2016-09-12 07:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (5, 1, 17, true, true, true, '2016-09-12 12:30 AM', '2016-09-12 05:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (6, 1, 18, true, true, true, '2016-09-12 10:00 PM', '2016-09-12 07:30 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (1, 4, 19, true, true, true, '2016-09-12 10:30 PM', '2016-09-12 07:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (2, 4, 20, true, true, true, '2016-09-12 10:00 PM', '2016-09-12 08:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (3, 4, 21, true, true, true, '2016-09-12 10:30 PM', '2016-09-12 06:30 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (4, 4, 22, true, true, true, '2016-09-12 11:00 PM', '2016-09-12 07:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (5, 4, 23, true, true, true, '2016-09-12 12:30 AM', '2016-09-12 05:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (6, 4, 24, true, true, true, '2016-09-12 10:00 PM', '2016-09-12 07:30 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (2, 3, 25, true, true, true, null, null);
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (3, 3, 26, true, true, true, null, null);
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (5, 3, 27, true, true, true, null, null);
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (6, 3, 28, true, true, true, null, null);
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (1, 2, 29, true, true, true, '2016-09-12 10:30 PM', '2016-09-12 07:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (4, 2, 30, true, true, true, '2016-09-12 11:00 PM', '2016-09-12 07:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (5, 2, 31, true, true, true, '2016-09-12 12:30 AM', '2016-09-12 05:00 AM');

INSERT INTO history (user_id, sensor_id, alert, seen, status, time_stamp) VALUES (3, 1, true, false, 'Open', '2016-09-12 14:41:45');
INSERT INTO history (user_id, sensor_id, alert, seen, status, time_stamp) VALUES (3, 1, true, false, 'Open', '2016-09-12 14:41:55');
INSERT INTO history (user_id, sensor_id, alert, seen, status, time_stamp) VALUES (3, 1, true, false, 'Open', '2016-09-12 14:32:45');
INSERT INTO history (user_id, sensor_id, alert, seen, status, time_stamp) VALUES (3, 1, true, false, 'Open', '2016-09-12 14:32:48');
INSERT INTO history (user_id, sensor_id, alert, seen, status, time_stamp) VALUES (3, 1, true, false, 'Open', '2016-09-12 14:41:45');
INSERT INTO history (user_id, sensor_id, alert, seen, status, time_stamp) VALUES (3, 1, true, false, 'Open', '2016-09-12 14:41:45');
INSERT INTO history (user_id, sensor_id, alert, seen, status, time_stamp) VALUES (3, 1, true, false, 'Open', '2016-09-12 14:41:45');
INSERT INTO history (user_id, sensor_id, alert, seen, status, time_stamp) VALUES (3, 1, true, false, 'Open', '2016-09-12 14:41:45');
INSERT INTO history (user_id, sensor_id, alert, seen, status, time_stamp) VALUES (3, 1, true, false, 'Open', '2016-09-12 14:41:45');
INSERT INTO history (user_id, sensor_id, alert, seen, status, time_stamp) VALUES (3, 1, true, false, 'Open', '2016-09-12 14:41:45');
INSERT INTO history (user_id, sensor_id, alert, seen, status, time_stamp) VALUES (3, 1, true, false, 'Open', '2016-09-12 14:41:45');
INSERT INTO history (user_id, sensor_id, alert, seen, status, time_stamp) VALUES (3, 1, true, false, 'Open', '2016-09-12 14:41:45');
INSERT INTO history (user_id, sensor_id, alert, seen, status, time_stamp) VALUES (3, 1, true, false, 'Open', '2016-09-12 14:41:45');
INSERT INTO history (user_id, sensor_id, alert, seen, status, time_stamp) VALUES (3, 1, true, false, 'Open', '2016-09-12 14:41:45');
INSERT INTO history (user_id, sensor_id, alert, seen, status, time_stamp) VALUES (3, 1, true, false, 'Open', '2016-09-12 14:41:45');
INSERT INTO history (user_id, sensor_id, alert, seen, status, time_stamp) VALUES (3, 1, true, false, 'Open', '2016-09-12 14:41:45');
