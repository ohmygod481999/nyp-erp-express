import { OAUTH_USER_INFO_URL } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { AccountInfo } from '@interfaces/auth.interface';
import { isEmpty } from '@utils/util';
import axios from 'axios';
import UserService from './users.service';

class OAuthService {
  public userService = new UserService();

  public async getAccountInfo(accessToken: string): Promise<AccountInfo> {
    if (isEmpty(accessToken)) throw new HttpException(400, 'userData is empty');

    try {
      const userInfoRes = await axios.get(OAUTH_USER_INFO_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const accountInfo = userInfoRes.data;
      const user = await this.userService.findOneByOryId(accountInfo.ory_id);
      if (!user) {
        return null;
      }

      return {
        ...accountInfo,
        company_id: user.company_id,
        user_erp_id: user.id,
      };
    } catch (err) {
      return null;
    }
  }
}

export default OAuthService;
