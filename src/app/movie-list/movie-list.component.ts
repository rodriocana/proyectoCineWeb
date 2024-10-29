// src/app/movie-list/movie-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(response => {
      this.movies = response.results;
    });
  }

  goToMovieDetails(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }
}
