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
    UserData.User_Id = 1;
    UserData.User_Name = "小明";
    UserData.User_Head = "";
    UserData.User_VIP = 1;
    UserData.User_Sex = 0;
    UserData.User_Phone = "";
    UserData.User_Gold = 123004002;
    return UserData;
}());
__reflect(UserData.prototype, "UserData");