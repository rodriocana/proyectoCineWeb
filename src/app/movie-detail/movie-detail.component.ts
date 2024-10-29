// src/app/movie-detail/movie-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movie: any;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.params['id'];
    if (movieId) {
      this.movieService.getMovieDetails(+movieId).subscribe(
        (response) => {
          this.movie = response.body;
        },

        (error) => {
          console.error('Error al obtener detalles de la pelicula', error);
        }
      );
    }
  }
}
