var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: {
 			loader: 'babel-loader',
	        options: {
	          presets: ['@babel/preset-react'],
              plugins: ['react-html-attrs',
                  ["import", { libraryName: 'antd', style: 'css' }]
              ], //添加组件的插件配置
	        }
        }
      },
      {
          test: /\.css$/,
          use: [
              { loader: 'style-loader' },
              { loader: 'css-loader' }
          ]
      },
        {
            test: /\.less$/,
            use: [
                'style-loader',
                { loader: 'css-loader', options: { importLoaders: 1 } },
                'less-loader'
            ]
        }
    ]
  },
};
