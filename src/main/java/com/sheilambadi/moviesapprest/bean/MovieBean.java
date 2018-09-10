package com.sheilambadi.moviesapprest.bean;

import com.sheilambadi.moviesapprest.entities.Movie;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

/**
 *;
 * @author sheilambadi
 */

@Stateless
public class MovieBean {
    @PersistenceContext
    EntityManager em;
    
    // get all movies
    public List<Movie> getMovies(){
        TypedQuery<Movie> typedQuery = em.createQuery("SELECT m FROM Movie m", Movie.class);
        List<Movie> movies =  typedQuery.getResultList();
        return movies;
    }
   
    // get movie by id
    public Movie getMovieById(int id){
        Movie movie = em.find(Movie.class, id);
        return movie;
    }
    
    // save movie to db
    public Movie createMovie(Movie movie){
        em.persist(movie);
        em.flush();
        return movie;
    }
    
    // delete movie from DB
    public Movie deleteMovie(int id){
        Movie movie = em.find(Movie.class, id);
        em.remove(movie);
        return movie;
    }
    
    
}
