/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sheilambadi.movieapprest.rest;

import com.sheilambadi.moviesapprest.entities.Movie;
import com.sheilambadi.moviesapprest.services.MovieService;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author sheilambadi
 */

@Path("/movie")
public class MovieRest {
    
    MovieService movieService = new MovieService();
    
    @GET
    @Path("/list_movies")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Movie> findMovie(){
       List<Movie> movies = movieService.getMovies();
       return movies;
    }
    
    @GET
    @Path("/movie_id/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Movie findAllMovies(@PathParam("id") int id){
       Movie movies = movieService.getMovieById(id);
       return movies;
    }
}
