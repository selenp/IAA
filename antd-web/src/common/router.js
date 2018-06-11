import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach(model => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () =>
      models.filter(model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = app => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },
    '/dashboard/workplace': {
      component: dynamicWrapper(app, ['tasks', 'announcements', 'user'], () =>
        import('../routes/Dashboard/Workplace')
      ),
    },
    '/deliveries/list': {
      component: dynamicWrapper(app, ['deliveries'], () => import('../routes/Deliveries/List')),
    },
    '/tasks': {
      component: dynamicWrapper(app, ['tasks', 'user'], () => import('../routes/Tasks/List')),
    },
    '/task/:id': {
      component: dynamicWrapper(app, ['task', 'user'], () => import('../routes/Tasks/Task')),
    },
    '/announcements': {
      component: dynamicWrapper(app, ['announcements', 'user'], () =>
        import('../routes/Announcements/List')
      ),
    },
    '/announcement/:id': {
      component: dynamicWrapper(app, ['announcement', 'user'], () =>
        import('../routes/Announcements/Announcement')
      ),
    },
    '/transfers/list': {
      component: dynamicWrapper(app, ['transfers'], () => import('../routes/Transfers/List')),
    },
    '/system/dictionaries/list': {
      component: dynamicWrapper(app, ['dictionaries'], () => import('../routes/Dictionaries/List')),
    },
    '/system/admins': {
      component: dynamicWrapper(app, ['admins', 'dictionary'], () =>
        import('../routes/Admins/List')
      ),
    },
    '/system/admin/:id': {
      component: dynamicWrapper(app, ['admin', 'ldap'], () => import('../routes/Admins/Admin')),
    },
    '/assettag/:assettag': {
      component: dynamicWrapper(app, ['assetTag'], () => import('../routes/AssetTag/List')),
    },
    '/delivery/main': {
      component: dynamicWrapper(app, [], () => import('../routes/Delivery/MainMenu')),
    },
    '/delivery/borrow': {
      component: dynamicWrapper(app, ['delivery'], () => import('../routes/Delivery/flow/Borrow')),
    },
    '/delivery/borrow/info': {
      component: dynamicWrapper(app, ['delivery', 'dictionary', 'ldap'], () =>
        import('../routes/Delivery/flow/Borrow1')
      ),
    },
    '/delivery/borrow/confirm': {
      component: dynamicWrapper(app, ['delivery', 'dictionary'], () =>
        import('../routes/Delivery/flow/Borrow2')
      ),
    },
    '/delivery/borrow/result': {
      component: dynamicWrapper(app, ['delivery'], () => import('../routes/Delivery/flow/Borrow3')),
    },
    '/delivery/return-delivery': {
      component: dynamicWrapper(app, ['deliveries'], () => import('../routes/Delivery/ReturnList')),
    },
    '/delivery/return': {
      component: dynamicWrapper(app, ['delivery'], () => import('../routes/Delivery/flow/Return')),
    },
    '/delivery/return/info': {
      component: dynamicWrapper(app, ['delivery', 'dictionary', 'ldap'], () =>
        import('../routes/Delivery/flow/Return1')
      ),
    },
    '/delivery/return/confirmData/:id': {
      component: dynamicWrapper(app, ['delivery', 'dictionary'], () =>
        import('../routes/Delivery/flow/ReturnData')
      ),
    },
    '/delivery/return/confirm': {
      component: dynamicWrapper(app, ['delivery', 'dictionary'], () =>
        import('../routes/Delivery/flow/Return2')
      ),
    },
    '/delivery/return/result': {
      component: dynamicWrapper(app, ['delivery'], () => import('../routes/Delivery/flow/Return3')),
    },
    '/transfer/borrow': {
      component: dynamicWrapper(app, ['transfer'], () => import('../routes/Transfer/flow/Borrow')),
    },
    '/transfer/borrow/info': {
      component: dynamicWrapper(app, ['transfer', 'user', 'task'], () =>
        import('../routes/Transfer/flow/Borrow1')
      ),
    },
    '/transfer/borrow/confirm': {
      component: dynamicWrapper(app, ['transfer'], () => import('../routes/Transfer/flow/Borrow2')),
    },
    '/transfer/borrow/result': {
      component: dynamicWrapper(app, ['transfer'], () => import('../routes/Transfer/flow/Borrow3')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () =>
        import('../routes/Exception/triggerException')
      ),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },
    // '/user/:id': {
    //   component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
    // },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
    };
    routerData[path] = router;
  });
  return routerData;
};
