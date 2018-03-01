SELECT s.user_id, s.bus_id, b.name, b.jobtype
FROM subscriptions s
JOIN business b ON S.bus_id = b.id
WHERE user_id = $1;