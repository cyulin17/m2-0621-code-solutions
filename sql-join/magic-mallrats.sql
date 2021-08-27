select "firstName",
       "lastName",
       "title"
  from "customers"
  join "rentals" using ("customerId")
  join "inventory" using ("inventoryId")
  join "films" using ("filmId")
 where  "title" = 'Magic Mallrats';
