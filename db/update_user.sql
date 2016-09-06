UPDATE users SET name = $2, email = $3, phone = $4, pubsub = $5, pubpub = $6, pubchan = $7
WHERE id = $1;
