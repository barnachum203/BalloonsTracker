import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { LoaderService } from 'src/app/services/shared/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  isLoading = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService) {}
}
