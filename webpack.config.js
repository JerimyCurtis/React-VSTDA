const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NullLoader = require('null-loader');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: NullLoader,
            options: {
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        test: require.resolve('fs'),
        use: 'null-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};


// const path = require('path');

// module.exports = {
//   context: path.join(__dirname, '/src'),

//   entry: {
//     javascript: './index'
//   },

//   output: {
//     filename: 'bundle.js',
//     path: path.join(__dirname, '/dist'),
//   },

//   resolve: {
//     alias: {
//       react: path.join(__dirname, 'node_modules', 'react')
//     },
//     extensions: ['.js', '.jsx']
//   },

//   module: {
//     loaders: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         loaders: ['babel-loader'],
//       },
//       {
//         test: /\.html$/,
//         loader: 'file-loader',
//         options: {
//           name: '[name].[ext]',
//         },
//         module: {
//           rules: [
//             {
//               test: require.resolve('fs'),
//               use: 'null-loader',
//             },
//           ],
//         },
//       },
//     ],
//   },
// };
