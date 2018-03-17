DELETE FROM appointments 
WHERE bus_id = $2
 AND user_id = $1;