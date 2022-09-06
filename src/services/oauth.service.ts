import { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, OAUTH_URL, OAUTH_USER_INFO_URL } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { AccountInfo, OAuthTokenData } from '@interfaces/auth.interface';
import { isEmpty } from '@utils/util';
import axios from 'axios';
import UserService from './users.service';
import querystring from 'querystring';

class OAuthService {
  public userService = new UserService();

  public async getAccountInfo(accessToken: string): Promise<AccountInfo> {
    if (isEmpty(accessToken)) throw new HttpException(400, 'access_token is empty');

    let userInfoRes;
    try {
      userInfoRes = await axios.get(OAUTH_USER_INFO_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (err) {
      if (err.response.status === 401) {
        // unauthorize
        throw new HttpException(401, 'unauthorize');
      }
    }
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
  }

  public async refreshToken(refresh_token: string): Promise<OAuthTokenData> {
    const tokenRes = await axios.post(
      `${OAUTH_URL}/oauth2/token`,
      querystring.stringify({
        refresh_token: String(refresh_token),
        grant_type: 'refresh_token',
        // redirect_uri: `${HOST}/oauth/callback`,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: OAUTH_CLIENT_ID,
          password: OAUTH_CLIENT_SECRET,
        },
      },
    );

    return tokenRes.data
  }
}

export default OAuthService;
