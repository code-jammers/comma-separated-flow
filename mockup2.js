gPERCENT=100;
gPERCENT_INCREMENT=50;
gNODE_ID=1;

gTABLES={};
gTABLE_ROWS={};

gEX_IN_ND=null;
gEX_JN_ND=null;

function input_oninput(inp) {
    inp.style.width = (Math.min(inp.value.length,44)) + "ch";
}
function nd_new_col(nodeId) {
    for (var t=1; t<100; t++) { // t=>try, todo: redo this part
        var row=gTABLE_ROWS[nodeId+'_tbl_'+t];
        if (row == null) break;
        var td=document.createElement("td");
        td.innerHTML="<input type='text' oninput='input_oninput(this)'>";
        row.appendChild(td);
        console.log(t);
    }
}

function nd_new_row(nodeId) {
    var el=document.getElementById(nodeId);
    //console.log(el.innerHTML.substring(0,1));
    //var scale = 1.0 + 0/gPERCENT;
    var compsty = window.getComputedStyle(el);//todo:needed?
    var w = parseInt(compsty.width.replace("px",""));//todo:needed?
    var h = parseInt(compsty.height.replace("px",""));//todo:needed?
    //w = ((scale*w));
    //h = ((scale*h));
    if (encodeURI(el.innerHTML.substring(0,1)) == "%E2%88%85") {
        var tblHtml="<table id='"+el.id+"_tbl"+"'><tbody><tr><td><input type='text' oninput='input_oninput(this)'></td></tr></tbody></table>";
        //el.innerHTML="<div id=''><input type='text' onchange='input_oninput(this)' /><br/><input type='text' onchange='input_oninput(this)' /></div>";
        colpp="<br/><a href='#' class='ndlink' onclick='nd_new_col(\""+nodeId+"\")'>Col++</a>"
        el.innerHTML = el.innerHTML.substring(1)+colpp+tblHtml;
        //el.innerHTML = "<a href='#' class='ndlink' onclick='nd_new_col(\""+nodeId+"\")'>Col++</a>" + el.innerHTML;

        //el.style.width = w + 'px';//todo:needed?
        //el.style.height = h + 'px';   //todo:needed?
        var tbl=document.getElementById(el.id+"_tbl");
        //console.log(tbl.firstChild.firstChild);
        gTABLES[el.id+"_tbl"]=tbl;
        gTABLE_ROWS[el.id+"_tbl_1"]=tbl.firstChild.firstChild;
    } else {
        var numcols = gTABLES[nodeId+"_tbl"].firstChild.firstChild.childElementCount;
        trHtml="";//="<tr>";
        for (var i=0; i<numcols; i++) {
            trHtml += "<td><input type='text' oninput='input_oninput(this)'></td>";
            //console.log(i);
        }
        //trHtml += "</tr>"
        var tr=document.createElement("tr");
        tr.innerHTML=trHtml;
        var t=1;// t=>try, todo: redo this part
        for (var t=1; t<100; t++) {
            var row=gTABLE_ROWS[nodeId+'_tbl_'+t];
            if (row == null) break;
        }
        gTABLES[nodeId+"_tbl"].firstChild.appendChild(tr);
        gTABLE_ROWS[nodeId+"_tbl_"+t]=tr;
    }
}

function get_scale() {
    return gPERCENT/100.0;
}
function el_get_x(el) {
    return parseInt(window.getComputedStyle(el).left.replace("px",""));
}
function el_get_y(el) {
    return parseInt(window.getComputedStyle(el).top.replace("px",""));
}

function build_csv_node() {
    var copied = false;
    var scale = get_scale();  //gPERCENT/100.0;
    var w = ((60*scale));
    var h = ((60*scale));
    var div = document.createElement("div");
    div.style.width = w+'px';
    div.style.height = h+'px';
    div.style.backgroundColor='black';
    div.style.position="absolute";
    div.style.left = (10*scale)+"px";
    div.style.top = (10*scale)+"px";
    div.classList.add("scalable");
    div.classList.add("pos-scalable");
    div.style.zIndex="100";
    div.classList.add("nd");
    //div.classList.add("collapsible");
    //div.id = "dragg-el";
    div.id="Node_"+gNODE_ID++;//"NodeA";
    div.style.cursor="copy"; // move
    if (div.id == 'Node_1') div.style.cursor="default";
    div.style.color="white";
    div.style.fontFamily="Monospace";
    div.style.fontSize="11px";
    div.innerHTML="&#8709;";
    div.style.paddingLeft="3px";
    div.style.paddingTop="3px";
    div.style.margin="0";
    document.getElementById("content").appendChild(div);
    if (div.id == 'Node_4') { div.style.cursor='not-allowed'; return; }//no event listener
    div
    /*var drag = document.createElement("button");
    drag.style.fontSize="12px";
    drag.style.fontFamily="Monospace";
    drag.innerHTML="&#10174;";
    drag.style.position="absolute";
    drag.style.right="0px";
    drag.style.bottom="0px";
    drag.style.cursor="pointer";
    drag*/.addEventListener("mousedown", function(e) {
        var offsetX = e.clientX - parseInt(window.getComputedStyle(div).left.replace("px",""));
        var offsetY = e.clientY - parseInt(window.getComputedStyle(div).top.replace("px",""));
        //var drel = document.getElementById("dragg-el");
        var drelsty = window.getComputedStyle(/*drel*/div);

        function mouseMove(e) {
            div.style.cursor = "move";
            var y = (e.clientY-offsetY);
            var x = (e.clientX  - offsetX);
            /*drel*/div.style.top =( y /*- parseInt(drelsty.height)*/  )+'px';            

            /*drel*/div.style.left = (x /*- parseInt(drelsty.width)*/)+'px';

            if (div.id == 'Node_1') {
                //(e.clientX-offsetX)+'px';
                var path = document.getElementById("ex1");
                var inNdSty=window.getComputedStyle(gEX_IN_ND);
		var leftNdPos ={};
                leftNdPos.x=parseInt(inNdSty.left.replace("px",""));
                leftNdPos.y=parseInt(inNdSty.top.replace("px",""));
		var rightNdPos = {x: x, y: y};
		path_set_attr(path, leftNdPos, rightNdPos);
		
            } else if (div.id == 'Node_3') {
                var path = document.getElementById("ex1");
                var jnNdSty=window.getComputedStyle(gEX_JN_ND);
		var rightNdPos = {};
                rightNdPos.x=parseInt(jnNdSty.left.replace("px",""));
                rightNdPos.y=parseInt(jnNdSty.top.replace("px",""));
		var leftNdPos = {x: x, y: y};
		path_set_attr(path, leftNdPos, rightNdPos);
            }
        }
        
        function mouseUp() {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseup', mouseUp);
            if (!copied && div.id != 'Node_1') {
                div.innerHTML += "<a data='"+div.id+"' class='ndlink' onclick='nd_new_row(\""+div.id+"\")'>Row++</a>";
                build_csv_node();
            }
            copied = true;
            div.style.left = Math.max(el_get_x(div),0) + 'px';
            div.style.top = Math.max(el_get_y(div), 80) + 'px';
            div.style.cursor = "default"; //"copy";
        }
        
        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseup', mouseUp);
    });
    /*
div.appendChild(drag);
*/
}

window.addEventListener("DOMContentLoaded", function() {
    /* Example Join Node */
    var joinId=gNODE_ID;
    build_csv_node();
    var joinNd = document.getElementById("Node_"+joinId);
    joinNd.style.left = "200px";
    joinNd.style.top = "300px";
    joinNd.style.backgroundColor = "purple";
    var tblHtml="<table id='"+joinNd.id+"_tbl"+"'><tbody><tr><td><input type='text' oninput='input_oninput(this)' value='0'></td><td><input type='text' oninput='input_oninput(this)' value='1'></td></tr><tr><td><input type='text' oninput='input_oninput(this)' value='0'></td><td><input type='text' oninput='input_oninput(this)' value='1'></td></tr></tbody></table>";
    var colpp="<br/><a href='#' class='ndlink' onclick='nd_new_col(\""+joinNd.id+"\")'>Col++</a>"
    joinNd.innerHTML = "Join<br/>" + "<a data='"+joinNd.id+"' class='ndlink' onclick='nd_new_row(\""+joinNd.id+"\")'>Row++</a>" + colpp + tblHtml;
    var tbl=document.getElementById(joinNd.id+"_tbl");
    //console.log(tbl.firstChild.firstChild);
    gTABLES[joinNd.id+"_tbl"]=tbl;
    gTABLE_ROWS[joinNd.id+"_tbl_1"]=tbl.firstChild.firstChild;
    gTABLE_ROWS[joinNd.id+"_tbl_2"]=tbl.firstChild.children[1];

    /* Example Input Node */
    var in1Id=gNODE_ID;
    build_csv_node();
    var ex1Nd = document.getElementById("Node_"+in1Id);
    ex1Nd.style.left = "150px";
    ex1Nd.style.top = "150px";

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    svg.setAttribute('width', '80000px');
    svg.setAttribute('height', '80000px');
    // (210 + 200 )/2
    path.setAttribute('d', 'M 210 465 Q 205 383 200 300');//setAttribute('d', 'M 210 465 C 200 300 180 320 190 310');//('d', 'M 150 450 Q 450 150 200 300');//'M 150 150 q 150 -150 300 0');
    path.setAttribute('stroke-width', '1');
    path.setAttribute('stroke', 'black');
    path.setAttribute('fill', 'none');
    path.id="ex1";
    svg.appendChild(path);
    document.body.appendChild(svg);

    /* Example Input Node */
    var in2Id=gNODE_ID;
    build_csv_node();
    var ex2Nd = document.getElementById("Node_"+in2Id);
    ex2Nd.style.left = "150px";
    ex2Nd.style.top = "450px";

    gEX_IN_ND=ex2Nd;
    gEX_JN_ND=joinNd;

    var jn=gNODE_ID;
    //console.log(jn);
    build_csv_node();
    var jnN=document.getElementById('Node_'+jn);
    jnN.style.backgroundColor='purple';
    jnN.innerHTML='Join';
    //jnN.removeEventListener('mousedown');
    jnN.style.left='100px';
    
    build_csv_node();
});

function template_node_dimensions() {
    var templateNode = document.getElementById("Node_"+(gNODE_ID-1));
    var templ_sty = window.getComputedStyle(templateNode);
    var w = parseInt(templ_sty.width.replace("px",""));
    var h = parseInt(templ_sty.height.replace("px",""));
    return {w: w, h:h};
}

function path_set_attr(path, leftNdPos, rightNdPos) {
    var templ_w_h=template_node_dimensions();
    rightNdPos.y += ((templ_w_h.h / 2.0) -4/*padding*/);
    leftNdPos.x += ((templ_w_h.w) +4/*padding*/);
    leftNdPos.y += ((templ_w_h.h / 2.0) -4/*padding*/ -10/*??*/);

    var cpoffset = 0; // control-point offset
    if ((rightNdPos.y - leftNdPos.y) > 8) cpoffset = 20;
    if ((leftNdPos.y - rightNdPos.y) > 8) cpoffset = -20;
    
    var cpx = (leftNdPos.x + rightNdPos.x)/2; // control-point x
    var cpy = (leftNdPos.y + rightNdPos.y)/2 + cpoffset;
    path.setAttribute('d', 'M '+leftNdPos.x+' '+leftNdPos.y+' Q '+cpx+' '+cpy+' '+rightNdPos.x+' '+rightNdPos.y+'');
    //path.setAttribute('d', 'M '+leftNdPos.x+' '+leftNdPos.y+' Q '+leftNdPos.y+' '+leftNdPos.x+' '+rightNdPos.x+' '+rightNdPos.y+'');
}

function toggle_visibility() {
    var bm = document.getElementById("button-minus");
    var bp = document.getElementById("button-plus");
    bm.style.visibility = "visible";
    bp.style.visibility = "visible";
    if ((gPERCENT - gPERCENT_INCREMENT) <= 3) {
        bm.style.visibility = "hidden";
    } else if ((gPERCENT + gPERCENT_INCREMENT) >= 997) {
        bp.style.visibility = "hidden";
    }
}

function scale(percentLarger) {
    var scale = 1.0 + percentLarger/gPERCENT;
    gPERCENT += percentLarger;
    var els = document.getElementsByClassName("scalable");
    //var scale = 1.0 + percentLarger/100.0;
    //if (percentLarger < 0 ) {
    //    scale = 
    //}
    console.log(scale);

    var templ_w_h = template_node_dimensions();
    var templ_w = templ_w_h.w;
    var templ_h = templ_w_h.h;
    for (var i=0; i<els.length; i++) {
        var compsty = window.getComputedStyle(els[i]);

        if (els[i].id != null && els[i].id.substring(0,4)=="Node") {
            console.log("found node");
            var w = ((scale*templ_w));
            var h = ((scale*templ_h));
            els[i].style.width = w + 'px';
            els[i].style.height = h + 'px';
        } else {
            var w = parseInt(compsty.width.replace("px",""));
            var h = parseInt(compsty.height.replace("px",""));
            w = ((scale*w));
            h = ((scale*h));
            els[i].style.width = w + 'px';
            els[i].style.height = h + 'px';
        }
        //els[i].style.maxWidth = w + 'px';
        //els[i].style.maxHeight = h + 'px';
        //els[i].style.minWidth = w;// + 'px';
        //els[i].style.minHeight = h;// + 'px';
        //console.log(w);
        //console.log(w, els[i].id);
    }
    var els = document.getElementsByClassName("vert-scalable");
    for (var i=0; i<els.length; i++) {
        var compsty = window.getComputedStyle(els[i]);
        var h = parseInt(compsty.height.replace("px",""));
        h = ((scale*h));
        els[i].style.height = h + 'px';
    }
    var els = document.getElementsByClassName("pos-scalable");
    for (var i=0; i<els.length; i++) {
        var compsty = window.getComputedStyle(els[i]);
        var l = parseInt(compsty.left.replace("px",""));
        var t = parseInt(compsty.top.replace("px",""));
        l = ((scale*l));
        t = ((scale*t));
        els[i].style.left = l + 'px';
        els[i].style.top = t + 'px';
    }
    
    document.getElementById("button-percent").innerHTML=gPERCENT+"%";
    toggle_visibility();
    var jnNdSty=window.getComputedStyle(gEX_JN_ND);
    var x = parseInt(jnNdSty.left.replace("px",""));
    var y = parseInt(jnNdSty.top.replace("px",""));
    var path = document.getElementById("ex1");
    var inNdSty=window.getComputedStyle(gEX_IN_ND);
    var x2=parseInt(inNdSty.left.replace("px",""));
    var y2=parseInt(inNdSty.top.replace("px",""));
    var leftNdPos = {x: x2, y: y2};
    var rightNdPos= {x: x, y: y};
    path_set_attr(path, leftNdPos, rightNdPos);
}

function scaleDown() {
    if ((gPERCENT - gPERCENT_INCREMENT) <= 3) {
        return;
    }
    console.log("down",-gPERCENT_INCREMENT);
    scale(-gPERCENT_INCREMENT);
}

function scaleUp() {
    if ((gPERCENT + gPERCENT_INCREMENT) >= 997) {
        return;
    }
    scale(gPERCENT_INCREMENT);
}

function scaleNormal() {
    var percentLarger = 0;
    if (gPERCENT > 100) {
        percentLarger = -(gPERCENT - 100);
    }
    else if (gPERCENT < 100) {
        percentLarger = (100 - gPERCENT);
    }
    else { return; }
    scale(percentLarger);//back to 100%
}


function toggle_nav() {
    var btn=document.getElementById("button-toggle-nav");
    btn.style.zIndex = "1000";
    // Just let top nav elements get pushed upwards off the screen

    //var els=document.getElementsByClassName("collapsible");
    //for (var i=0; i<els.length; i++) {
    //    els[i].style.visibility = (btn.innerHTML="^^^ Collapse ^^^") ? "hidden" : "visible";
    //}
    var yOffset = get_scale() * 80;
    if (btn.innerHTML == "^^^ Collapse ^^^") {
        btn.innerHTML="vvv Expand vvv";
        yOffset = 0 - yOffset;
    } else {
        btn.innerHTML="^^^ Collapse ^^^";
        yOffset = 0 + yOffset;
    }
    document.getElementById("header-overlay").style.visibility = (yOffset > 0) ? "visible" : "hidden";
    
    var els = document.getElementsByClassName("pos-scalable");
    for (var i=0; i<els.length; i++) {
        var compsty = window.getComputedStyle(els[i]);
        var t = parseInt(compsty.top.replace("px",""));
        t += yOffset;
        els[i].style.top = t + 'px';
    }
}
