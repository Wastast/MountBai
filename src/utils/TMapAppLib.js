function TMapAppLib () { }

TMapAppLib.Draw = function () {}
TMapAppLib.Draw._Line = null;
TMapAppLib.Draw._Point = null;
TMapAppLib.Draw._Rectangle = null;
TMapAppLib.Draw._Polygon = null;
TMapAppLib.Draw._Circle = null;

/*-----------------------------绘线----------------------------*/
TMapAppLib.Draw.EnableLine = function (map, completeListener, lineTag) {
    if (TMapAppLib.Draw._Line == null) {
        var featureStyle2 = new SFeatureStyle();
        featureStyle2.SetFillColor("none");
        featureStyle2.SetHoverFillColor("none");
        featureStyle2.SetStrokeColor("red");
        featureStyle2.SetStrokeStartArrow("Oval");
        featureStyle2.SetStrokeEndArrow("Classic");
        featureStyle2.SetStrokeDashStyle("ShortDashDot");
        featureStyle2.SetStrokeArrowLength(5);
        featureStyle2.SetStrokeArrowWidth(5);
        featureStyle2.SetStrokeWidth(4);
        featureStyle2.SetHoverEnabled(true); 
        TMapAppLib.Draw._Line = new SDrawControl(TMapAPI.GetVectorLayer(), SHPath, { Complete: completeListener }, featureStyle2, lineTag);
        map.AddControl(TMapAppLib.Draw._Line);
    }
    TMapAppLib.Draw._Line.Activate();
}
TMapAppLib.Draw.DisableLine = function () {
    if (TMapAppLib.Draw._Line != null) {
        TMapAppLib.Draw._Line.DeActivate();
        TMapAppLib.Draw._Line = null;
    }
}
TMapAppLib.Draw.IsLineEnable = function () {
    if (TMapAppLib.Draw._Line != null) {
        return TMapAppLib.Draw._Line.GetActive();
    }
    return false;
}

/*-----------------------------绘点----------------------------*/
TMapAppLib.Draw.EnablePoint = function (map, completeListener, pointTag) {
    if (TMapAppLib.Draw._Point == null) {
        TMapAppLib.Draw._Point = new SDrawControl(TMapAPI.GetVectorLayer(), SHPoint, { Complete: completeListener }, null, pointTag);
        map.AddControl(TMapAppLib.Draw._Point);
    }
    TMapAppLib.Draw._Point.Activate();
}
TMapAppLib.Draw.DisablePoint = function () {
    if (TMapAppLib.Draw._Point != null) {
        TMapAppLib.Draw._Point.DeActivate();
        TMapAppLib.Draw._Point = null;
    }
}
TMapAppLib.Draw.IsPointEnable = function () {
    if (TMapAppLib.Draw._Point != null) {
        return TMapAppLib.Draw._Point.GetActive();
    }
    return false;
}

/*-----------------------------绘矩形----------------------------*/
TMapAppLib.Draw.EnableRectangle = function (map, completeListener, pointTag) {
    if (TMapAppLib.Draw._Rectangle == null) {
        TMapAppLib.Draw._Rectangle = new SDrawControl(TMapAPI.GetVectorLayer(), SHRectangle, { Complete: completeListener }, null, pointTag);
        map.AddControl(TMapAppLib.Draw._Rectangle);
    }
    TMapAppLib.Draw._Rectangle.Activate();
}
TMapAppLib.Draw.DisableRectangle = function () {
    if (TMapAppLib.Draw._Rectangle != null) {
        TMapAppLib.Draw._Rectangle.DeActivate();
        TMapAppLib.Draw._Rectangle = null;
    }
}
TMapAppLib.Draw.IsRectangleEnable = function () {
    if (TMapAppLib.Draw._Rectangle != null) {
        return TMapAppLib.Draw._Rectangle.GetActive();
    }
    return false;
}

/*-----------------------------绘多边形----------------------------*/
TMapAppLib.Draw.EnablePolygon = function (map, completeListener, pointTag) {
    if (TMapAppLib.Draw._Polygon == null) {
        TMapAppLib.Draw._Polygon = new SDrawControl(TMapAPI.GetVectorLayer(), SHPolygon, { Complete: completeListener }, null, pointTag);
        map.AddControl(TMapAppLib.Draw._Polygon);
    }
    TMapAppLib.Draw._Polygon.Activate();
}
TMapAppLib.Draw.DisablePolygon = function () {
    if (TMapAppLib.Draw._Polygon != null) {
        TMapAppLib.Draw._Polygon.DeActivate();
        TMapAppLib.Draw._Polygon = null;
    }
}
TMapAppLib.Draw.IsPolygonEnable = function () {
    if (TMapAppLib.Draw._Polygon != null) {
        return TMapAppLib.Draw._Polygon.GetActive();
    }
    return false;
}

/*-----------------------------绘圆----------------------------*/
TMapAppLib.Draw.EnableCircle = function (map, completeListener, pointTag) {
    if (TMapAppLib.Draw._Circle == null) {
        TMapAppLib.Draw._Circle = new SDrawControl(TMapAPI.GetVectorLayer(), SHCircle, { Complete: completeListener }, null, pointTag);
        map.AddControl(TMapAppLib.Draw._Circle);
    }
    TMapAppLib.Draw._Circle.Activate();
}
TMapAppLib.Draw.DisableCircle = function () {
    if (TMapAppLib.Draw._Circle != null) {
        TMapAppLib.Draw._Circle.DeActivate();
        TMapAppLib.Draw._Circle = null;
    }
}
TMapAppLib.Draw.IsCircleEnable = function () {
    if (TMapAppLib.Draw._Circle != null) {
        return TMapAppLib.Draw._Circle.GetActive();
    }
    return false;
}
export {TMapAppLib}


