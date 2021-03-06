import { resolve } from 'path';
import theme from './theme';
function getRouter(router) {
  if (router.routes) {
    router.routes = router.routes
      .filter(({ component }) => {
        if (component.indexOf('page.tsx') >= 0) {
          return true;
        }
        if (
          component.indexOf('Page.tsx') >= 0 ||
          component.indexOf('404.tsx') >= 0
        ) {
          return true;
        }
        return false;
      })
      .map(item => {
        if (!item.path) {
          return item;
        }
        return {
          ...item,
          path: item.path
            .replace('index/indexPage', '')
            .replace('indexPage', '')
            .replace('Page', '')
            .replace('page', '')
        };
      });
  }
  return router;
}
export default {
  // proxy,
  theme,
  history: 'hash',
  publicPath: './',
  hash: true,
  treeShaking: true,
  plugins: [
    ['@umijs/plugin-qiankun', { slave: { keepOriginalRoutes: true } }],
    [
      'umi-plugin-react',
      {
        antd: {
          dynamicImport: false
        },
        dva: {
          dynamicImport: false
        },
        dynamicImport: {
          loadingComponent: '../src/common/loading'
        },
        dll: false,
        routes: {
          update(routes) {
            return routes.map(item => {
              return getRouter(item);
            });
          }
        },
        hardSource: false
      }
    ]
  ],
  chainWebpack: (config, { webpack }) => {
    config.merge({
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendor: {
              name: 'vendors',
              test: /^.*node_modules[\\/](?!lodash|antd|echarts|@antv[\\/]g6[\\/]dist[\\/]).*$/,
              priority: 10,
            },
            // rccalendar: {
            //   name: 'rccalendar',
            //   test: /[\\/]node_modules[\\/]rc-calendar[\\/]/,
            //   chunks: 'all',
            //   priority: -1
            // },
            // rctable: {
            //   name: 'rctable',
            //   test: /[\\/]node_modules[\\/]rc-table[\\/]es[\\/]/,
            //   chunks: 'all',
            //   priority: -1
            // },
            // rctimepicker: {
            //   name: 'rctimepicker',
            //   test: /[\\/]node_modules[\\/]rc-time-picker/,
            //   chunks: 'all',
            //   priority: 10
            // },
            // rcselect: {
            //   name: 'rc-select',
            //   test: /[\\/]node_modules[\\/]rc-select/,
            //   chunks: 'all',
            //   priority: 10
            // },
            lodash: {
              name: 'lodash',
              test: /[\\/]node_modules[\\/]lodash[\\/]/,
              chunks: 'all',
              priority: 10
            },
            antd: {
              name: 'antd',
              test: /[\\/]node_modules[\\/]antd[\\/]/,
              chunks: 'all',
              priority: 10
            },
            echarts: {
              name: 'echarts',
              test: /[\\/]node_modules[\\/]echarts[\\/]/,
              chunks: 'all',
              priority: 9
            },
            antv: {
              name: 'antv',
              test: /[\\/]node_modules[\\/]@antv[\\/]g6[\\/]/,
              chunks: 'all',
              priority: 9
            },
            codemirror: {
              name: 'codemirror',
              test: /[\\/]node_modules[\\/]codemirror[\\/]/,
              chunks: 'all',
              priority: 9
            },
            // racc: {
            //   name: 'racc',
            //   test: /[\\/]node_modules[\\/]racc[\\/]/,
            //   chunks: 'all',
            //   priority: 9
            // },
            // zrender: {
            //   name: 'zrender',
            //   test: /[\\/]node_modules[\\/]zrender[\\/]/,
            //   chunks: 'all',
            //   priority: 9
            // },
          },
        },
      }
    });
    // ?????????moment????????????????????????????????????
    config.plugin('replace').use(require('webpack').ContextReplacementPlugin).tap(() => {
      return [/moment[/\\]locale$/, /zh-cn/];
    });
  },
  alias: {
    src: resolve(__dirname, '../src')
  }
};
