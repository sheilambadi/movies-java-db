/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sheilambadi.movieapprest.rest;

import com.google.gson.Gson;
import com.sheilambadi.moviesapprest.api.MoviesBeanOld;
import com.sheilambadi.moviesapprest.entities.Movie;
import com.sheilambadi.moviesapprest.bean.MovieBean;
import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author sheilambadi
 */

@Path("/movie")
@Stateless
public class MovieRest {
    
    @EJB
    MovieBean movieService; 
 
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
    
    @POST
    @Path("/create_movie")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Movie saveMovie(Movie movie){
        Gson gson = new Gson();
        System.out.println("sent object: " + gson.toJson(movie));
        movieService.createMovie(movie);
        return movie;
    }
    
    @DELETE
    @Path("/delete_movie/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Movie deleteMovie(@PathParam("id") int id){
       Movie movies = movieService.deleteMovie(id);
       return movies;
    }
}
