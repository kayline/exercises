-- Movies with sequels sorted by the biggest difference in rating
-- between the first and second movies.

WITH sequel_links AS (SELECT
	ml.id as link_id, 
	ml.movie_id as first_movie_id,
	ml.linked_movie_id as second_movie_id
		FROM movie_link ml
			WHERE ml.link_type_id=2
),
movie_ratings AS (SELECT
	sl.link_id as link_id, 
	mii.movie_id AS movie_id,
  CAST(mii.info AS DECIMAL(3, 1)) AS rating,
  CAST(mii2.info AS INTEGER)      AS votes
		FROM movie_info_idx mii
		    JOIN info_type it
		         ON (it.id = mii.info_type_id AND it.info = 'rating')
		    JOIN movie_info_idx mii2
		         ON (mii2.movie_id = mii.movie_id)
		    JOIN info_type it2
		         ON (it2.id = mii2.info_type_id AND it2.info = 'votes')
		         OUTER JOIN sequel_links sl
		         ON (mii.movie_id = sl.first_movie_id OR mii.movie_id = sl.second_movie_id)
         ),