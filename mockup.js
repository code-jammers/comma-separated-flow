var gTutStg=0;
//var gClickCount=0;

var gFlowNum=0;
var gFlowEls=[];
var gFlowRecs=[2,2,1,2,1,1,3];
var gFinalEl=null;

function makeTable(c,r,w,h, cells, lastIsSingle) {
    var tbl=document.createElement('table');
    for (var i=0; i<r; i++) {
        var tr=document.createElement('tr');
        var row=[];
        for (var j=0; j<c; j++) {
            var td=document.createElement('td');
            tr.appendChild(td);
            td.style.width=""+w+"px";
            td.style.height=""+h+"px";
            row.push(td);
            if (i==r-1 && lastIsSingle == 'lastIsSingle') {
                td.colSpan=c;
                break;
            }
        }
        tbl.appendChild(tr);
        cells.push(row);
    }
    return tbl;
}
nodeDex=0;
nodeNames=['A','B','C','D'];
nodeTestNames=['Company Cars', 'New Drivers', 'Existing CDL', 'Car Driver List'];
function makeCsvNode(divHtml, taValue) {
    var ss1Cells=[];
    var ss1=makeTable(3,4,'26','26',ss1Cells,'lastIsSingle');
    var num=nodeDex;
    for (var j=0; j<3; j++) {
        ss1Cells[0][j].style.backgroundColor='LightSeaGreen';
        //ss1Cells[0][j].style.border='2px solid black';
        ss1Cells[j][0].style.border='1px solid black';
        ss1Cells[j][1].style.border='1px solid black';
        ss1Cells[j][2].style.border='1px solid black';
	ss1Cells[0][j].style.cursor='pointer';
	ss1Cells[0][j].onclick=function() {
	    if (gTutStg==2) gTutStg=3;
	    else if(gTutStg==5) gTutStg=6;
	    //else return;

	    var div=document.createElement('div');
	    div.innerHTML=divHtml;
	    var ta=document.createElement('textarea');
	    ta.value=taValue;
	    var ss1Edit=makeEditor(div, ta, 'CsvNode', num);

	}
    }
    //var span=document.createElement('span');
    //span.innerHTML='input';
    var inp=document.createElement('input');
    inp.id='name'+nodeDex;

    inp.style.horizontalAlign='middle';
    inp.value='Node '+nodeNames[nodeDex++];
    inp.style.borderColor='rgba(0,0,0,0.01)';
    inp.style.padding='0';
    inp.style.margin='0';
    inp.style.width='90px';
    //var span2=document.createElement('span');
    //span2.innerHTML='CSV';
    ss1Cells[3][0].appendChild(inp);
    ss1Cells[3][0].style.textAlign='center';
    //ss1Cells[3][1].appendChild(inp);
    //ss1Cells[3][2].appendChild(span2);
    
    
    return ss1;
}

function makeFlowDescriptor(fd) {
    var fd0Cells=[];
    var fd0=makeTable(1,30,'90','1',fd0Cells);
    fd0.style.height='90px';
    //console.log(fd0Cells[0][0]);
    fd0Cells[15][0].style.backgroundColor='black';
    //console.log(fd0Cells[0]);//.style.backgroundColor='black';
    fd0Cells[16][0].style.fontFamily='Monospace';
    fd0Cells[16][0].style.fontSize='8px';
    fd0Cells[16][0].innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;'+fd+'>';
    gFlowEls.push(fd0Cells[14][0]);
    gFlowEls.push(fd0Cells[15][0]);
    gFlowEls.push(fd0Cells[16][0]);
    return fd0;
}

function makeEditor(div, ta, type, num) {
    var temp=document.createElement('div');

    ta.style.height='75px';

    div.style.color='white';
    var span=document.createElement('span');
    span.innerHTML='ANY MODIFICATIONS WILL NOT PERSIST FOR THIS MOCKUP';
    div.appendChild(span);
    temp.style.position='absolute';
    temp.style.left='50px';
    temp.style.top='50px';
    temp.style.width='600px';
    temp.style.height='250px';
    var btn=document.createElement('button');
    btn.innerHTML='Done';
    btn.onclick=function() {
	temp.remove();
	if (gTutStg==3||gTutStg==6||gTutStg==7||gTutStg==8)
	    gTutStg += 1;
    }
    if (type == 'CsvNode') {
        var warn=document.createElement('span');
        warn.id='warning';
        warn.style.color='white';
        warn.innerHTML='<br/>';
        temp.appendChild(warn);
        var emptydiv=document.createElement('div');
        emptydiv.innerHTML=`
<table class='mini'>
<tr><td><input value=' '></td><td><button style='background-color:lightblue' disabled='disabled'>+</button></td></tr><tr><td><button style='background-color:lightblue' disabled='disabled'>+</button></td></tr></table>`;
        var emptyta=document.createElement('textarea');
        emptyta.innerHTML=`
 
   
`;
        emptydiv.id='editdiv';
        emptyta.id='editta';
        emptyta.style.height='75px';
        temp.appendChild(emptydiv);
        temp.appendChild(emptyta);
        var testBtn=document.createElement('button');
        testBtn.innerHTML='Load Test Data';
        testBtn.onclick=function() {
            document.getElementById('editdiv').innerHTML=div.innerHTML;
            document.getElementById('editta').value=ta.value;
            warn.innerHTML='WARN: TEST DATA MODIFICATION WILL NOT BE PERSISTED IN THIS MOCKUP';
            //temp.appendChild(div);
            //temp.appendChild(ta);
            temp.appendChild(btn);
            testBtn.remove();
            document.getElementById('name'+num).value=nodeTestNames[num];
            warn.innerHTML=nodeTestNames[num]+'<br/>'+warn.innerHTML;
        }
        temp.appendChild(testBtn);
    }
    else {
        temp.appendChild(div);
        temp.appendChild(ta);
        temp.appendChild(btn);
    }
    temp.style.backgroundColor='black';
    temp.style.padding='20px';
    document.body.appendChild(temp);
}

window.addEventListener("DOMContentLoaded", function() {
    var cells=[];
    var tbl=makeTable(10,10, '90', '81', cells);
    document.getElementById('tblcont').appendChild(tbl);
    console.log(cells);
    //cells[0][0].style.backgroundColor='black';
    var plusCells=[];
    var plus=makeTable(3,3,'30','30', plusCells);

    cells[0][0].appendChild(plus);
    var plus_x=[0,1,1,1,2];
    var plus_y=[1,0,1,2,1];
    for (var i=0; i<plus_x.length; i++) {
        var cell=plusCells[plus_x[i]][plus_y[i]];        
        cell.style.backgroundColor='lightgray';
        cell.style.cursor='pointer';
        cell.onclick=function() {

            if (gTutStg==0) {
                gTutStg=1;
            }
            if (gTutStg!=1 && gTutStg!=4 && gTutStg!=7 && gTutStg!=8 && gTutStg!=9 && gTutStg!=10){return;}
            cells[1][0].innerHTML = "";
            var menuCells=[];
            var menu=makeTable(1,6,'90','15', menuCells);
	    menu.style.height='90px';
            cells[1][0].appendChild(menu);
	    if (gTutStg<8) {
		menuCells[0][0].innerHTML='0>';
		menuCells[0][0].style.backgroundColor='lightgray';
		menuCells[0][0].style.color='white';
	    }
	    if (gTutStg==10) {
		menuCells[0][0].innerHTML='1,2;3>';
		menuCells[0][0].style.backgroundColor='lightgray';
		menuCells[0][0].style.color='white';
		menuCells[0][0].style.cursor='pointer';
		menuCells[0][0].onclick=function() {
		    cells[0][4].style.backgroundColor='green';
		    cells[0][4].style.borderRadius='50%';
		    cells[0][4].style.fontFamily='Monospace';
		    cells[0][4].style.fontSize='32px';
		    cells[0][4].style.textAlign='center';
		    cells[0][4].innerHTML='Run';
		    cells[0][4].style.cursor='pointer';
		    cells[0][4].onclick=function() {
                        var csf=`<<0>Company Cars>>
CarId,Model
1,Mustang
2,Challenger
<<1>New Drivers>>
CarId,Driver
1,Jorge
2,George
<<1,2>Join First and Second>>
0
0
<<3>Existing CDL>>
CarId,Model,Driver
1,Mustang,Georgina
<<1,2;3>Union One+Two with Three>>
<<1,2;3>Car Driver List>>
CarId,Model,Driver
1,Mustang,Jorge
2,Challenger,George
1,Mustang,Georgina
`;
                        
                        cells[0][6].innerHTML='&nbsp;&nbsp;<a href="data:text/plain;charset=utf-8,'+encodeURIComponent(csf)+'" download="car_driver_list.csf">[Download csf]</a>';
                        cells[0][6].style.cursor='pointer';
                        //cells[0][6].onclick=function(){
                        //    
                        //}
			cells[0][5].innerHTML='&nbsp;&nbsp;[View csf]';
			cells[0][5].style.cursor='pointer';
			cells[0][5].onclick=function(){
			    var div=document.createElement('div');
			    div.innerHTML='';
			    var ta=document.createElement('textarea');
			    ta.value=csf;
			    makeEditor(div,ta);
			}
			var intId=setInterval(function() {
			    if (gFlowNum > gFlowRecs.length) {
				clearInterval(intId);
				return;
			    }
			    var fidx=gFlowNum*3;
                            if (gFlowEls[fidx] != null) {
			        gFlowEls[fidx].fontFamily='Monospace';
			        gFlowEls[fidx].fontSize='8px';
			        gFlowEls[fidx].innerHTML="&nbsp;&nbsp;"+gFlowRecs[gFlowNum]+" recs";
			        gFlowEls[fidx].style.color="green";
			        gFlowEls[fidx+1].style.backgroundColor="green";
			        gFlowEls[fidx+2].style.color="green";
                            }
			    gFlowNum += 1;
			}, 1000);
			cells[1][0].innerHTML='';
			var div=document.createElement('div');
			div.innerHTML=``;
			var ta=document.createElement('textarea');
			ta.value=``;
			//var joinEdit=makeEditor(div, ta);
			var divHtml=`
<table class='mini'>
<tr><td><input value='CarId'></td><td><input value='Model'></td><td><input value='Driver'></td></tr>
<tr><td><input value='1'></td><td><input value='Mustang'></td><td><input value='Jorge'></td></tr>
<tr><td><input value='2'></td><td><input value='Challenger'></td><td><input value='George'></td></tr>
<tr><td><input value='1'></td><td><input value='Mustang'></td><td><input value='Georgina'></td></tr>
</table>
`;
			var taValue=`CarId,Model,Driver
1,Mustang,Jorge
2,Challenger,George
1,Mustang,Georgina`;
			var csvNode=makeCsvNode(divHtml, taValue);
			cells[5][6].appendChild(csvNode);
			var fd=makeFlowDescriptor('1,2;3');
			cells[5][5].appendChild(fd);
		    }
		}
	    }
	    if (gTutStg==9) {
		menuCells[0][0].innerHTML='1,2;3 (union)>';
		menuCells[0][0].style.backgroundColor='lightgray';
		menuCells[0][0].style.color='white';
		menuCells[0][0].style.cursor='pointer';
		menuCells[0][0].onclick=function() {
		    cells[1][0].innerHTML='';
		    //var divHtml=``;
		    //var taVlaue=``;
		    //var csvNode=makeCsvNode(divHtml, taValue);
                    //cells[2][4].appendChild(csvNode);
		    cells[3][4].style.backgroundColor='yellow';
		    cells[3][4].style.fontFamily='Monospace';
		    cells[3][4].innerHTML='&nbsp;&nbsp;Union';
		    cells[4][4].style.backgroundColor='yellow';
		    cells[5][4].style.backgroundColor='yellow';
		    cells[6][4].style.backgroundColor='yellow';
		    var fd=makeFlowDescriptor('1,2');
                    cells[3][3].appendChild(fd);
		    cells[6][2].appendChild(makeFlowDescriptor('3'));
		    cells[6][3].appendChild(makeFlowDescriptor('3'));
		    gTutStg=10;
		}
		menuCells[1][0].innerHTML='1,2>';
		menuCells[1][0].style.backgroundColor='lightgray';
		menuCells[1][0].style.color='white';
	    }
	    if (gTutStg==8) {
		menuCells[0][0].innerHTML='3>';
		menuCells[0][0].style.backgroundColor='lightgray';
		menuCells[0][0].style.color='white';
		menuCells[0][0].style.cursor='pointer';
		menuCells[0][0].onclick=function() {
		    cells[1][0].innerHTML='';
		    var div=document.createElement('div');
		    div.innerHTML=``;
		    var ta=document.createElement('textarea');
		    ta.value=``;
		    //var joinEdit=makeEditor(div, ta);
		    var divHtml=`
<table class='mini'>
<tr><td><input value='CarId'></td><td><input value='Model'></td><td><input value='Driver'></td></tr>
<tr><td><input value='1'></td><td><input value='Mustang'></td><td><input value='Georgina'></td></tr>
</table>
`;
		    var taValue=`CarId,Model,Driver
1,Mustang,Georgina`;
		    var csvNode=makeCsvNode(divHtml, taValue);
                    cells[6][0].appendChild(csvNode);
		    var fd=makeFlowDescriptor('3');
                    cells[6][1].appendChild(fd);
		}
		menuCells[1][0].innerHTML='1,2>';
		menuCells[1][0].style.backgroundColor='lightgray';
		menuCells[1][0].style.color='white';
	    }
	    if (gTutStg==7) {
		menuCells[1][0].innerHTML='3>';
		menuCells[1][0].style.backgroundColor='lightgray';
		menuCells[1][0].style.color='white';
		menuCells[2][0].innerHTML='1,2> (join)';
		menuCells[2][0].style.backgroundColor='lightgray';
		menuCells[2][0].style.color='white';
		menuCells[2][0].style.cursor='pointer';
		menuCells[2][0].onclick=function() {
		    //gTutStg=10;
		    cells[1][0].innerHTML='';
		    cells[2][2].style.backgroundColor='lightgreen';
		    cells[2][2].fontFamily='Monospace';
		    cells[2][2].innerHTML='&nbsp;&nbsp;Join';
		    cells[3][2].style.backgroundColor='lightgreen';
		    cells[4][2].style.backgroundColor='lightgreen';
		    var div=document.createElement('div');
		    div.innerHTML=`JOIN<Br/>first comma-sep row is 0> in-flow key column<Br/>second comma-sep row is the 1> in-flow key column #<BR/>`;
		    var ta=document.createElement('textarea');
		    ta.value=`0
0`;
		    var joinEdit=makeEditor(div, ta);
                    //joinEdit.style.color='white';
                    //joinEdit.innerHTML='JOIN<Br/>first comma-sep row is 0> in-flow key column<Br/>second comma-sep row is the 1> in-flow key column #<BR/>'+joinEdit.innerHTML;
		}
		
	    }
	    if (gTutStg==4) {
		menuCells[1][0].innerHTML='1>';
		menuCells[1][0].style.backgroundColor='lightgray';
		menuCells[1][0].style.color='white';
		menuCells[1][0].style.cursor='pointer';
		menuCells[1][0].onclick=function() {
		    gTutStg=5;
		    cells[1][0].innerHTML='';
		    var divHtml=`
<table class='mini'>
<tr><td><input value='CarId'></td><td><input value='Driver'></td></tr>
<tr><td><input value='1'></td><td><input value='Jorge'></td></tr>
<tr><td><input value='2'></td><td><input value='George'></td></tr>
</table>
`;
		    var taValue=`CarId,Driver
1,Jorge
2,George`;
		    var csvNode=makeCsvNode(divHtml, taValue);
                    cells[4][0].appendChild(csvNode);
		    var fd=makeFlowDescriptor('1');
                    cells[4][1].appendChild(fd);
		}
	    }
            if (gTutStg==1) {
                menuCells[0][0].style.cursor='pointer';
                menuCells[0][0].onclick=function() {
                    if (gTutStg==1) gTutStg=2;
                    else return;
		    cells[1][0].innerHTML='';
		    var divHtml=`
<table class='mini'>
<tr><td><input value='CarId'></td><td><input value='Model'></td></tr>
<tr><td><input value='1'></td><td><input value='Mustang'></td></tr>
<tr><td><input value='2'></td><td><input value='Challenger'></td></tr>
</table>
`;
		    var taValue=`CarId,Model
1,Mustang
2,Challenger`;
		    var csvNode=makeCsvNode(divHtml, taValue);
                    cells[2][0].appendChild(csvNode);
		    var fd=makeFlowDescriptor('0');
                    // var fd0Cells=[];
                    // var fd0=makeTable(1,30,'90','1',fd0Cells);
		    // fd0.style.height='90px';
                    // console.log(fd0Cells[0][0]);
                    // fd0Cells[15][0].style.backgroundColor='black';
                    // console.log(fd0Cells[0]);//.style.backgroundColor='black';
		    // fd0Cells[16][0].style.fontFamily='Monospace';
		    // fd0Cells[16][0].style.fontSize='8px';
		    // fd0Cells[16][0].innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;0>';
                    cells[2][1].appendChild(fd);
		    //fd0.style.backgroundColor='yellow';
                }
            }
        }
    }
    // plusCells[0][1].style.backgroundColor='lightblue';
    // plusCells[1][0].style.backgroundColor='lightblue';
    // plusCells[1][1].style.backgroundColor='lightblue';
    // plusCells[1][2].style.backgroundColor='lightblue';
    // plusCells[2][1].style.backgroundColor='lightblue';                         
    
    //plus.style.border="1px solid black";
});
