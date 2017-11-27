var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @显示界面
 *
 */
var UserData = (function () {
    function UserData() {
    }
    //定义变量
    UserData.User_Name = "小明";
    UserData.User_Choose = [0, 0, 0, 1, 0, 0];
    return UserData;
}());
__reflect(UserData.prototype, "UserData");
//# sourceMappingURL=UserData.js.map