UPDATE business
SET jobtype = $2, email = $3, phone = $4, address = $5, bio = $6
WHERE id = $1;