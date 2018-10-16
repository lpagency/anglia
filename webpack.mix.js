const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

const RootFolder = path.basename(process.cwd());
const AssetsFolder = 'static';

mix
  .setPublicPath(AssetsFolder)
  .setResourceRoot('../')
  .js('./src/assets/js/app.js', 'js')
  .sass('./src/assets/scss/app.scss', 'css')
  .disableNotifications()
  .webpackConfig(webpack => ({
    module: {
      rules: [
        {
          test: /\.(njk|nunjucks)$/,
          loader: 'nunjucks-loader',
          query: {
            config: __dirname + '/nunjucks.config.js',
          },
        }
      ],
    },

    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'window.$': 'jquery',
      }),
    ],
  }))
;
