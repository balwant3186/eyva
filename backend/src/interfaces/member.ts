export interface Member {
  id: number;
  name: string;
  email: string;
  avatar: string;
  isActive: boolean;
  role: string;
  teams: string[];
  userName: string;
}

export interface GetAllMembersOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  search?: string;
}
