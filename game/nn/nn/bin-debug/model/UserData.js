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
    //基本信息
    UserData.User_Id = 0;
    UserData.User_Name = "";
    UserData.User_Head = "";
    UserData.User_Token = "";
    UserData.User_Gold = 25862;
    UserData.User_Vip = 2;
    //未启用数据
    UserData.User_Sex = 0;
    UserData.User_Phone = "";
    return UserData;
}());
__reflect(UserData.prototype, "UserData");
//# sourceMappingURL=UserData.js.map