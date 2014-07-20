
/*
 * GET home page.
 */
var path = require('path');
var ZkClient=require('../zk.js').ZkClient;
var host = process.env.ZK_HOST || '115.29.8.106:2181';
var zkclient = new ZkClient(host);
function awatch(evt){
    console.log('event here 1'+evt);
    zkclient.zk.aw_get_children('/',awatch,function(){});
}
function getInfos(inPath){
    var parenPath=inPath||'/';
    var result=[];
    zkclient.zk.aw_get_children(parenPath,awatch,function(rc,error,children){
        //res.header("Content-Type","application/json");
        if(rc==0){
            children.forEach(function(child){
                realPath=path.join(parenPath,child);
                result.unshift({
                    attributes:{"path":realPath,"rel":"chv"},
                    data:{
                        title : child,icon:"ou.png", attributes: { "href" : ("/node-zk/get?path="+realPath) }
                    },
                    state:"closed"
                });
                result.unshift(getInfos(realPath));
            });
        }
    });
    return result;
}
exports.index = function(req, res){
    var parenPath='/';
	var ss=zkclient.zk.get_Children('/ee',awatch);
	res.send(ss+"#############");
    //res.send(getInfos(''));
    /*zkclient.zk.aw_get_children('/',awatch,function(rc,error,children){
        //res.header("Content-Type","application/json");
        var result=[];
        if(rc==0){
            children.forEach(function(child){
                realPath=path.join(parenPath,child);
                result.unshift({
                    attributes:{"path":realPath,"rel":"chv"},
                    data:{
                        title : child,icon:"ou.png", attributes: { "href" : ("/node-zk/get?path="+realPath) }
                    },
                    state:"closed"
                });
            });
        }
        res.send(result);
    }); */
};