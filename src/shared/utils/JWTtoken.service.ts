import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class JWTService {
  // tslint:disable-next-line:variable-name
  private myRawToken = localStorage.getItem('auth_token');
  private helper = new JwtHelperService();
  private decodedToken: any;
  private roles: string[] = [];
  private expirationDate: Date;
  private tokenIsExpired = true;

  constructor() {
    this.initialise();
  }

  private getDecodedToken(): {} {
    this.initialise();
    return this.decodedToken;
  }

  private isExpired(): boolean {
    this.initialise();
    return this.tokenIsExpired;
  }

  private hasToken(): boolean {
    this.initialise();
    return this.myRawToken ? this.myRawToken.length > 0 : false;
  }

  private getRoles(): string[] {
    this.initialise();
    return this.roles;
  }

  private hasRole(role: string): boolean {
    this.initialise();
    return this.roles.includes(role);
  }

  private containRoles(roles: string[]): boolean {
    this.initialise();
    return roles.every(elem => this.roles.indexOf(elem) > -1);
  }

  private IsAdmin(): boolean {
    this.initialise();
    return this.roles.includes('Admin');
  }

  private IsWebMaster(): boolean {
    this.initialise();
    return this.roles.includes('WebMaster');
  }

  private getAccountType() {
    return this.decodedToken.accountType;
  }

  private expiryDate() {
    this.initialise();
    return this.expirationDate;
  }

  private initialise() {
    this.myRawToken = localStorage.getItem('auth_token');
    if (this.myRawToken) {
      this.decodedToken = this.helper.decodeToken(this.myRawToken);
      this.expirationDate = this.helper.getTokenExpirationDate(this.myRawToken);
      this.tokenIsExpired = this.helper.isTokenExpired(this.myRawToken);
      this.roles = this.decodedToken.roles ? this.decodedToken.roles : [];
    }
  }
}
