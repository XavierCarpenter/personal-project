SELECT b.*, u.name, u.city, u.state, u.profilepic
FROM business b
JOIN users u ON b.id = u.id