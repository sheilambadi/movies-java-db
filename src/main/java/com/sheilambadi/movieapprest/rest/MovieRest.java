package com.sheilambadi.movieapprest.rest;

import com.google.gson.Gson;
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
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class MovieRest {
    
    @EJB
    MovieBean movieService; 
 
    @GET
    @Path("/list_movies")
    public List<Movie> findMovie(){
       List<Movie> movies = movieService.getMovies();
       return movies;
    }
  
    @GET
    @Path("/movie_id/{id}")
    public Movie findAllMovies(@PathParam("id") int id){
       Movie movies = movieService.getMovieById(id);
       return movies;
    }
    
    @POST
    @Path("/create_movie")
    public Movie saveMovie(Movie movie){
        Gson gson = new Gson();
        System.out.println("sent object: " + gson.toJson(movie));
        movieService.createMovie(movie);
        return movie;
    }
    
    @DELETE
    @Path("/delete_movie/{id}")
    public Movie deleteMovie(@PathParam("id") int id){
       Movie movies = movieService.deleteMovie(id);
       return movies;
    }
}
