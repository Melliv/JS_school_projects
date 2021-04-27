import { Aurelia, RouterConfiguration } from 'aurelia';
import { MyApp } from './my-app';
import { AppLogin } from './app-login';

import 'jquery';
import 'popper.js';

import '../static/site.css'

Aurelia
  .register(RouterConfiguration)
  .app(MyApp)
  .start();
