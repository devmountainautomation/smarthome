UPDATE users SET name = $2, email = $3, phone = $4, password = $5, pubsub = $6, pubpub = $7, pubchan = $8
WHERE id = $1;
