import { Aurelia } from 'aurelia';
import { RouterConfiguration } from 'aurelia-direct-router';
import { MyApp } from './my-app';

// import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/sb-admin-2.min.css'
import '../static/site.css'

Aurelia
  .register(RouterConfiguration)
  .app(MyApp)
  .start();
