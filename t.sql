SELECT trading.trade_date, trading.creator_ssn, image.price, image.category, image.image_id 
FROM trading LEFT JOIN image 
ON trading.creator_ssn = image.creator_ssn
where trading.creator_ssn = 2501;
