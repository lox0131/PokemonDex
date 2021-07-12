import { Component,} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  value: string = '';
  
  constructor(private router: Router) { }

  onKey(event: any) {
    this.value = event.target.value;
    if (this.value === '') {
      this.router.navigate(['']);
    } else {
      this.router.navigate([`search/${this.value}`]);
    }
  }
} 
