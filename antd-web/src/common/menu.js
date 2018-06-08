import { isUrl } from '../utils/utils';

const menuData = [
  {
    icon: 'dashboard',
    name: 'Dashboard',
    path: 'dashboard/workplace',
  },
  {
    name: '任务',
    icon: 'schedule',
    path: 'tasks',
  },
  {
    name: '通知',
    icon: 'info-circle-o',
    path: 'announcements',
  },
  {
    name: '普通用户设备取还',
    icon: 'solution',
    path: 'deliveries/list',
    authority: (currentAuthority) => currentAuthority.split(',').indexOf('asset manager') > -1 ,
  },
  {
    name: 'IT设备取还',
    icon: 'calculator',
    path: 'transfers/list',
    authority: (currentAuthority) => currentAuthority.split(',').indexOf('it staff') > -1 ,
  },
  {
    name: '系统管理',
    icon: 'tool',
    path: 'system',
    children: [
      {
        name: '数据字典',
        icon: 'database',
        authority: (currentAuthority) => currentAuthority.split(',').indexOf('super admin') > -1 ,
        path: 'dictionaries/list',
      },
      {
        name: '用户管理',
        icon: 'user',
        authority: (currentAuthority) => currentAuthority.split(',').indexOf('super admin') > -1 ,
        path: 'admins',
      },
    ],
  },
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
