import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { Nota } from 'src/app/model/nota';
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, OnDestroy {
  map: Leaflet.Map;

  @Input('nota') nota: Nota;
  
  constructor() { }

  ngOnInit() { }
  ionViewDidEnter() { this.leafletMap(); }

  leafletMap() {
    this.map = Leaflet.map('mapId').setView([this.nota.coordenadas.lat, this.nota.coordenadas.lon], 200);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'ies Francisco de los Rios',
    }).addTo(this.map);
    let myIcon = Leaflet.divIcon({iconUrl: '../../../assets/red-marker.png'});
    Leaflet.marker([this.nota.coordenadas.lat, this.nota.coordenadas.lon], {icon: myIcon}).addTo(this.map).bindPopup(this.nota.titulo);

  }

  ngOnDestroy() {
    this.map.remove();
  }
}
