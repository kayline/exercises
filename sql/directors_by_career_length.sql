-- Directors by length of career, as measured by difference in
-- release of the first movie and last movie

-- director_id    director_name    career_length

WITH movie_ratings AS (SELECT mii.movie_id                    AS movie_id,
                              CAST(mii.info AS DECIMAL(3, 1)) AS rating,
                              CAST(mii2.info AS INTEGER)      AS votes
                       FROM movie_info_idx mii
                                JOIN info_type it
                                     ON (it.id = mii.info_type_id AND it.info = 'rating')
                                JOIN movie_info_idx mii2
                                     ON (mii2.movie_id = mii.movie_id)
                                JOIN info_type it2
                                     ON (it2.id = mii2.info_type_id AND it2.info = 'votes')),
director_movies AS (SELECT n.id        AS director_id,
                          n.name      AS director_name,
                                  t.production_year AS production_year,
                                  t.title           AS movie_title,
                                  production_year - first_value(production_year) OVER (
                                   PARTITION BY n.id ORDER BY production_year ASC) as career_length                                
                   FROM name n
                            JOIN cast_info ci
                                 ON (ci.person_id = n.id)
                            JOIN role_type rt
                                 ON (ci.role_id = rt.id AND rt.role = 'director')
                            JOIN title t ON (ci.movie_id = t.id)
                            JOIN movie_ratings mr
                                         ON (mr.movie_id = t.id)
                            JOIN kind_type kt
                                 ON (kt.id = t.kind_id)
                   WHERE kt.kind = 'movie'
                   AND mr.votes > 1000),
director_movie_rankings AS (SELECT dm.director_id as director_id,
                              dm.director_name as director_name,
                              dm.movie_title as title,
                              dm.career_length as career_length,
                              DENSE_RANK() OVER (
                                   PARTITION BY director_id
                                   ORDER BY career_length DESC
                                   ) as longevity_ranking
                              FROM director_movies dm
)


SELECT dmr.director_id as director_id,
dmr.director_name as director_name,
dmr.career_length as career_length
FROM director_movie_rankings dmr
WHERE longevity_ranking=1 AND career_length > 0 ORDER BY career_length DESC;


