var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by qingzhu on 15/7/1.
 */
var qr;
(function (qr) {
    var QRCode = (function () {
        function QRCode() {
        }
        /**
         * msg
         * width,height 二维码宽度，高度
         * color 颜色
         *
         * errorCorrectLevel:
         * level L : 最大 7% 的错误能够被纠正；
         * level M : 最大 15% 的错误能够被纠正；
         * level Q : 最大 25% 的错误能够被纠正；
         * level H : 最大 30% 的错误能够被纠正；
         *
         * typeNumber:
         * QR图的大小(size)被定义为版本（Version)，版本号从1到40。版本1就是一个21*21的矩阵，每增加一个版本号，矩阵的大小就增加4个模块(Module)，
         * 因此，版本40就是一个177*177的矩阵。（版本越高，意味着存储的内容越多，纠错能力也越强）。
         * */
        QRCode.create = function (msg, width, height, errorCorrectLevel, typeNumer, color) {
            if (width === void 0) { width = 200; }
            if (height === void 0) { height = 200; }
            if (errorCorrectLevel === void 0) { errorCorrectLevel = qr.QRErrorCorrectLevel.H; }
            if (typeNumer === void 0) { typeNumer = 10; }
            if (color === void 0) { color = 0; }
            var _htOption = {
                color: color,
                width: width,
                height: height,
                correctLevel: errorCorrectLevel,
                typeNumer: typeNumer
            };
            var _oQRCode = new qr.QRCodeModel(_htOption.typeNumer, _htOption.correctLevel);
            _oQRCode.addData(msg);
            _oQRCode.make();
            return QRCode.draw(_oQRCode, _htOption);
        };
        QRCode.draw = function (m, _htOption) {
            var sc = new egret.Sprite();
            var _htOption = _htOption;
            var nCount = m.getModuleCount();
            var nWidth = (_htOption.width / nCount);
            var nHeight = (_htOption.height / nCount);
            //画一个比二维码本身略大的白色底框
            var borderWidth = 10;
            sc.graphics.moveTo(-borderWidth, -borderWidth);
            sc.graphics.beginFill(0xffffff);
            sc.graphics.drawRect(-borderWidth, -borderWidth, _htOption.width + 2 * borderWidth, _htOption.height + 2 * borderWidth);
            sc.graphics.endFill();
            for (var row = 0; row < nCount; row++) {
                for (var col = 0; col < nCount; col++) {
                    var b = m.isDark(row, col);
                    if (b) {
                        sc.graphics.moveTo(col * nWidth, row * nHeight);
                        sc.graphics.beginFill(_htOption.color);
                        sc.graphics.drawRect(col * nWidth, row * nHeight, nWidth, nHeight);
                        sc.graphics.endFill();
                    }
                }
            }
            return sc;
        };
        return QRCode;
    }());
    qr.QRCode = QRCode;
    __reflect(QRCode.prototype, "qr.QRCode");
})(qr || (qr = {}));
//# sourceMappingURL=QRCode.js.map