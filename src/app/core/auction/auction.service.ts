import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuctionResponse, CreateAuctionRequest, UpdateAuctionRequest, UpdateStatusRequest } from '../../models/auction.models';

@Injectable({ providedIn: 'root' })
export class AuctionService {
  private readonly baseUrl = `${environment.auctionApiUrl}/auctions`;

  constructor(private http: HttpClient) {}

  create(payload: CreateAuctionRequest): Observable<AuctionResponse> {
    return this.http.post<AuctionResponse>(`${this.baseUrl}/create`, payload);
  }

  getById(auctionId: number): Observable<AuctionResponse> {
    return this.http.get<AuctionResponse>(`${this.baseUrl}/${auctionId}`);
  }

  getMyAuctions(): Observable<AuctionResponse[]> {
    return this.http.get<AuctionResponse[]>(`${this.baseUrl}/mine`);
  }

  update(auctionId: number, payload: UpdateAuctionRequest): Observable<AuctionResponse> {
    return this.http.put<AuctionResponse>(`${this.baseUrl}/${auctionId}`, payload);
  }

  updateStatus(auctionId: number, payload: UpdateStatusRequest): Observable<AuctionResponse> {
    return this.http.patch<AuctionResponse>(`${this.baseUrl}/${auctionId}/status`, payload);
  }

  delete(auctionId: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${auctionId}`, { responseType: 'text' });
  }
}
