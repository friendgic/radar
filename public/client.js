
$(document).ready(function () {

    var data = [] 
    var mapCanvas = $('#mapCanvas');
    var drawSvg = $('#drawSvg');
    var mapCtx = mapCanvas[0].getContext("2d"); 
     var img_shamo = new Image; 
    img_shamo.onload = function () {
        img_shamo_loaded = true;
        mapCtx.drawImage(this, 0, 0);
    };
    img_shamo.src = 'https://raw.githubusercontent.com/friendgic/radar/master/public/Miramar.bmp';

    var img_haidao = new Image;
    var img_haidao_loaded = false;
    img_haidao.onload = function () {
        img_haidao_loaded = true;
    };
    img_haidao.src = 'https://raw.githubusercontent.com/friendgic/radar/master/public/Erangel.bmp';


    $('#butShaMo').click(() => {
        if(img_shamo_loaded){
             mapCtx.drawImage(img_shamo, 0, 0);
        }
        
     })
    $('#butHaiDao').click(() => {
         if(img_haidao_loaded){
             mapCtx.drawImage(img_haidao, 0, 0);
        }
     })

    setInterval(function () {
        var url = window.location.href;
        $.post(url + "CMD", { CMD: 'Fetch' }, function (result) {
           // console.log(result)
            data = result
            
            let mx = data.mx/100
            let my = data.my/100
            let screenWidth = $( window ).width();
            let screenHeight = $( window ).height();
            let str = '<svg height="8192" width="8192">'

            drawSvg.empty()
            for(var i =0;i<data.enemy.length;i++){
                let x = data.enemy[i].ex/100
                let y = data.enemy[i].ey/100
                let eT = data.enemy[i].eT*1
                str=str+'<circle cx="'+x+'" cy="'+y+'" r="5" stroke="black" stroke-width="1" fill="'+(eT==1?'#00ff00':'#ff0000')+'" />'
            }
           
            str+='</svg>'
            drawSvg.append(str)
            
            let centerMove = {left: -mx+screenWidth/2+'px',top: -my+screenHeight/2+'px'}
            mapCanvas.animate(centerMove)
            drawSvg.animate(centerMove)
        });
    }, 1000);



});