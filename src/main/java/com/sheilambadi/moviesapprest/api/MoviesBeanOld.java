/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sheilambadi.moviesapprest.api;

import com.sheilambadi.moviesapprest.entities.Movie;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

/**
 *
 * @author sheilambadi
 */
@Stateless
public class MoviesBeanOld {

    @PersistenceContext(unitName = "com.sheilambadi_MoviesAppRest_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    public MoviesBeanOld() {
    }
    
    // get all movies
    public List<Movie> getMovies() {
        TypedQuery<Movie> typedQuery = em.createQuery("SELECT m FROM Movie m", Movie.class);
        List<Movie> movies =  typedQuery.getResultList();
        return movies;
    }
    
}
