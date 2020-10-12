import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class ConfigService {

  // tslint:disable-next-line:variable-name
  public _apiURI: string;

  constructor() {
    this._apiURI = environment.apiURI;
  }

  public getApiURI() {
    return this._apiURI;
  }
}
