-- Movies with sequels sorted by the biggest difference in rating
-- between the first and second movies.


-- ABANDONED BECAUSE THE DATA IS MISSING
-- WITH sequel_links AS (SELECT
-- 	ml.id as link_id, 
-- 	ml.movie_id as first_movie_id,
-- 	ml.linked_movie_id as second_movie_id
-- 		FROM movie_link ml
-- 			WHERE ml.link_type_id=2
-- ),
-- movie_ratings AS (SELECT
-- 	sl.link_id as link_id, 
-- 	mii.movie_id AS movie_id,
-- 	t.title AS title,
-- 	t.production_year AS production_year,
--   CAST(mii.info AS DECIMAL(3, 1)) AS rating,
--   CAST(mii2.info AS INTEGER)      AS votes
-- 		FROM movie_info_idx mii
-- 				JOIN title t
-- 							ON (t.id = mii.movie_id)	
-- 		    JOIN info_type it
-- 		         ON (it.id = mii.info_type_id AND it.info = 'rating')
-- 		    JOIN movie_info_idx mii2
-- 		         ON (mii2.movie_id = mii.movie_id)
-- 		    JOIN info_type it2
-- 		         ON (it2.id = mii2.info_type_id AND it2.info = 'votes')
--        RIGHT OUTER JOIN sequel_links sl
-- 		         ON (mii.movie_id = sl.first_movie_id OR mii.movie_id = sl.second_movie_id)
--          )
-- SELECT 											mr.link_id as link_id,
-- 														mr.movie_id AS movie_id,
-- 														mr.title AS title,
-- 														mr.rating AS rating,
-- 														mr.votes AS votes,
-- 														mr.rating - lag(mr.rating) OVER (
--                                    PARTITION BY mr.link_id ORDER BY mr.production_year ASC) as rating_drop
--                      FROM movie_ratings mr
--                      RIGHT OUTER JOIN title t
--                      	ON (mr.movie_id = t.id)
--                      RIGHT OUTER JOIN kind_type kt
--                          ON (kt.id = t.kind_id)
--                          WHERE kt.kind = 'movie'
--                            AND mr.votes > 1000 
--                            ORDER BY link_id;

WITH sequel_links AS (SELECT
	ml.id as link_id, 
	ml.movie_id as first_movie_id,
	ml.linked_movie_id as second_movie_id,
	t1.title as first_movie_title,
	t2.title as second_movie_title,
	kt.kind as first_kind,
	kt2.kind as second_kind,
	lt.link as link
		FROM movie_link ml
		JOIN title t1
			ON (t1.id = ml.movie_id)
		JOIN title t2
			ON (t2.id = ml.linked_movie_id)
		JOIN kind_type kt
			ON (t1.kind_id = kt.id)
		JOIN kind_type kt2
			ON (t2.kind_id = kt2.id)
		JOIN link_type lt
			ON (ml.link_type_id = lt.id)
		WHERE (kt.id = 1 OR kt2.id = 1)
		AND (lt.link = 'followed by' OR lt.link = 'follows')
)
SELECT
	sl.link_id as link_id, 
	mii.movie_id AS movie_id,
	kt.id as kind_id,
	t.title AS title,
	t.production_year AS production_year,
  CAST(mii.info AS DECIMAL(3, 1)) AS rating,
  CAST(mii2.info AS INTEGER)      AS votes
		FROM movie_info_idx mii
		    JOIN info_type it
		         ON (it.id = mii.info_type_id AND it.info = 'rating')
		    JOIN movie_info_idx mii2
		         ON (mii2.movie_id = mii.movie_id)
		    JOIN info_type it2
		         ON (it2.id = mii2.info_type_id AND it2.info = 'votes')
       RIGHT OUTER JOIN sequel_links sl
		         ON (mii.movie_id = sl.first_movie_id OR mii.movie_id = sl.second_movie_id)
       JOIN title t
							ON (t.id = mii.movie_id)
				JOIN kind_type kt
             ON (kt.id = t.kind_id)
             WHERE kind_id = 1
     			ORDER BY link_id;


Select lt.link, COUNT(*) FROM movie_link ml 
		JOIN title t1
			ON (t1.id = ml.movie_id)
		JOIN title t2
			ON (t2.id = ml.linked_movie_id)
		JOIN kind_type kt
			ON (t1.kind_id = kt.id)
		JOIN kind_type kt2
			ON (t2.kind_id = kt2.id)
		JOIN link_type lt
			ON (ml.link_type_id = lt.id)
		WHERE (kt.id = 1 OR kt2.id = 1)
		AND (lt.link = 'followed by' OR lt.link = 'follows')
		GROUP BY lt.link;