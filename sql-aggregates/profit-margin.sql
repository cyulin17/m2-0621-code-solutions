WITH cte_inventory AS (
  SELECT
    "filmId",
    count("filmId") as "numbers"
  FROM inventory
  GROUP BY "filmId"
),
cte_payments AS (
     SELECT
     "filmId",
     SUM("amount") as "revenue"
     FROM "payments"
     JOIN "rentals" using ("rentalId")
     JOIN "inventory" using ("inventoryId")
     GROUP BY "filmId"
)
SELECT "title",
       "description",
       "rating",
       "revenue" - ("replacementCost" * "numbers")  as "totalProfit"
FROM "films"
JOIN cte_inventory using ("filmId")
JOIN cte_payments using ("filmId")
order by "totalProfit" desc
limit 5;
