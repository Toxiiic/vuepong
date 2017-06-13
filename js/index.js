var colAmount = 7;
var rowAmount = 5;

var gameVm = new Vue({
    el: '#game',
    data: {
        chessRows: [
            [
                {
                    android: true,
                    level: 0,
                    type: 1
                },
                {
                    android: false,
                },
                {
                    android: true,
                    level: 0,
                    type: 2
                },
                {
                    android: false,
                },
                {
                    android: true,
                    level: 0,
                    type: 2
                },
                {
                    android: false,
                },
                {
                    android: true,
                    level: 0,
                    type: 4
                }
            ],[
                {
                    android: true,
                    level: 0,
                    type: 1
                },
                {
                    android: false,
                },
                {
                    android: true,
                    level: 0,
                    type: 2
                },
                {
                    android: false,
                },
                {
                    android: false,
                },
                {
                    android: true,
                    level: 0,
                    type: 0
                },
                {
                    android: false,
                },
            ],[
                
                {
                    android: false,
                },
                {
                    android: false,
                },{
                    android: true,
                    level: 0,
                    type: 4
                },
                {
                    android: true,
                    level: 0,
                    type: 1
                },
                {
                    android: false,
                },
                {
                    android: true,
                    level: 0,
                    type: 2
                },
                {
                    android: false,
                },
            ],[
                
                {
                    android: false,
                },
                {
                    android: true,
                    level: 0,
                    type: 2
                },
                {
                    android: false,
                },{
                    android: true,
                    level: 0,
                    type: 4
                },
                {
                    android: true,
                    level: 0,
                    type: 1
                },
                {
                    android: false,
                },
                {
                    android: false,
                },
            ],[
                
                {
                    android: false,
                },
                {
                    android: true,
                    level: 0,
                    type: 2
                },
                {
                    android: false,
                },
                {
                    android: false,
                },{
                    android: true,
                    level: 0,
                    type: 4
                },
                {
                    android: true,
                    level: 0,
                    type: 1
                },
                {
                    android: false,
                },
            ],
        ]
    },
    
    mounted: function() {
        
    },
    methods: {
        onClickChess: function(android, rowIndex, chessIndex) {
            //不是android才可以点击有效
            if(android) {
                return;
            }
            
            //如果点击有效
            
//            var left, right, top, bottom;
            var candidates = new Array();
            
            var i = 0;
            //向左找
            for(i=chessIndex; i>0; ) {
                i--;
                //如果找到android
                if(this.chessRows[rowIndex][i].android) {
                    candidates.push({
                        type: this.chessRows[rowIndex][i].type,
                        row: rowIndex,
                        col: i
                    });
                    //找到一个就不用继续找了
                    break;
                }
            }
            //向右找
            for(i=chessIndex; i<colAmount-1; ) {
                i++;
                //如果找到android
                if(this.chessRows[rowIndex][i].android) {
                    candidates.push({
                        type: this.chessRows[rowIndex][i].type,
                        row: rowIndex,
                        col: i
                    });
                    break;
                }
            }
            
            
            //向上找
            for(i=rowIndex; i>0; ) {
                i--;
                //如果找到android
                if(this.chessRows[i][chessIndex].android) {
                    candidates.push({
                        type: this.chessRows[i][chessIndex].type,
                        row: i,
                        col: chessIndex
                    });
                    break;
                }
            }
            //向上找
            for(i=rowIndex; i<rowAmount-1; ) {
                i++;
                //如果找到android
                if(this.chessRows[i][chessIndex].android) {
                    candidates.push({
                        type: this.chessRows[i][chessIndex].type,
                        row: i,
                        col: chessIndex
                    });
                    break;
                }
            }
            
//            debugger;
            
            //有颜色一样的再一次记下来，结果数组
            //把结果放在结果位置上是为了 重复操作结果一样
            var results = new Array(false, false, false, false);
            var er = 0;
            var ee = 1;
            for(er=0; er<candidates.length-1; er++) {
                for(ee=er+1; ee<candidates.length; ee++) {
                    if(candidates[er].type == candidates[ee].type) {
                        //只要颜色相同就入选最终结果
                        results[ee] = candidates[ee];
                        results[er] = candidates[er];
                    }
                }
            }
            
            
            
            
            
            //对结果进行消灭
            for(var i in results) {
                if(typeof results[i] == "object") {
                    this.chessRows[results[i].row][results[i].col].android = false;
                }
            }
        }
    }
    
});



















