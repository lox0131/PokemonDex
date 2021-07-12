import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/services/PokeApiService/poke-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private service: PokeApiService) {}

  ngOnInit() {
    this.service.fetchPokemons();
  }
}
