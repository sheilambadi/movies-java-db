/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sheilambadi.moviesapprest.services;

import com.sheilambadi.moviesapprest.entities.Movie;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;

/**
 *
 * @author sheilambadi
 */

public class MovieService {
    // @PersistenceContext(unitName = "com.sheilambadi_MoviesAppRest_war_1.0-SNAPSHOTPU")
    EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("com.sheilambadi_MoviesAppRest_war_1.0-SNAPSHOTPU");
    EntityManager em = entityManagerFactory.createEntityManager();
    
    // get all movies
    public List<Movie> getMovies(){
        TypedQuery<Movie> typedQuery = em.createQuery("SELECT m FROM Movie m", Movie.class);
        List<Movie> movies =  typedQuery.getResultList();
        return movies;
    }
    
    public Movie getMovieById(int id){
        Movie movie = em.find(Movie.class, id);
        return movie;
    }
}
