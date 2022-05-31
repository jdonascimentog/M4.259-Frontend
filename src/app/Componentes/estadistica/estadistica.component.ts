import { Component, OnInit } from '@angular/core';
import { EstadisticaDTO } from 'src/app/Modelos/estadistica.dto';
import { EstadisticaService } from 'src/app/Servicios/estadistica.service';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss'],
})
export class EstadisticaComponent implements OnInit {
  estadisticas: EstadisticaDTO[] = [];
  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  gradient = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  view: any[] = [700, 800];
  colorScheme = {
    domain: [
      '#0d6efd',
      '#6610f2',
      '#C7B42C',
      '#6f42c1',
      '#d63384',
      '#dc3545',
      '#fd7e14',
      '#ffc107',
      '#198754',
      '#20c997',
      '#0dcaf0',
      '#adb5bd',
      '#000000',
    ],
  };
  constructor(private estadisticaService: EstadisticaService) {}

  ngOnInit(): void {
    let errorResponse: any;
    this.estadisticaService.getEstadisticas().subscribe({
      next: (stats: EstadisticaDTO[]) => {
        this.estadisticas = stats;
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });
  }

  onSelect(event: any) {
    console.log(event);
  }
}
