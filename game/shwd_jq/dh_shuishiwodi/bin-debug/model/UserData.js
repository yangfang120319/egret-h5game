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
    UserData.User_Id = 3;
    UserData.User_Sex = 0;
    UserData.User_Name = "";
    UserData.User_Head = "";
    UserData.User_Gold = 25862;
    UserData.User_Level = 28;
    return UserData;
}());
__reflect(UserData.prototype, "UserData");
