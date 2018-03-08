SELECT h.bus_id, h.mon, h.tue, h.wed, h.thur, h.fri, h.sat
FROM hours h
JOIN business b ON h.bus_id = b.id
WHERE bus_id = $1;