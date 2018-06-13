const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    rules: [
      {
        test: /\.tpl$/,
        loader: 'html-loader'
      },
      {
        test: /\.ejs$/,
        loader: [{
          loader: 'ejs-loader',
          options: {}
        },
        {
          loader: 'clean-comment-loader',
          options: {
            type:"html"
          }
        }],
      },
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: [{
          loader: 'babel-loader',
          options: {
            sourceMap: true
          }
        },{
          loader: 'eslint-loader',
          options: {

          }
        }]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          { 
            loader: 'postcss-loader', 
            options: { 
              sourceMap: true
            } 
          },
          {
            loader: "sass-loader", 
            options: {
              sourceMap: true
            }
          }
        ]
      },   
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `[hash].[ext]`,
              outputPath:"css/img/",
              publicPath:"img/"
            }  
            // options: {
            //   name: function(fullpath){
            //     var path =  "../assets" + fullpath.split("assets")[1].replace(/\\/g,"/");
            //     return path;
            //     // // return '[path][name].[ext]';
            //   },
            //   outputPath:function(filepath){
            //     return buildFolder + filepath.replace("..","");

            //   },
            //   publicPath:function(filepath){
            //     console.log(arguments);
            //     return filepath;
            //   }
            // }  
          }
        ]
      },
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 100
      //       }
      //     }
      //   ]
      // },
    ]
  };