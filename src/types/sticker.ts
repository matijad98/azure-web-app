export interface Sticker {
  id: number;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  imageUrl?: string;
}

export interface UserSticker {
  id: string;
  userId: string;
  stickerId: number;
  quantity: number;
  isNeeded: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Trade {
  id: string;
  fromUserId: string;
  toUserId: string;
  offeredStickers: UserSticker[];
  requestedStickers: UserSticker[];
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedAt: Date;
}
