const webpack = require('webapck')
const path =require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const uglifyJsPlugin = webapck.optimize.UglifyJsPlugin

module.exports={
    devtool:'cheap-source-map',
    entry:[
        path.resolve(__dirname,'app/main.jsx')
    ],
    output:{
        path:path.resolve(__dirname,'build'),
        publicPath:'/',
        filename:'bundle.js'
    },
    module:{
        rules:[
            {test:/\.js[x]?$/,include:path.resolve(__dirname,'app'),loader:'babel-loader'},
            {test:/\.css$/},include:path.resolve(__dirname,'app'),exclude:/node_modules/,loader:'style-loader?css-loader'}
        ]
    },
    resolve:{
        extensions:['','js','jsx']
    },
    plugins:[
        new webapck.optimize.DedupePlugin(),
        new uglifyJsPlugin({
            compress:{
                warning:false
            }
        })
        new webapck.DefinePlugin({
            'process.env':{
                NODE_ENV:JSON.stringify('production')
            }
        })
        new CopyWebpackPlugin([
                {from:'./app/index.html',to:'index.html'},
                {from:'./app.main.css',to:'main.css'}
            ])
    ]
}