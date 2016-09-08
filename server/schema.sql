CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(40),
  email VARCHAR(40),
  phone VARCHAR(60),
  password VARCHAR(80),
  location VARCHAR(20),
  pubsub VARCHAR(80),
  pubpub VARCHAR(80),
  pubchan VARCHAR(20),
  google VARCHAR(60),
  fb VARCHAR(60)
);

CREATE TABLE modules
(
  id SERIAL PRIMARY KEY,
  type VARCHAR(20)
);

INSERT INTO modules (type) VALUES ('Door/Window Sensor');

CREATE TABLE sensors
(
  id SERIAL PRIMARY KEY,
  nickname VARCHAR(30),
  user_id INT REFERENCES users(id),
  module_id INT REFERENCES modules(id)
);

CREATE TABLE settings
(
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  module_id INT REFERENCES modules(id),
  sensor_id INT REFERENCES sensors(id),
  active BOOLEAN,
  email BOOLEAN,
  sms BOOLEAN,
  start_time time,
  end_time time
);
