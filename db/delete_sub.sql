DELETE FROM subscriptions
WHERE user_id = $1
AND bus_id = $2;