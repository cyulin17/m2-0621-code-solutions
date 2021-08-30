select "customers"."firstName",
       "customers"."lastName",
       sum("payments"."amount") as "Total"
  from "customers"
  join "payments" using ("customerId")
  group by "customerId"
  order by sum("payments"."amount") desc;
