SELECT s.*, u.name, u.profilepic, b.jobtype
FROM subscriptions s
JOIN USERS u ON s.bus_id = u.id
JOIN business b ON s.bus_id = b.id
WHERE user_id = $1;