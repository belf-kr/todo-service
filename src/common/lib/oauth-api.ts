import { HttpService, Injectable } from "@nestjs/common";

type User = {
  id: number;
  email: string;
  name: string;
  avatarImage: string;
};

@Injectable()
export class OAuthApiClient {
  private readonly httpService: HttpService;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  async getUserInfo(key: number | string) {
    try {
      const { data } = await this.httpService.get<User>(`/api/users/${key}`).toPromise();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
