select "categories"."name" as "categories",
       count("categories"."name") as "numbers"
  from "categories"
  join "filmCategory" using ("categoryId")
  join "castMembers" using ("filmId")
  join "actors" using ("actorId")
 where "actors"."firstName" = 'Lisa'
   and "actors"."lastName" = 'Monroe'
 group by "categoryId";
