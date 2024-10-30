import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Importa Router y ActivatedRoute
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movie: any;
  backdrops: string[] = []; // Array para almacenar las imágenes de fondo

  constructor(
    private activatedRoute: ActivatedRoute, // Inyecta ActivatedRoute
    private movieService: MovieService,
    private router: Router // Inyecta Router
  ) {}

  ngOnInit(): void {
    const movieId = this.activatedRoute.snapshot.params['id'];  // aqui cogemos el id de la ruta movies
    if (movieId) {
      this.movieService.getMovieDetails(+movieId).subscribe(
        response => {
          this.movie = response.body;
        },

        error => {
          console.error('Error al obtener detalles de la pelicula', error);
        }
      );

       // Obtener las imágenes de fondo
       this.movieService.getMovieImages(+movieId).subscribe(
        response => {
          this.backdrops = response.backdrops.slice(0, 6).map((img: any) => `https://image.tmdb.org/t/p/w500${img.file_path}`);
        },
        error => {
          console.error('Error al obtener imágenes de la película', error);
        }
      );

    }
  }

  verSinopsis(): void {
    alert(this.movie.overview); // Muestra la sinopsis en un alert
  }

  goBack(): void {  // para volver atrás pulsando el boton volver.
    this.router.navigate(['/movies']); // Navega a la ruta de movie-list
  }


}
