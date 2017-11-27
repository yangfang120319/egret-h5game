/**
 *
 * @加载数据
 *
 */
class LoaderData {
    //定义变量
    static is_ThemeLoadEnd: Boolean = false;
    static is_loading_LoadEnd: Boolean = false;
    
    //分步加载
    static is_part_LoadEnd: Boolean[] = [,false,false,false];
}
