-- Director/actor collaborations, ordered by numbers of times they
-- collaborated

-- Only starring roles? Or multiple actors per film? nr_order seems to be credit order, so limit to nr_order = 1
-- dir_id	movie_id	actor_id
-- COUNT(*) GROUP BY dir_id, actor_id, movie_id

-- WTF is person_role_id?? HAHA its the movie role. Where is that table?? OH, char_name, of course, how could I miss it

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
director_movies AS (SELECT DISTINCT ON (director_id, movie_id)
																n.id        AS director_id,
                          			n.name      AS director_name,
                                t.title           AS movie_title,
                            		t.id AS movie_id,
                                t.production_year AS production_year
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
                   AND mr.votes > 1000
                   ORDER BY director_id),
collabs AS (SELECT DISTINCT ON (movie_id, actor_id)
										dm.director_id as director_id,
										dm.director_name as director_name,
										dm.movie_id AS movie_id,
										dm.movie_title as movie_title,
										n.id as actor_id,
										n.name as actor_name
						FROM director_movies dm
									JOIN cast_info ci
										ON (ci.movie_id = dm.movie_id)
									JOIN name n 
										ON (n.id = ci.person_id)
									WHERE (ci.role_id = 1 OR ci.role_id = 2)
										AND (ci.nr_order = 1))
	SELECT COUNT(*) AS collab_count,
	c.director_name AS director_name,
	c.actor_name AS actor_name
	FROM collabs c 
	GROUP BY (director_name, actor_name) ORDER BY collab_count LIMIT 500;

-- Below for use locally without rankings
WITH director_movies AS (SELECT DISTINCT ON (director_id, movie_id)
																n.id        AS director_id,
                          			n.name      AS director_name,
                                t.title           AS movie_title,
                            		t.id AS movie_id,
                                t.production_year AS production_year
                   FROM name n
                            JOIN cast_info ci
                                 ON (ci.person_id = n.id)
                            JOIN role_type rt
                                 ON (ci.role_id = rt.id AND rt.role = 'director')
                            JOIN title t ON (ci.movie_id = t.id)
                            JOIN kind_type kt
                                 ON (kt.id = t.kind_id)
                   WHERE kt.kind = 'movie'
                   ORDER BY director_id),
collabs AS (SELECT DISTINCT ON (movie_id, actor_id)
										dm.director_id as director_id,
										dm.director_name as director_name,
										dm.movie_id AS movie_id,
										dm.movie_title as movie_title,
										n.id as actor_id,
										n.name as actor_name
						FROM director_movies dm
									JOIN cast_info ci
										ON (ci.movie_id = dm.movie_id)
									JOIN name n 
										ON (n.id = ci.person_id)
									WHERE (ci.role_id = 1 OR ci.role_id = 2)
										AND (ci.nr_order = 1))
	SELECT COUNT(*) as collab_count,
	c.director_name AS director_name,
	c.actor_name AS actor_name
	FROM collabs c 
	GROUP BY (director_name, actor_name) ORDER BY collab_count DESC LIMIT 500;