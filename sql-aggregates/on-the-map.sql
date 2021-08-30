select count("cities"."name") as "numbersOfcities",
       "countries"."name" as "country"
  from "cities"
  join "countries" using ("countryId")
 group by "countryId";
