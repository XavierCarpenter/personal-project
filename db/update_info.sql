UPDATE users
SET name = $2, city = $3, state = $4, profilepic = $5
WHERE id = $1;