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

  getApplicationsByStatus(): Observable<any> {
    return this.http.get(`${this.baseUrl}/applications-by-status`);
  }

  getLoginsByMonth(): Observable<any> {
    return this.http.get(`${this.baseUrl}/logins-by-month`);
  }

  getSessionDurations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/session-durations`);
  }
}
