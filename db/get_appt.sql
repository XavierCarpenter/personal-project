SELECT a.*, u.name, b.jobtype
FROM appointments a
    JOIN USERS u ON a.bus_id = u.id
    JOIN business b ON a.bus_id = b.id
WHERE user_id = $1;