import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  private baseUrl = 'http://localhost:3001/metrics';

  constructor(private http: HttpClient) {}

  getUserRegistrationsByMonth(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user-registrations`);
  }
}
