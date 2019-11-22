
function TTuJing() {
    this.mapParams = null;
    this.map = null;
    this.vectorLayer = null;
    this.tileLayer = null;
    this.panZoom = null;
    this.markerLayer = null;
    this.initLon = 800;
    this.initLat = 800;
    this.preUrl = "http://192.168.8.185/";
    this.measure = null;
    this.mapYY = null;
    this.mapParamsYY = null;
    this.lbl = null;
}
var __map = null;
TTuJing.prototype.InitMap = function (mapDv) {
    //this.preUrl ="http://192.168.8.185/";
    SUtil.SetImagesLocation("/bztour/static/plugins/TJMap/Resource/Theme/StyleDefault/");
    this.mapParams = new SMapParamOption(); 
    this.mapParams.Resolutions = [1,0.5,0.25,0.125];  
    this.mapParams.TileSize = new SSize(200,200);
    this.mapParams.MaxExtent = new SBounds(0,0,1600,1600);
    this.map = new SMap(mapDv, this.mapParams);
    this.map.AddControlToMap(new SNavigation());
    this.vectorLayer = new SVectorLayer("vLayer");
    this.tileLayer = new STileLayer("三维图",this.preUrl+"tiles/bztiles/", 'png');
    this.tileLayer.SetTilePathRuleFun(TTuJing.CustomUrlSw);
    this.tileLayer.SetMainLayer(true);
    this.map.AddLayer(this.tileLayer); 
    this.map.AddLayer(this.vectorLayer);
    this.panZoom = new SPanZoomBar();
    this.map.AddControl(this.panZoom);
    this.markerLayer = new SMarkerLayer("POI层");
    this.map.AddLayer(this.markerLayer);
    this.map.SetCenter(new SLonLat(this.initLon, this.initLat), 1);
    __map = this.map;
    var meatureStyle = new SFeatureStyle();
    meatureStyle.SetFillColor("none");
    meatureStyle.SetHoverFillColor("none");
    meatureStyle.SetStrokeColor("red");
    meatureStyle.SetStrokeWidth(4);
    meatureStyle.SetStrokeStartArrow("Oval");
    meatureStyle.SetStrokeEndArrow("Classic");
    meatureStyle.SetStrokeDashStyle("ShortDashDot");
    this.map.SetEffectiveExtent(new SBounds(0,300,1600,1600));
    
    this.lbl = new SLabel(null, new SLonLat(this.initLon, this.initLat), null, "");
    this.lbl.SetOpacity(0.8);
    this.lbl.SetBackgroundColor("rgb(221, 94, 34)");
    this.lbl.SetHoverCssStyle("button red");
    this.lbl.SetCssStyle("button2");
    this.lbl.SetOffset(new SSize(20, -35));
    this.lbl.SetAdaptive();
    this.map.AddLabel(this.lbl);
    this.lbl.Hide();

   // this.map.AddEventListener("mousemove", function (evt) {
        //if (__mapYY != null) {
         //   __mapYY.SetCenter(__map.GetCenter(),__map.GetZoom()-1);
        //}
    //});
    //测距
    //this.meature = new SMeasure(this.vectorLayer, SHPath, meatureStyle);
   
  
    //this.map.AddEventListener('zoomend',TTuJing.UpdateScale);
   // alert(333);
    
}
TTuJing.UpdateScale=function(){ 
	 var zm = QMAP.GetMap().GetZoom();
	 try{
		 	var dm = document.getElementById("mapScale");
		 	dm.innerHTML=200/Math.pow(2,zm) + "米";
	 }catch(esdf){} 
}
TTuJing.CustomUrlSw = function (pTile) {
    var z = this.GetMap().GetZoom(); 
    var r = pTile.GetRow();
    var col = pTile.GetCol();
    var path = (z+4) + "/" + r + "/" + col + "." + this.GetType();
    z = null;
    r = null;
    col = null;
    return this.GetPrefixPath() + path;
}
var __mapYY = null;
TTuJing.prototype.InitMapYY = function (mapDv) {
    //this.preUrl ="http://122.228.133.85:9898/";
    SUtil.SetImagesLocation(this.preUrl + "/static/plugins/TJMap/Resource/Theme/StyleDefault/");
    this.mapParamsYY = new SMapParamOption();
    //this.mapParams.Resolutions = [1, 0.5,0.25,0.125,0.0625,0.03125];
    this.mapParamsYY.Resolutions = [2, 1, 0.5, 0.25];
    this.mapParamsYY.TileSize = new SSize(200, 200);
    //this.mapParams.MaxExtent = new SBounds(0,0,1000,1000);
    this.mapParamsYY.MaxExtent = new SBounds(0, 0, 2000, 2000);
    this.mapYY = new SMap(mapDv, this.mapParamsYY);
    var nav = new SNavigation();
    nav.SetWheelEnabled(false);
    this.mapYY.AddControlToMap(nav);
    this.tileLayer = new STileLayer("三维图", "http://60.12.184.20/airtiles/zt/", 'jpg');
    this.tileLayer.SetTilePathRuleFun(TTuJing.CustomUrlSwYY);
    this.tileLayer.SetMainLayer(true);
    this.mapYY.AddLayer(this.tileLayer);
    this.mapYY.SetCenter(new SLonLat(this.initLon, this.initLat), 0);
    __mapYY = this.mapYY;

    this.mapYY.AddEventListener("mousemove", function (evt) {
        if (__map != null) {
            __map.SetCenter(__mapYY.GetCenter()); 
        }
    });

}
TTuJing.CustomUrlSwYY = function (pTile) {
    var z = this.GetMap().GetZoom();
    var r = pTile.GetRow();
    var col = pTile.GetCol();
    var path = (z+4) + "/" + r + "/" + col + "." + this.GetType();
    z = null;
    r = null;
    col = null;
    return this.GetPrefixPath() + path;
}


TTuJing.prototype.SetCenter = function(leve){
	if(leve!=null){
		this.map.SetCenter(new SLonLat(this.initLon, this.initLat),leve);
	}else{
		this.map.SetCenter(new SLonLat(this.initLon, this.initLat), 1);
	}
	
};

/** 
* 在地图中添加点
* @param lon 经度
* @param lat 纬度
* @param iconUrl 图标相对于preUrl的路径
* @param iconSize 图标尺寸大小new SSize(30,30)
* @param iconOffset 图标地图点显示的偏移量new SPixel(-15,-30);
* @param enableClick  是否启动点击，点击后显示标签内容
* @param defaultShowInfo 是否默认显示标签内容
* @param infoWindowSize 标签尺寸大小,默认尺寸new SSize(300,120)
* @param infoText 标签内容
* @param markerTag 注记组标记 
* @type void
*/
TTuJing.prototype.AddMarker = function (lon, lat, iconUrl, iconSize, iconOffset, enableClick, defaultShowInfo, infoWindowSize, infoText, markerTag) {
    if (iconOffset == null && iconSize != null) {
        iconOffset = new SPixel(iconSize.GetWidth(), iconSize.GetHeight());
    }
    if (infoWindowSize == null) {
        infoWindowSize = new SSize(300, 120);
    }
    var gg = new SIcon(this.preUrl + iconUrl, iconSize, iconOffset);
    var mm = new SMarker(new SLonLat(lon, lat), gg, markerTag);
    this.markerLayer.AddMarker(mm);
    if (enableClick == true) {
        mm._text = infoText; 
        mm._iconSize = iconSize;
        mm._map = this.map;
        mm._infoWindowSize = infoWindowSize;
        mm.AddEventListener("click", mm, function () { 
            mm._map.SInfoWindow.SetLonLat(this.GetLonLat(), null, false);
            mm._map.SInfoWindow.SetInnerHTML(mm._text);
            mm._map.SInfoWindow.SetOffset(new SSize(0,mm._iconSize.GetHeight()  * -1));
            mm._map.SInfoWindow.SetSize(mm._infoWindowSize);
            mm._map.SInfoWindow.Show();
        });
    }

    if (defaultShowInfo == true) {
        this.map.SInfoWindow.SetLonLat(new SLonLat(lon, lat), null, false);
        this.map.SInfoWindow.SetInnerHTML(infoText);
        this.map.SInfoWindow.SetOffset(new SSize(0,iconSize.GetHeight() * -1));
        this.map.SInfoWindow.SetSize(infoWindowSize);
        this.map.SInfoWindow.Show();
    }
};
//视频地图专用
var tcid="";

TTuJing.prototype.AddMarkerB = function (lon, lat, iconUrl, iconSize, iconOffset, enableClick, defaultShowInfo, infoWindowSize, infoText, markerTag,id,videoVersion,name,QCode) {
    if (iconOffset == null && iconSize != null) {
        iconOffset = new SPixel(iconSize.GetWidth(), iconSize.GetHeight());
    }
    if (infoWindowSize == null) {
        infoWindowSize = new SSize(300, 120);
    }
    var dt="";
	QCode=QCode+"";
	if(QCode=='100'){
		dt="map";
	}else if(QCode.substring(0,1)=='2'){
		dt="map2";
	}else if(QCode.substring(0,1)=='1'){
		dt="map3";
	}
    var gg = new SIcon(this.preUrl + iconUrl, iconSize, iconOffset);
    var mm = new SMarker(new SLonLat(lon, lat), gg, markerTag);
    this.markerLayer.AddMarker(mm);
    var lay= function () {
    	if($("#huancong").attr("name")=='true'){huanCongLay(id);}else if($("#btnRectangle").attr("name")=='true'){
        mm._map.SInfoWindow.SetLonLat(this.GetLonLat(), null, false);
        mm._map.SInfoWindow.SetInnerHTML(mm._text);
        mm._map.SInfoWindow.SetOffset(new SSize(0,mm._iconSize.GetHeight()  * -1));
        mm._map.SInfoWindow.SetSize(mm._infoWindowSize);
        mm._map.SInfoWindow.Show();
        QMAP.SetCenterMoveSlowing( new SLonLat(lon*1+50,lat*1+130),1);
        tcid=id;
    	}
    }
    if (enableClick == true) {
        mm._text = infoText; 
        mm._iconSize = iconSize;
        mm._map = this.map;
        mm._infoWindowSize = infoWindowSize;
        mm.AddEventListener("click", mm,lay);
    }

    //----------------------------绑定鼠标悬浮事件
    var mmb = new SMarker(new SLonLat(lon, lat), gg, markerTag);
    this.markerLayer.AddMarker(mmb);
    var lbl = null;
    var layb= function () {
    	if($("#"+dt).find("[name='sfcx']").css('display')==null || $("#"+dt).find("[name='sfcx']").parent().parent().css('display')=='none' || tcid!=id){  		
    	    if(lbl==null){
    	    	lbl = new SLabel(null, new SLonLat(lon, lat), null, "<nobr id=='codename' style='font-size: 13px;;margin: 0px;font-family:黑体;color:#ffffff;'>&nbsp;名称:"+name+"&nbsp;<br/>&nbsp;型号:"+videoVersion+"</nobr>");
    	    	lbl.SetOpacity(0.8);
        	    lbl.SetBackgroundColor("rgb(221, 94, 34)");
        	    lbl.SetHoverCssStyle("button red");
        	    lbl.SetCssStyle("button2");
        	    lbl.SetOffset(new SSize(20, -35));
        	    lbl.SetAdaptive();
        	    QMAP.GetMap().AddLabel(lbl);
    	    }   		
    	    lbl.Show();
    	    $(".button2").css({"border-radius":"3px","opacity":"1","z-index":"500"});
    }
    }
    if (enableClick == true) {
        mmb.AddEventListener("mousemove", mmb,layb);
        
    }
  //----------------------------绑定鼠标离开事件
    var mmc = new SMarker(new SLonLat(lon, lat), gg, markerTag);
    this.markerLayer.AddMarker(mmc);
    var layc= function () {
    	if(/*$("#"+dt).find("#codename").attr("id")=="codename"*/1==1){
    		lbl.Hide();
    	}
    }
    if (enableClick == true) {
        mmc.AddEventListener("mouseout", mmc,layc);
    }
    
    if (defaultShowInfo == true) {
        this.map.SInfoWindow.SetLonLat(new SLonLat(lon, lat), null, false);
        this.map.SInfoWindow.SetInnerHTML(infoText);
        this.map.SInfoWindow.SetOffset(new SSize(0,iconSize.GetHeight() * -1));
        this.map.SInfoWindow.SetSize(infoWindowSize);
        this.map.SInfoWindow.Show();
        QMAP.SetCenterMoveSlowing( new SLonLat(lon*1+50,lat*1+130),1);
    }
};

TTuJing.prototype.AddMarkerC = function (lon, lat, iconUrl, iconSize, iconOffset, enableClick, defaultShowInfo, infoWindowSize, infoText, markerTag,id) {
    if (iconOffset == null && iconSize != null) {
        iconOffset = new SPixel(iconSize.GetWidth(), iconSize.GetHeight());
    }
    if (infoWindowSize == null) {
        infoWindowSize = new SSize(300, 120);
    }
    var gg = new SIcon(this.preUrl + iconUrl, iconSize, iconOffset);
    var mm = new SMarker(new SLonLat(lon, lat), gg, markerTag);
    this.markerLayer.AddMarker(mm);
    if (enableClick == true) {
        mm._text = infoText; 
        mm._iconSize = iconSize;
        mm._map = this.map;
        mm._infoWindowSize = infoWindowSize;
        mm.AddEventListener("click", mm,function(){
        	mm._map.SInfoWindow.SetLonLat(this.GetLonLat(), null, false);
            mm._map.SInfoWindow.SetInnerHTML(mm._text);
            mm._map.SInfoWindow.SetOffset(new SSize(0,mm._iconSize.GetHeight()  * -1));
            mm._map.SInfoWindow.SetSize(mm._infoWindowSize);
            mm._map.SInfoWindow.Show();
            QMAP.SetCenterMoveSlowing( new SLonLat(lon*1+50,lat*1+130),1);
        });
    }

    if (defaultShowInfo == true) {
        this.map.SInfoWindow.SetLonLat(new SLonLat(lon, lat), null, false);
        this.map.SInfoWindow.SetInnerHTML(infoText);
        this.map.SInfoWindow.SetOffset(new SSize(0,iconSize.GetHeight() * -1));
        this.map.SInfoWindow.SetSize(infoWindowSize);
        this.map.SInfoWindow.Show();
        QMAP.SetCenterMoveSlowing( new SLonLat(lon*1+50,lat*1+130),1);
    }
};
/** 
* 在地图中添加点
* @param lon 经度
* @param lat 纬度
* @param iconUrl 图标相对于preUrl的路径
* @param iconSize 图标尺寸大小new SSize(30,30)
* @param iconOffset 图标地图点显示的偏移量new SPixel(-15,-30);
* @param enableClick  是否启动点击，点击后显示标签内容
* @param defaultShowInfo 是否默认显示标签内容
* @param infoWindowSize 标签尺寸大小,默认尺寸new SSize(300,120)
* @param infoText 标签内容
* @param markerTag 注记组标记 
* @type void
*/
TTuJing.prototype.AddSimpleMarker = function (lon, lat, iconUrl, iconSize, iconOffset, enableClick,markerTag,func) {
    if (iconOffset == null && iconSize != null) {
        iconOffset = new SPixel(iconSize.GetWidth(), iconSize.GetHeight());
    }
    var gg = new SIcon(iconUrl, iconSize, iconOffset);
    var mm = new SMarker(new SLonLat(lon, lat), gg, markerTag);
    this.markerLayer.AddMarker(mm);
    if (enableClick == true) {
    	mm.AddEventListener("click", mm, function () {
    		func();
    	});
    }
}
//视频地图初始化
TTuJing.prototype.AddSimpleMarkerB = function (lon, lat, iconUrl, iconSize, iconOffset, enableClick,markerTag,func,obj) {
    if (iconOffset == null && iconSize != null) {
        iconOffset = new SPixel(iconSize.GetWidth(), iconSize.GetHeight());
    }
    var gg = new SIcon(iconUrl, iconSize, iconOffset);
    var mm = new SMarker(new SLonLat(lon, lat), gg, markerTag);
    this.markerLayer.AddMarker(mm);
    if (enableClick == true) {
    	mm.AddEventListener("click", mm, function (e) {
    		func(obj,e.target);
    	});
    }
}
//交通卡口地图初始化
TTuJing.prototype.AddSimpleMarkerBay = function (lon, lat, iconUrl, iconSize, iconOffset, enableClick,markerTag,func,obj) {
  if (iconOffset == null && iconSize != null) {
      iconOffset = new SPixel(iconSize.GetWidth(), iconSize.GetHeight());
  }
  var gg = new SIcon(iconUrl, iconSize, iconOffset);
  var mm = new SMarker(new SLonLat(lon, lat), gg, markerTag);
  
  iconUrl=jypath+iconUrl;
  gg.GetDiv().style.cursor="pointer";
  mm.lon = lon;
  mm.lat = lat;
  mm.lblcnt = "<nobr  style='font-size: 14px;margin: 0px;font-family:黑体;color:#ffffff;'>" +
  	    	"&nbsp;<label style='line-height: 17px;'>"+obj.fname+"&nbsp;</label><br/>";
  
  this.markerLayer.AddMarker(mm);
  if (enableClick == true) {
  	mm.AddEventListener("click", mm, function (e) {
  		func(obj,e.target);
  	});
  	mm.AddEventListener("mousemove", mm,function(){
		QMAP.lbl.SetTitle(mm.lblcnt);
		QMAP.lbl.MoveToWithLonLat(new SLonLat(mm.lon,mm.lat));
		QMAP.lbl.Show();
	    $(".button2").css({"border-radius":"3px","opacity":"1","z-index":"500","margin-top":"-10","padding":"4px"});
	});//鼠标悬浮
	mm.AddEventListener("mouseout", mm,function(){
		QMAP.lbl.Hide();
	}); //鼠标离开
  }
  
}

//xjr语音广播功能(需要传入广播name)
function getRadio(arrId,arrName){
	var divs = "<div class='ifra'><div style='width:90%;position: relative;  left: 5%;top: 20%;'><span style='font-weight:bold; font-size:23px;'>选中的语音广播：</span>";
	for(var i=0;i<arrId.length;i++){
		if(i!=arrId.length-1){
			divs+="<span>"+arrName[i]+"、</span>";
		}else{
			divs+="<span>"+arrName[i]+"</span>";
		}
		
	}
	divs+="</div><br/>"
//	var kz = "<div ><input type='button' value='喊话'/>&nbsp;&nbsp;&nbsp;<input type='button' value='暂停'/>&nbsp;&nbsp;&nbsp;<input type='button' value='停止'/></div>";
	var kz = "<div ><span style='position: relative;left: 15%;'><input id='ks' class='hotline24'  type='button' onclick='speech();' value='开始喊话'/></span><span style='position: relative;left: 20%;'><input id='zt' class='hotline24' onclick='suspended();' style='display:none' disabled='disabled' type='button' value='暂停'/></span><span style='position: relative;left: 38%;'><input id='tz' class='hotline24' disabled='disabled' onclick='stop();'  type='button' value='停止'/></span></div></div>";
	parent.layer.open({
	    type:1,
	    title:false,
	  	content:divs+kz,
	  	area: ['500px', '250px'],
	});
	$("#zt").disabled=true;
	$("#tz").disabled=true;
}


//视频地图
TTuJing.prototype.AddSimpleMarkerC = function (lon, lat, iconUrl, iconSize, iconOffset, enableClick,markerTag,func,obj) {
	 
	if("/static/images/icons/icon1_10.png"==iconUrl){
    	if (iconOffset == null && iconSize != null) {
            iconOffset = new SPixel(iconSize.GetWidth(), iconSize.GetHeight());
        }
        iconUrl=jypath+iconUrl;
        var gg = new SIcon(iconUrl, iconSize, iconOffset);
        gg.GetDiv().style.cursor="pointer";
        /*gg.SetTitle();*/
        var mm = new SMarker(new SLonLat(lon, lat), gg, markerTag);
        mm.lon = lon;
        mm.lat = lat;
        
        mm.lblcnt = "<nobr  style='font-size: 14px;margin: 0px;font-family:黑体;color:#ffffff;'>" +
        	    	"&nbsp;<label style='line-height: 17px;'>"+obj.name+"&nbsp;</label><br/>";
       if(obj.areaid!=null){
    	   var areaname="&nbsp;<label style='line-height: 17px;'>所属景区:"+obj.areaid+"&nbsp;</label></nobr>";
    	   mm.lblcnt+=areaname;
       }
        this.markerLayer.AddMarker(mm);
        
 
        if (enableClick == true) {
        	mm.AddEventListener("click", mm, function(e){ 
        		
       /* 		var _preMapCenter = map.GetCenter(); 
				map.SInfoWindow.SetLonLat(this._ll);
				map.SInfoWindow.SetOffset(new SSize(0,-33));
				map.SInfoWindow.SetInnerHTML(this.lblcnt);
				map.SInfoWindow.SetSize(new SSize(700, 460));
				map.SInfoWindow._marker=this;
				map.SInfoWindow.Show();
				map.SInfoWindow.ReWriteInfoClose(function () {  
		        	if(_preMapCenter!=null){
		        		map.SetCenter(_preMapCenter);
		        		map.SetCenter(_preMapCenter);
		        		_preMapCenter = null; 
		        	}
		        	map.SInfoWindow.Hide()    ; 
		        	clearFrame();
			
				});*/
        	
        		func(obj,null,e.target);
        		});
        	mm.AddEventListener("mousemove", mm,function(){
        		QMAP.lbl.SetTitle(mm.lblcnt);
        		QMAP.lbl.MoveToWithLonLat(new SLonLat(mm.lon,mm.lat));
        		QMAP.lbl.Show();
        	    $(".button2").css({"border-radius":"3px","opacity":"1","z-index":"500","margin-top":"-10","padding":"4px"});
        	});//鼠标悬浮
        	mm.AddEventListener("mouseout", mm,function(){
        		QMAP.lbl.Hide();
        	}); //鼠标离开
        
        }
    }else{
    	if("/static/images/icons/icon1_2.png"==iconUrl){
    		var divs = "<input type='button' class='hotline24' id='draw' value='地图广播框选' onclick='RectangleClick();' />";
    		$("#jxgb").html(divs);
    	}
    	
    	if (iconOffset == null && iconSize != null) {
            iconOffset = new SPixel(iconSize.GetWidth(), iconSize.GetHeight());
        }
        iconUrl=jypath+iconUrl;
        var gg = new SIcon(iconUrl, iconSize, iconOffset);
        gg.GetDiv().style.cursor="pointer";
        /*gg.SetTitle();*/
        var mm = new SMarker(new SLonLat(lon, lat), gg, markerTag);
        mm.lon = lon;
        mm.lat = lat;
        var num;
    	if (obj.num != undefined&&obj.num !="") {
    		num = obj.num;
    	} else {
    		num = 0;
    	}
        if("/bftour/static/images/icons/icon1_9.png" == iconUrl ){
        	mm.lblcnt = "<nobr  style='font-size: 14px;;margin: 0px;font-family:黑体;color:#ffffff;'>" +
	    	"&nbsp;<label style='line-height: 17px;'>名称:"+obj.name+"&nbsp;<br/>&nbsp;当前连接数量:"+num+"</label><br/>";	
        }else{
        	mm.lblcnt = "<nobr  style='font-size: 14px;;margin: 0px;font-family:黑体;color:#ffffff;'>" +
	    	"&nbsp;<label style='line-height: 17px;'>"+obj.name+"&nbsp;</label><br/>";
        }
        
/*       if(obj.areaid!=null){
    	   var areaname="&nbsp;<label style='line-height: 17px;'>所属景区:"+obj.areaid+"&nbsp;</label>";
    	   mm.lblcnt+=areaname;
       }*/
/*       if("/bftour/static/images/icons/icon1_2.png"==iconUrl){
       	var audioType ="&nbsp;<a href='http://172.30.223.2:8081/bccontrol' style='color:#FFF;text-decoration: none;' target='_bank' onmouseover='radioOver()' onmouseout='radioOut()' id='radio'>语音控制</a></nobr>";
       	mm.lblcnt+=audioType;
       }*/
        this.markerLayer.AddMarker(mm);
  
 
        if (enableClick == true) {
            
           
        	mm.AddEventListener("click", mm, function(e){
        		
        		
        		//拖动选中广播
/*        		if("/bftour/static/images/icons/icon1_2.png"==iconUrl){
        			
        			//getRadio();
        		}*/
/*        		if("/bftour/static/images/icons/icon1_19.png"==iconUrl){
        			
        		}*/
        	/*	var iframe = "<iframe name='downloadActive_iframeName_BC' style='display: none;'></iframe>"
        			var json = downloadActiveBC();
        			alert(json.result);
            		parent.layer.open({
            			type:1,
            			title:'视频信息',
            				content: iframe,
            				area: ['800px', '500px'],
            	    })*/
        		func(obj,null,e.target);
        		});
        	mm.AddEventListener("mousemove", mm,function(){
        		QMAP.lbl.SetTitle(mm.lblcnt);
        		QMAP.lbl.MoveToWithLonLat(new SLonLat(mm.lon,mm.lat));
        		QMAP.lbl.Show();
        	    $(".button2").css({"border-radius":"3px","opacity":"1","z-index":"500","margin-top":"-10","padding":"4px"});
        	});//鼠标悬浮
        	mm.AddEventListener("mouseout", mm,function(){
        		 if("/bftour/static/images/icons/icon1_2.png"!=iconUrl){
        			 QMAP.lbl.Hide();
        		 }
        	}); //鼠标离开
       
        }
    }
};

//口碑评价内容
TTuJing.prototype.AddSimpleMarkerPJ = function (lon, lat, iconUrl, iconSize, iconOffset, enableClick,markerTag,func,obj) {
  	if (iconOffset == null && iconSize != null) {
          iconOffset = new SPixel(iconSize.GetWidth(), iconSize.GetHeight());
      }
      iconUrl=jypath+iconUrl;
      var gg = new SIcon(iconUrl, iconSize, iconOffset);
      gg.GetDiv().style.cursor="pointer";
      var mm = new SMarker(new SLonLat(lon, lat), gg, markerTag);
      mm.lon = lon;
      mm.lat = lat;
      mm.lblcnt = "<div  style='font-size: 14px;margin: 0px;font-family:黑体;color:#ffffff;background-color:	#FF8C00;border-radius:10px;'>" +
	   "&nbsp;<label style='line-height: 17px;'>"+obj.name+"&nbsp;</label><br/>"+
	   "&nbsp;总评论数:<label style='line-height: 17px;'>"+obj.totalCount+"&nbsp;</label><br/>"+
	   "&nbsp;平均分:<label style='line-height: 17px;'>"+obj.average+"&nbsp;</label></div>";
      this.markerLayer.AddMarker(mm);
	  var mylbl = new SLabel(null, new SLonLat(mm.lon, mm.lat), null, mm.lblcnt,markerTag);
      mylbl.SetOpacity(1);
      //mylbl.SetBackgroundColor("#6AB1F2");
      mylbl.SetHoverCssStyle("button red"); 
      mylbl.SetCssStyle("button2 infolbl");
      mylbl.SetOffset(new SSize(18, -45));
      mylbl.SetTag(markerTag);
      mylbl.SetAdaptive();
      QMAP.GetMap().AddLabel(mylbl);
};
//口碑投诉内容
TTuJing.prototype.AddSimpleMarkerTS = function (lon, lat, iconUrl, iconSize, iconOffset, enableClick,markerTag,func,obj) {
	if (iconOffset == null && iconSize != null) {
        iconOffset = new SPixel(iconSize.GetWidth(), iconSize.GetHeight());
    }
    iconUrl=jypath+iconUrl;
    var gg = new SIcon(iconUrl, iconSize, iconOffset);
    gg.GetDiv().style.cursor="pointer";
    var mm = new SMarker(new SLonLat(lon, lat), gg, markerTag);
    mm.lon = lon;
    mm.lat = lat;
    mm.lblcnt = "<div  style='font-size: 14px;;margin: 0px;font-family:黑体;color:#ffffff;background-color:	#FF8C00;border-radius:10px;'>" +
	   "&nbsp;<label style='line-height: 17px;'>"+obj.name+"&nbsp;</label><br/>"+
	   "&nbsp;投诉总数:<label style='line-height: 17px;'>"+obj.totalCount+"&nbsp;</label><br/>";
    	this.markerLayer.AddMarker(mm);
	  var mylbl = new SLabel(null, new SLonLat(mm.lon, mm.lat), null, mm.lblcnt,obj.name);
    mylbl.SetOpacity(1);
    //mylbl.SetBackgroundColor("#6AB1F2");
    mylbl.SetHoverCssStyle("button red");
    mylbl.SetCssStyle("button2 infolbl");
    mylbl.SetOffset(new SSize(18, -45));
    mylbl.SetTag(markerTag);
    mylbl.SetAdaptive();
    QMAP.GetMap().AddLabel(mylbl);
};



function radioOver(){
	$("#radio").css({"color":"#0080FF","text-decoration":"underline"});
}
function radioOut(){
	$("#radio").css("color","#FFF");
}
function getMousePos(event) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    return { 'x': x, 'y': y };
}
//航班地图
TTuJing.prototype.AddSimpleMarkerD = function (lon, lat, iconUrl, iconSize, iconOffset, enableClick,markerTag,func,obj) {
    if (iconOffset == null && iconSize != null) {
        iconOffset = new SPixel(iconSize.GetWidth(), iconSize.GetHeight());
    }
    iconUrl=jypath+iconUrl;
    var gg = new SIcon(iconUrl, iconSize, iconOffset);
    var mm = new SMarker(new SLonLat(lon, lat), gg, markerTag);
    var mmb = new SMarker(new SLonLat(lon, lat), gg, markerTag);
    var mmc = new SMarker(new SLonLat(lon, lat), gg, markerTag);
    this.markerLayer.AddMarker(mm);
    this.markerLayer.AddMarker(mmb);
    this.markerLayer.AddMarker(mmc);
    var lbl = null;
    var xf=function (){
    	if(1==1){  		
    	    if(lbl==null){
    	    	lbl = new SLabel(null, new SLonLat(lon, lat), null, "<nobr  style='font-size: 14px;;margin: 0px;font-family:黑体;color:#ffffff;'>" +
    	    	"&nbsp;<label style='line-height: 17px;'>机位:"+obj.standPosition+"&nbsp;</label><br/>&nbsp;<label style='line-height: 17px;'>航班:"+obj.flightIdentity+"</label>&nbsp;<br/>&nbsp;<label style='line-height: 17px;'>计划入港:"+(obj.scheduledDateTime.length==0?'无':obj.scheduledDateTime)+"</label>&nbsp;<br/>&nbsp;<label style='line-height: 17px;'>距原计划延误:"+(obj.obj>0?obj.obj+'分钟':'无')+"</label></nobr>");
    	    	lbl.SetOpacity(0.8);
        	    lbl.SetBackgroundColor("rgb(221, 94, 34)");
        	    lbl.SetHoverCssStyle("button red");
        	    lbl.SetCssStyle("button2 hang");
        	    lbl.SetOffset(new SSize(20, -35));
        	    lbl.SetAdaptive();
        	    QMAP.GetMap().AddLabel(lbl);
    	    }   		
    	    lbl.Show();
    	    $(".button2").css({"border-radius":"3px","opacity":"1","z-index":"500","margin-top":"-50","padding":"4px"});
    	}
    };
    var lk=function(){
    	lbl.Hide();
    	$(".hang").hide();
    };
    if (enableClick == true) {
    	/*mm.AddEventListener("click", mm, function(e){func(obj,null,e.target);});*/
    	mmb.AddEventListener("mousemove", mmb,xf);//鼠标悬浮
    	mmc.AddEventListener("mouseout", mmc,lk); //鼠标离开
    }
    
    
};

//视频地图报警
TTuJing.prototype.AddSimpleMarkerE = function (lon, lat, iconUrl, iconSize, iconOffset, enableClick,markerTag,func,obj) {
    if (iconOffset == null && iconSize != null) {
        iconOffset = new SPixel(iconSize.GetWidth(), iconSize.GetHeight());
    }
    iconUrl=jypath+iconUrl;
    var gg = new SIcon(iconUrl, iconSize, iconOffset);
    /*gg.SetTitle();*/
    var mm = new SMarker(new SLonLat(lon, lat), gg, markerTag);
    var mmb = new SMarker(new SLonLat(lon, lat), gg, markerTag);
    var mmc = new SMarker(new SLonLat(lon, lat), gg, markerTag);
    this.markerLayer.AddMarker(mm);
    this.markerLayer.AddMarker(mmb);
    this.markerLayer.AddMarker(mmc);
    var lbl = null;
    var xf=function (){
    	if(1==1){  		
    	    if(lbl==null){
    	    	lbl = new SLabel(null, new SLonLat(lon, lat), null, "<nobr  style='font-size: 14px;;margin: 0px;font-family:黑体;color:#ffffff;'>" +
    	    	"&nbsp;<label style='line-height: 17px;'>名称:"+obj.name+"&nbsp;</label><br/>&nbsp;<label style='line-height: 17px;'>编号:"+obj.videoCode+"</label>&nbsp;<br/>&nbsp;" +
    	    	"<label style='line-height: 17px;'>类型:"+(obj.codeCode==null || obj.codeCode==''?'无':obj.codeCode)+"</label>" +
    	    	"&nbsp;<br/>&nbsp;<label style='line-height: 17px;'>时间:"+obj.alarmTime+"</label></nobr>");
    	    	lbl.SetOpacity(0.8);
        	    lbl.SetBackgroundColor("rgb(221, 94, 34)");
        	    lbl.SetHoverCssStyle("button red");
        	    lbl.SetCssStyle("button2 infolbl");
        	    lbl.SetOffset(new SSize(20, -35));
        	    lbl.SetAdaptive();
        	    QMAP.GetMap().AddLabel(lbl);
    	    }   		
    	    lbl.Show();
    	    $(".button2").css({"border-radius":"3px","opacity":"1","z-index":"500","margin-top":"-10","padding":"4px"});
    	}
    };
    var lk=function(){
    	lbl.Hide();
    	$(".infolbl").hide();
    };
    if (enableClick == true) {
    	mm.AddEventListener("click", mm, function(e){func(obj,e.target);});
    	mmb.AddEventListener("mousemove", mmb,xf);//鼠标悬浮
    	mmc.AddEventListener("mouseout", mmc,lk); //鼠标离开
    }
    
    
};
//添加点和lbl
TTuJing.prototype.AddSimpleMarkerAndLbl = function (lon, lat, iconUrl, iconSize, iconOffset, enableClick,markerTag,func,id,name) {
    if (iconOffset == null && iconSize != null) {
        iconOffset = new SPixel(iconSize.GetWidth(), iconSize.GetHeight());
    }
    var gg = new SIcon(iconUrl, iconSize, iconOffset);
    var mm = new SMarker(new SLonLat(lon, lat), gg, markerTag);
    
    var lbl = new SLabel(null, new SLonLat(lon, lat), null, "<nobr>"+markerTag+"</nobr>",markerTag);
    lbl.SetOpacity(0.8);
    lbl.SetBackgroundColor("#FFFFFF"); 
    lbl.SetHoverCssStyle("button red");
    lbl.SetCssStyle("button red2");
    lbl.SetOffset(new SSize(16, -35)); 
    lbl.SetAdaptive();
    this.map.AddLabel(lbl);
    
    this.markerLayer.AddMarker(mm);
    if (enableClick == true) {
    	mm.AddEventListener("click", mm, function () {
    		func(id,name);
    	});
    }
}

//添加lbl
TTuJing.prototype.AddSimpleLbl = function (lon, lat,markerTag) {
    var lbl = new SLabel(null, new SLonLat(lon, lat), null, "<nobr>"+markerTag+"</nobr>",markerTag);
    lbl.SetOpacity(0.8);
    lbl.SetBackgroundColor("#FFFFFF"); 
    lbl.SetHoverCssStyle("button red");
    lbl.SetCssStyle("button red_Lbl");
    lbl.SetOffset(new SSize(16, -35)); 
    lbl.SetAdaptive();
    this.map.AddLabel(lbl);
}


//用在客流热力图里面的添加lbl
TTuJing.prototype.AddSimpleLblPassenger = function (lon, lat,markerTag) {
    var lbl = new SLabel(null, new SLonLat(lon, lat), null, "<nobr  style='font-family:黑体;color:#ffffff;font-size:20px;background:#ff6136'>"+markerTag+"</nobr>",markerTag);
    lbl.SetOpacity(0.8);
    lbl.SetBackgroundColor("#ff6136"); 
   /* lbl.SetHoverCssStyle("button red");*/
    lbl.SetCssStyle("button red_Lbl ");
    lbl.SetOffset(new SSize(22, -28)); 
    lbl.SetAdaptive();
    this.map.AddLabel(lbl);
}



//添加地图注记
TTuJing.prototype.AddSimpleMarkerAndLblZhuJi = function (lon, lat,color,name) {
	var lbl = new SLabel(null, new SLonLat(lon, lat), null, "<nobr style='margin: 5px;font-family:黑体;color:#ffffff;'>"+name+"</nobr>");
    lbl.SetOpacity(0.8);
    lbl.SetBackgroundColor(color);
    lbl.SetHoverCssStyle("button red");
    lbl.SetCssStyle("button red2");
    lbl.SetOffset(new SSize(20, -35));
    lbl.SetAdaptive();
    QMAP.GetMap().AddLabel(lbl);
    $(".button.red2").css({"border-radius":"2px","opacity":"1","margin-left":"-40px","margin-top":"20px"});
}
//添加地图注记
TTuJing.prototype.AddSimpleMarkerAndLblBaoJin = function (lon, lat,name,className,img,id) {
	var lblB =null;
	var xf=function (){
    	if(1==1){  		
    	    if(lblB==null){
    	    	lblB = new SLabel(null, new SLonLat(lon, lat), null, "<nobr  style='font-size: 14px;;margin: 0px;font-family:黑体;color:#ffffff;'>" +
    	    	"&nbsp;<label style='line-height: 17px;'>名称:"+name+"&nbsp;</label></nobr>");
    	    	lblB.SetOpacity(0.8);
        	    lblB.SetBackgroundColor("rgb(221, 94, 34)");
        	    lblB.SetHoverCssStyle("button red");
        	    lblB.SetCssStyle("button2 shuobaolbl");
        	    lblB.SetOffset(new SSize(20, -35));
        	    lblB.SetAdaptive();
        	    QMAP.GetMap().AddLabel(lblB);
    	    }   		
    	    lblB.Show();
    	    $(".shuobaolbl").css({"border-radius":"3px","opacity":"1","z-index":"500","margin-top":"0px","padding":"4px"});
    	}
    };
	var lbl = new SLabel(null, new SLonLat(lon, lat), null, "");
    lbl.SetHoverCssStyle("button red");
    lbl.SetCssStyle(className);
    lbl.SetOffset(new SSize(20, -35));
    lbl.SetAdaptive();
    lbl.AddEventListener("mousemove", null,xf);
    lbl.AddEventListener("mouseout", null,function(){$(".shuobaolbl").hide();});
    QMAP.GetMap().AddLabel(lbl);
    $("."+className).css({"margin-left":"-40px","margin-top":"-5px","width":"29","height":"40","background-image":"url('"+jypath+img+"')"});
}
//手报点和消防点临时注记
TTuJing.prototype.AddSimpleMarkerAndLblLinShi = function (lon, lat,name,className) {
	var lbl = new SLabel(null, new SLonLat(lon, lat), null, "<nobr  style='font-size: 14px;;margin: 0px;font-family:黑体;color:#ffffff;'>" +
    	    	"&nbsp;<label style='line-height: 17px;'>名称:"+name+"&nbsp;</label></nobr>");
    lbl.SetHoverCssStyle("button red");
    lbl.SetCssStyle( className);
    lbl.SetOffset(new SSize(20, -35));
    lbl.SetAdaptive();
    QMAP.GetMap().AddLabel(lbl);
    $("."+className).css({"border-radius":"3px","opacity":"1","z-index":"500","margin-top":"0","padding":"4px","background-color":"rgb(221, 94, 34)"});
    setTimeout(function (){lbl.Hide()},3000);
}



//添加地图图标，自定义悬浮显示标签
TTuJing.prototype.AddLableZDY = function (lon, lat, iconUrl, iconSize, iconOffset, enableClick,markerTag,func,obj,lable,css) {
    if (iconOffset == null && iconSize != null) {
        iconOffset = new SPixel(iconSize.GetWidth(), iconSize.GetHeight());
    }
    iconUrl=jypath+iconUrl;
    var gg = new SIcon(iconUrl, iconSize, iconOffset);
    var mm = new SMarker(new SLonLat(lon, lat), gg, markerTag);
    var mmb = new SMarker(new SLonLat(lon, lat), gg, markerTag);
    var mmc = new SMarker(new SLonLat(lon, lat), gg, markerTag);
    this.markerLayer.AddMarker(mm);
    this.markerLayer.AddMarker(mmb);
    this.markerLayer.AddMarker(mmc);
    var lbl = null;
    var xf=function (){
    	if(1==1){  		
    	    if(lbl==null){
    	    	lbl = new SLabel(null, new SLonLat(lon, lat), null, lable);
    	    	lbl.SetOpacity(0.8);
        	    lbl.SetBackgroundColor("rgb(221, 94, 34)");
        	    lbl.SetHoverCssStyle("button red");
        	    lbl.SetCssStyle("button2 infolbl");
        	    lbl.SetOffset(new SSize(20, -35));
        	    lbl.SetAdaptive();
        	    QMAP.GetMap().AddLabel(lbl);
    	    }   		
    	    lbl.Show();
    	    $(".button2").css(css);
    	}
    };
    var lk=function(){
    	lbl.Hide();
    	$(".infolbl").hide();
    };
    if (enableClick == true) {
    	if(func!=null){mm.AddEventListener("click", mm, function(e){func(obj,e.target);});}
    	mmb.AddEventListener("mousemove", mmb,xf);//鼠标悬浮
    	mmc.AddEventListener("mouseout", mmc,lk); //鼠标离开
    }
    
    
};
//航班机位添加地图注记
TTuJing.prototype.AddflightLab = function (lon, lat,color,name,fun,obj) {
	var lbl = new SLabel(null, new SLonLat(lon, lat), null, "<nobr style='margin: 5px;font-family:黑体;color:#ffffff;'>"+name+"</nobr>");
	lbl.SetBackgroundColor(color);
	lbl.SetHoverCssStyle("button red");
    lbl.SetCssStyle("AddflightLab");
    lbl.SetOffset(new SSize(20, -35));
    lbl.SetAdaptive();
    lbl.AddEventListener("click", null,function(){fun(obj)});
    QMAP.GetMap().AddLabel(lbl);
    $(".AddflightLab").css({"border-radius":"2px","opacity":"1","margin-left":"-40px","margin-top":"20px"});
}
//TTuJing.prototype.GetLabelsByTag =function (wqb) 
//{ var LQb = []; for (var Xqb = 0; Xqb < this.FLabels.length; Xqb++) 
//{ if (this.FLabels[Xqb].FTag == wqb) { LQb.push(this.FLabels[Xqb]); } } return LQb; }


//放大
TTuJing.prototype.ZoomIn = function(){
	this.map.ZoomIn();
};
//缩小
TTuJing.prototype.ZoomOut = function(){
	this.map.ZoomOut();
};
//测距
TTuJing.prototype.OpenMeasure = function(){
	this.map.AddControl(this.meature);
	this.meature.Activate();
};
//漫游
TTuJing.prototype.Roam = function(){
	
};

//清除标记
TTuJing.prototype.ClearMarkers = function (){
	if(this.markerLayer!=null){
		this.markerLayer.ClearMarkers();
	}
};

//清除矢量图形
TTuJing.prototype.ClearFeatures = function (){
	if(this.vectorLayer!=null){
		this.vectorLayer.ClearFeatures();
	}
};

//清除所有
TTuJing.prototype.ClearAll = function (){
	this.ClearMarkers();
	this.ClearFeatures();
};

TTuJing.prototype.SetCenterMoveSlowing = function(xy,level){
	this.map.SetCenterMoveSlowing(xy,level);
};


/** 
* 移除标记的点 
* @param markerTag 注记组标记 
* @type void
*/
TTuJing.prototype.RemoveMarkerByTag = function (markerTag) {
    this.markerLayer.ClearMarkersByTag(markerTag);
}

/** 
* 隐藏标记的点 
* @param markerTag 注记组标记 
* @type void
*/
TTuJing.prototype.HideMarkersByTag = function (markerTag) {
    this.markerLayer.HideMarkersByTag(markerTag);
}

/** 
* 显示标记的点 
* @param markerTag 注记组标记 
* @type void
*/
TTuJing.prototype.ShowMarkersByTag = function (markerTag) {
    this.markerLayer.ShowMarkersByTag(markerTag);
}
/** 
* 获取标记的点 
* @param markerTag 注记组标记 
* @type SMarker[]
*/
TTuJing.prototype.GetMarkersByTag = function (markerTag) {
    return this.markerLayer.GetMarkersByTag(markerTag);
}
/** 
* 获取所有标记的点
* @param markerTag 注记组标记 
* @type SMarker[]
*/
TTuJing.prototype.GetMarkers = function () {
    this.markerLayer.GetMarkers();
}
/** 
* 得到地图对象 
* @type SMap
*/
TTuJing.prototype.GetMap = function () {
    return this.map;
}
/** 
* 得到地图注记图层对象
* @type SMarkerLayer
*/
TTuJing.prototype.GetMarkerLayer = function () {
    return this.markerLayer;
}
/** 
* 得到地图矢量图层对象
* @type SVectorLayer
*/
TTuJing.prototype.GetVectorLayer = function () {
    return this.vectorLayer;
}
/** 
* 设置地图资源前缀 
* @param url 前缀地址
* @type void
*/
TTuJing.prototype.SetPreUrl = function (url) { 
    this.preUrl = url;
}
/** 
* 得到扇形 
* @param origin 扇形圆点
* @param radius 扇形半径
* @param r 扇形弧度
* @param angel 扇形角度
* @type void
*/
TTuJing.prototype.CreateRegularPolygonCurve = function (origin, radius, r, angel) {
    var sides = 80;
    var rotation = 360 - r;
    var angle = Math.PI * ((1 / sides) - (1 / 2));
    if (rotation) {
        angle += (rotation / 180) * Math.PI;
    }
    var rotatedAngle, x, y;
    var points = [];
    for (var i = 0; i < sides; ++i) {
        var an = i * ((360 - rotation) / 360);
        rotatedAngle = angle + (an * 2 * Math.PI / sides);
        x = origin.GetX() + (radius * Math.cos(rotatedAngle));
        y = origin.GetY() + (radius * Math.sin(rotatedAngle));
        points.push(new SPoint(x, y));
    }
    if (rotation != 0) {
        points.push(origin);
    }
    var ring = new SLinearRing(points);
    ring.Rotate(parseFloat(r) + 90 + parseFloat(angel), origin);
    return new SPolygon([ring]);
};
TTuJing.prototype.MoveToWindow=function(lonlat, xValue, yValue) { 
    var me = this.map.GetExtent();
    var left = lonlat.GetLon() - me.GetWidth() * xValue; 
    var right = left + me.GetWidth();
    var bottom = lonlat.GetLat() - me.GetHeight() * yValue;
    var top = bottom + me.GetHeight(); 
    var x = (right + left) / 2;
    var y = (top + bottom) / 2;
    me=null;
    left=null;
    right=null;
    bottom=null; 
    top=null;
    return new SLonLat(x, y);
}


export default new TTuJing();