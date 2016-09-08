UPDATE users SET phone = $2, password = $3
WHERE email = $1;
