SELECT b.*, u.name, u.city, u.state, u.profilepic, m.service, m.price
FROM business b
    JOIN users u ON b.id = u.id
    JOIN menu m ON b.id = m.id
WHERE b.id = $1;