import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class LocalStorage{
  constructor() {}

  setLocalStorage(name, payload) {
    localStorage.setItem(name, JSON.stringify(payload));
  }
  getLocalStorage(name) {
    const data = localStorage.getItem(name);
    return JSON.parse(data);
  }
  removeLocalStorage(name) {
    localStorage.removeItem(name);
    localStorage.clear;
  }
}
