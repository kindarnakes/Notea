import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import {icon, Marker} from 'leaflet';
import { Nota } from 'src/app/model/nota';
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, OnDestroy {
  map: Leaflet.Map;

  iconRetinaUrl = 'assets/marker-icon-2x.png';
  iconUrl = 'assets/marker-icon.png';
  shadowUrl = 'assets/marker-shadow.png';
  iconDefault = icon({
 iconRetinaUrl:this.iconRetinaUrl,
 iconUrl:this.iconUrl,
 shadowUrl:this.shadowUrl,
 iconSize: [25, 41],
 iconAnchor: [12, 41],
 popupAnchor: [1, -34],
 tooltipAnchor: [16, -28],
 shadowSize: [41, 41]
});

  @Input('nota') nota: Nota;

  constructor() {
    Marker.prototype.options.icon = this.iconDefault;
   }

  ngOnInit() { }
  ionViewDidEnter() { this.leafletMap(); }

  leafletMap() {
    console.log([this.nota.latitud, this.nota.longitud]);
    this.map = Leaflet.map('mapId').setView([this.nota.latitud, this.nota.longitud], 200);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'ies Francisco de los Rios',
    }).addTo(this.map);

    
    
    Leaflet.marker([this.nota.latitud, this.nota.longitud]).addTo(this.map).bindPopup(this.nota.titulo);

  }

  ngOnDestroy() {
    this.map.remove();
  }
}
