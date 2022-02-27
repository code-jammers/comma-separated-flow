gPERCENT=100;
gPERCENT_INCREMENT=50;
gNODE_ID=1;

gTABLES={};
gTABLE_ROWS={};


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
    div.style.color="white";
    div.style.fontFamily="Monospace";
    div.style.fontSize="11px";
    div.innerHTML="&#8709;";
    div.style.paddingLeft="3px";
    div.style.paddingTop="3px";
    div.style.margin="0";
    document.getElementById("content").appendChild(div);
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
            /*drel*/div.style.top =( (e.clientY-offsetY) /*- parseInt(drelsty.height)*/  )+'px';            

            /*drel*/div.style.left = ((e.clientX  - offsetX) /*- parseInt(drelsty.width)*/)+'px';
        }
        
        function mouseUp() {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseup', mouseUp);
            if (!copied) {
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
    build_csv_node();
});

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
    var templateNode = document.getElementById("Node_"+(gNODE_ID-1));
    var templ_sty=window.getComputedStyle(templateNode);
    var templ_w = parseInt(templ_sty.width.replace("px",""));
    var templ_h = parseInt(templ_sty.height.replace("px",""));
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
