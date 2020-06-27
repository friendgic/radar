// client-side js


$(document).ready(function () {

    var data = []
    var imgLoad = false
    var mapCanvas = $('#mapCanvas');
    var drawSvg = $('#drawSvg');
    var mapCtx = mapCanvas[0].getContext("2d"); 
    var img = new Image;
    img.onload = function () {
        imgLoad = true
        mapCtx.drawImage(this, 0, 0);
    };
    img.src = 'Miramar.jpg';
 
    $('#butShaMo').click(() => {
        img = new Image;
        img.onload = function () {
            imgLoad = true
            mapCtx.drawImage(this, 0, 0);
        };
        img.src = 'Miramar.jpg';
    })
    $('#butHaiDao').click(() => {
        img = new Image;
        img.onload = function () {
            imgLoad = true
            mapCtx.drawImage(this, 0, 0);
        };
        img.src = 'Erangel.jpg';
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