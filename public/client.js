// client-side js


$(document).ready(function () {
    var passID = prompt("请输入 id", "");
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
            mapCtx.clearRect(0,0,8192,8192);
            mapCtx.drawImage(this, 0, 0);
        };
        img.src = 'Miramar.jpg';
    })
    $('#butHaiDao').click(() => {
        img = new Image;
        img.onload = function () {
            imgLoad = true
            mapCtx.clearRect(0,0,8192,8192);
            mapCtx.drawImage(this, 0, 0);
        };
        img.src = 'Erangel.jpg';
    })
    $('#butYulin').click(() => {
        img = new Image;
        img.onload = function () {
            imgLoad = true
            mapCtx.clearRect(0,0,8192,8192);

            mapCtx.drawImage(this, 0, 0);
        };
        img.src = 'Savage.jpg';
    })
    $('#butXueDi').click(() => {
        img = new Image;
        img.onload = function () {
            imgLoad = true
            mapCtx.clearRect(0,0,8192,8192);

            mapCtx.drawImage(this, 0, 0);
        };
        img.src = 'Vikendi.jpg';
    })
    $('#butDebug').click(()=>{
        var cmd = prompt("当前版本v1.01", "");
        var first = cmd.split(' ')
        if(first.length==2){ 
            if(first[0]=='pass'){
                var url = window.location.href;
                $.post(url + "SetPass", { pass: first[1]*1 }, function (result) {
                    passID = result['passID'] 
                    $('#butDebug').text(passID)
                })
            }
        }
    })
    $('#butDebug').text(passID)

    setInterval(function () {
        var url = window.location.href;
        $.post(url + "CMD", { CMD: 'Fetch',passID:passID }, function (result) {
            //console.log(result)
            data = result
            
            //let mx = data.mx/100
            //let my = data.my/100
            
            let mx = 0
            let my = 0
            let screenWidth = $( window ).width();
            let screenHeight = $( window ).height();
            let str = '<svg height="8192" width="8192">'

            drawSvg.empty()
            for(var i =0;i<data.enemy.length;i++){
                let x = data.enemy[i].ex/100
                let y = data.enemy[i].ey/100
                mx+=x
                my+=y
                let eT = data.enemy[i].eT*1
                let rot = data.enemy[i].er/180*3.1415 
                let tx=Math.cos(rot)*15+x
                let ty=Math.sin(rot)*15+y
                let health = parseInt(data.enemy[i].eh)
                let teamID = data.enemy[i].ei
 
                let colorValue = teamID / 30 * 200 + 160 
 
                //test 
                let color = (eT==1?'#00ff00':'hsl('+colorValue+', 100%, 50%)')
                str=str+'<circle cx="'+x+'" cy="'+y+'" r="5" stroke="black" stroke-width="1" fill="'+color+'" />'
                str = str+' <line x1="'+x+'" y1="'+y+'" x2="'+tx+'" y2="'+ty+'" style="stroke:'+color+';stroke-width:2" />'
                str=str+'<text x="'+(x+10)+'" y="'+y+'" fill="#00ff00">'+health+'</text> '
              
            }
            
            if(document.getElementById('cca').checked)
            for(var i=0;i<data.car.length;i++){
                let x = data.car[i].cx/100;
                let y = data.car[i].cy/100;
                let z = data.car[i].cz

                str=str+'<rect x="'+(x-5)+'" y="'+(y-5)+'" width ="10" height="10" stroke="black" stroke-width="1" fill="#bef5b8" />'
                str=str+'<text x="'+x+'" y="'+y+'" fill="#bef5b8">'+z+'</text> '
                
                // <text x="0" y="15" fill="red">I love SVG!</text>
            }

             
            for(var i=0;i<data.items.length;i++){
                let x = data.items[i].ix/100;
                let y = data.items[i].iy/100;
                let name = data.items[i].iz;
                let show = false
                if(document.getElementById('cwq').checked &&
                name.includes("+")){
                    show = true
                }
                if(document.getElementById('czd').checked &&
                (name==="7"||name==="5")){
                    show = true
                }
                if(document.getElementById('cpj').checked &&
                name.includes("-")){
                    show = true
                }

                if(document.getElementById('cxh').checked &&
                name.includes(">>")){
                    show = true
                }
                   
                   if(show){
                      
                if(name.includes(">>")){
                    str=str+'<text x="'+x+'" y="'+y+'" fill="#ff1100" font-size="20px">'+name+'</text> '
                    str=str+'<rect x="'+(x-2)+'" y="'+(y-2)+'" width ="5" height="5" stroke="black" stroke-width="1" fill="#ff1100" />'
                }else{
                    str=str+'<text x="'+x+'" y="'+y+'" fill="#ffffff" font-size="10px">'+name+'</text> '
                    str=str+'<rect x="'+(x-2)+'" y="'+(y-2)+'" width ="5" height="5" stroke="black" stroke-width="1" fill="#00bbff" />'
         
                } 
                }
                
                // <text x="0" y="15" fill="red">I love SVG!</text>
            }
            if(data.enemy.length>0){ 
                mx/=data.enemy.length
                my/=data.enemy.length
            }
            str+='</svg>'
            drawSvg.append(str)
            
            let centerMove = {left: -mx+screenWidth/2+'px',top: -my+screenHeight/2+'px'}
            mapCanvas.animate(centerMove)
            drawSvg.animate(centerMove)

            if(data.enemy.length==0){
                let str = '<div style="color:red"> 💖小叮当<span style="color:black"> 正在开启 <span style="color:blue">上帝视角...<span></span><div>'
                str = str + '<div style="color:black">💐支持我一下,我会做的更好 '
                str = str + '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"><input type="hidden" name="cmd" value="_s-xclick" /><input type="hidden" name="hosted_button_id" value="F978LMRHDYA3C" /><input type="image" src="https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" /> </form>'
                $('#butInfo').html(str)
            }else{
                $('#butInfo').html('')
            }
        });
    }, 500);



});