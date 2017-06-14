
var gameVm = new Vue({
    el: '#game',
    data: {
        onceRow: 20,
        col: 7,
        score: 0,
        chessRows: [],
        translateY: 155,
        //这个单位是s
        rollOnceTime: 30
    },
    
    mounted: function() {
        //出题
        this.chessRows = this.getNewChessRows(this.onceRow, this.col);
        
        //开始向下走
        setTimeout(function() {
            
            gameVm.translateY -= 500;
            setInterval(function() {
                //每500s都要 向下走 和 增加新题
                gameVm.translateY -= 500;
                gameVm.chessRows = gameVm.chessRows.concat(gameVm.getNewChessRows(gameVm.onceRow, gameVm.col));
            }, gameVm.rollOnceTime * 1000);
        }, 1000);
        
    },
    methods: {
        
        onClickChess: function(android, rowIndex, chessIndex) {
            //不是android才可以点击有效
            if(android) {
                return;
            }
            
            //如果点击有效
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
            for(i=chessIndex; i<this.col-1; ) {
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
            //向下找
            for(i=rowIndex; i<this.chessRows.length-1; ) {
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
                    this.score++;
                }
            }
        },
        
        
        /* 出题：实质为打乱？ */
        getNewChessRows: function(row, col) {
            var newChessesRows = new Array();

            var originalNum;
            var originalNumUsed = new Array();
            var originalRow;

            var rowIndex = 0;
            var colIndex = 0;
            for(rowIndex = 0; rowIndex<row; rowIndex++) {
                newChessesRows.push(new Array());
                for(colIndex = 0; colIndex<col; colIndex++) {
                    
                    //在所有小方块数量中抽一个号
                    originalNum = Math.floor((Math.random()*this.col*this.onceRow));
                    //如果已经被抽过了，跳过，重新抽
                    if(originalNumUsed.indexOf(originalNum)>-1) {
                        colIndex--;
                        continue;
                    }
                    //抽到新的的话：

                    //看位置得到是什么块
                    //小于50是android
                    if(originalNum < 75) {
                        newChessesRows[rowIndex][colIndex] = {
                            android: true,
                            level: 0,
                            type: Math.floor(originalNum/15)
                        }
                    } else {
                        //大于是ios
                        newChessesRows[rowIndex][colIndex] = {
                            android: false
                        }
                    }
                    //记录已经被抽取的号
                    originalNumUsed.push(originalNum);
                }
            }
            return newChessesRows;
        }
    }
    
});



















