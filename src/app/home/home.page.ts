import { NavController, IonSlides, Platform } from '@ionic/angular';
import { Component, OnInit, ChangeDetectorRef, ViewChild, AfterContentInit, NgZone, AfterViewInit, ElementRef } from '@angular/core';

import { HttpClient } from '@angular/common/http';
declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('slides', { static: false }) slider: IonSlides;
  @ViewChild('Map', {static: false}) mapElement: ElementRef;
  map: any;
  segment = 0;
  geocoder = new google.maps.Geocoder;
  mapOptions: any;
  location = { lat: null, lng: null };
  markerOptions: any = { position: null, map: null, title: null };
  marker: any;
  public alive = true // use for subscription alive and destroye.

 
  constructor(
    public navCtrl: NavController) { }

  ngOnInit() {
    // Making sure global is should be empty;
   
  }
  ngAfterViewInit() {
    this.loadMap();
  }
  async segmentChanged() {
    console.log('segment changed called', this.segment);
    await this.slider.slideTo(this.segment);
    this.slider.update();
  }
  async slideChanged() {
    console.log('segment changed called,',this.segment+1);

    this.segment = await this.slider.getActiveIndex();
    this.focusSegment(this.segment+1);
  }
  
  focusSegment(segmentId) {
    document.getElementById('seg-'+segmentId).scrollIntoView({ 
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  }
  gotoNextSlide() {
    this.segment++;
    this.slider.slideTo(this.segment);
  }
  loadMap() {
    this.mapOptions = {
      center: this.location,
      zoom: 15,
      zoomControl: false,
      mapTypeControl: false,
      fullscreenControl: false
    };
    this.location.lat = 87;
    this.location.lng = 75;
    /*Map options*/
    
    this.markerOptions.position = this.location;
    this.markerOptions.map = this.map;
    this.markerOptions.title = 'My Location';
    this.marker = new google.maps.Marker(this.markerOptions);

    this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);

  }

  back() {
    this.navCtrl.navigateBack('my-properties');
  }
  onSubmit(values) {
    console.log(values);
    this.slider.slideNext();
  }
}
