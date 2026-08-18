export interface CreateAuctionRequest {
  name: string;
  maxPlayersPerTeam: number;
  maxGoalkeepers: number;
  maxDefenders: number;
  maxMidfielders: number;
  maxForwards: number;
  initialCredits: number;
}

export interface UpdateAuctionRequest extends CreateAuctionRequest {}

export interface UpdateStatusRequest {
  status: string;
}

export interface AuctionResponse extends CreateAuctionRequest {
  id: number;
  status?: string;
  [key: string]: unknown;
}
