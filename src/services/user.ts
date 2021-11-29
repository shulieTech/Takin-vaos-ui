import { httpGet, httpPost, httpPut } from 'src/utils/request';

declare var centerServerUrl: string;

const UserService = {
  async queryCodeImg(data) {
    const url = '/verification/code';
    return httpGet(url, data);
  },
  async troLogin(data) {
    const url = '/login';
    return httpPost(url, data);
  },
  async troLogout(data) {
    const url = '/logout';
    return httpGet(url, data);
  },
  async updatePassword(data) {
    const url = '/user/pwd/update';
    return httpPut(url, data);
  },
  async menuList(data) {
    const url = '/user/menu/list';
    return httpGet(url, data);
  },
  async queryUserResource(data) {
    const url = '/auth/user/resource';
    return httpGet(url, data);
  },
  async queryBtnResource(data) {
    const url = '/auth/resource/user/action';
    return httpGet(url, data);
  },
  async apiSys(data) {
    const url = '/sys';
    return httpGet(url, data);
  }
};

export default UserService;
