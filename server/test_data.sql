INSERT INTO users (name, email, phone, password, location, pubsub, pubpub, pubchan, google, fb)
VALUES ('Craig Andersen', 'andersen.craigm@gmail.com', '8013690655', 'craig', 'America/Los_Angeles', 'fakekeys9e0dsa', 'fakekeysi902l', 'my_channel', 'fakegoogle', 'fakefacebook');
INSERT INTO users (name, email, phone, password, location, pubsub, pubpub, pubchan, google, fb)
VALUES ('Noelle Reid', 'reidnoelle2@gmail.com', '4136685669', 'noelle', 'America/Denver', 'fakekeys9e0dsa', 'fakekeysi902l', 'my_channel', 'fakegoogle', 'fakefacebook');
INSERT INTO users (name, email, phone, password, location, pubsub, pubpub, pubchan, google, fb)
VALUES ('Steven Isbell', 'steven.isbell18@gmail.com', '5412150391', 'steven', 'America/Chicago', 'fakekeys9e0dsa', 'fakekeysi902l', 'my_channel', 'fakegoogle', 'fakefacebook');
INSERT INTO users (name, email, phone, password, location, pubsub, pubpub, pubchan, google, fb)
VALUES ('Jonathan Junca', 'junca8@gmail.com', '8019202933', 'jonathan', 'America/New_York', 'fakekeys9e0dsa', 'fakekeysi902l', 'my_channel', 'fakegoogle', 'fakefacebook');
INSERT INTO users (name, email, phone, password, location, pubsub, pubpub, pubchan, google, fb)
VALUES ('Jeremy Robertson', 'jeremy@devmounta.in', '8015555555', 'jeremy', 'America/Phoenix', 'fakekeys9e0dsa', 'fakekeysi902l', 'my_channel', 'fakegoogle', 'fakefacebook');
INSERT INTO users (name, email, phone, password, location, pubsub, pubpub, pubchan, google, fb)
VALUES ('Jim Bob', 'jim_bob@aol.com', '5555555555', 'jimbob', 'America/Vancouver', 'fakekeys9e0dsa', 'fakekeysi902l', 'my_channel', 'fakegoogle', 'fakefacebook');

INSERT INTO modules (type) VALUES ('Sound Sensor');
INSERT INTO modules (type) VALUES ('Smoke Detector');
INSERT INTO modules (type) VALUES ('Motion Sensor');

INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Front door', 1, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Front door', 2, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Front door', 3, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Front door', 4, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Front door', 5, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Front door', 6, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Back door', 1, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Back door', 2, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Back door', 3, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Back door', 4, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Back door', 5, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Back door', 6, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Kids window', 1, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Kids window', 2, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Maser Bedroom window', 3, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Kids window', 4, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Kitchen window', 5, 1);
INSERT INTO sensors (nickname, user_id, module_id) VALUES ('Kids window', 6, 1);
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
VALUES (1, 1, 1, true, true, true, '10:30 PM', '07:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (2, 1, 2, true, true, true, '10:00 PM', '08:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (3, 1, 3, true, true, true, '10:30 PM', '06:30 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (4, 1, 4, true, true, true, '11:00 PM', '07:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (5, 1, 5, true, true, true, '12:30 AM', '05:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (6, 1, 6, true, true, true, '10:00 PM', '07:30 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (1, 1, 7, true, true, true, '10:30 PM', '07:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (2, 1, 8, true, true, true, '10:00 PM', '08:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (3, 1, 9, true, true, true, '10:30 PM', '06:30 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (4, 1, 10, true, true, true, '11:00 PM', '07:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (5, 1, 11, true, true, true, '12:30 AM', '05:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (6, 1, 12, true, true, true, '10:00 PM', '07:30 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (1, 1, 13, true, true, true, '10:30 PM', '07:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (2, 1, 14, true, true, true, '10:00 PM', '08:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (3, 1, 15, true, true, true, '10:30 PM', '06:30 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (4, 1, 16, true, true, true, '11:00 PM', '07:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (5, 1, 17, true, true, true, '12:30 AM', '05:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (6, 1, 18, true, true, true, '10:00 PM', '07:30 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (1, 4, 19, true, true, true, '10:30 PM', '07:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (2, 4, 20, true, true, true, '10:00 PM', '08:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (3, 4, 21, true, true, true, '10:30 PM', '06:30 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (4, 4, 22, true, true, true, '11:00 PM', '07:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (5, 4, 23, true, true, true, '12:30 AM', '05:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (6, 4, 24, true, true, true, '10:00 PM', '07:30 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (2, 3, 25, true, true, true, null, null);
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (3, 3, 26, true, true, true, null, null);
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (5, 3, 27, true, true, true, null, null);
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (6, 3, 28, true, true, true, null, null);
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (1, 2, 29, true, true, true, '10:30 PM', '07:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (4, 2, 30, true, true, true, '11:00 PM', '07:00 AM');
INSERT INTO settings (user_id, module_id, sensor_id, active, email, sms, start_time, end_time)
VALUES (5, 2, 31, true, true, true, '12:30 AM', '05:00 AM');
