SELECT a.*, u.name
FROM appointments a
    JOIN USERS u ON a.user_id = u.id
WHERE a.bus_id = $1;