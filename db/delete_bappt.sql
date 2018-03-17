DELETE FROM appointments 
WHERE bus_id = $1
AND user_id = $2;