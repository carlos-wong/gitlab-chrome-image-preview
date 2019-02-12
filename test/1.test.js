import "babel-polyfill";
var gitlab = require("../gitlab");

test('url parser ', async () => {
  expect("http://www.lejuhub.com/mini/product/blob/master/Pando切图包/3_效果图/遥控器界面新增6个按钮.png").toEqual(gitlab.GitlabParseImageUrl("*动作配置按钮位于遥控器中部, 单击进入动作配置界面 (效果图: http://www.lejuhub.com/mini/product/blob/master/Pando切图包/3_效果图/遥控器界面新增6个按钮.png)"));

  expect("http://www.lejuhub.com/mini/product/blob/master/Pando切图包/1_标注/帮助按钮和模式卡片标注.png").toEqual(gitlab.GitlabParseImageUrl(' 首页卡牌文字大小和布局参考"http://www.lejuhub.com/mini/product/blob/master/Pando切图包/1_标注/帮助按钮和模式卡片标注.png"'));

  expect("http://www.lejuhub.com/mini/product/blob/master/Pando切图包/0_切图/android/drawable-hdpi/home_icon_robot.png").toEqual(gitlab.GitlabParseImageUrl("-http://www.lejuhub.com/mini/product/blob/master/Pando切图包/0_切图/android/drawable-hdpi/home_icon_robot.png"));

  expect("http://www.lejuhub.com/product-commitee/mini/uploads/40b6d54d1ec5031fbef4538f8b853eba/右摇杆.png").toEqual(gitlab.GitlabParseImageUrl("/uploads/40b6d54d1ec5031fbef4538f8b853eba/右摇杆.png"));


  expect("http://www.lejuhub.com/mini/product/raw/master/Pando切图包/1_标注/机器人属性标注-1.png").toEqual(gitlab.GitlabConverBlobPathToRaw("http://www.lejuhub.com/mini/product/blob/master/Pando切图包/1_标注/机器人属性标注-1.png"));

  expect("http://www.lejuhub.com/product-commitee/mini/uploads/40b6d54d1ec5031fbef4538f8b853eba/右摇杆.png").toEqual(gitlab.GitlabConverBlobPathToRaw("http://www.lejuhub.com/product-commitee/mini/uploads/40b6d54d1ec5031fbef4538f8b853eba/右摇杆.png"));

  expect("http://www.lejuhub.com/mini/product/raw/master/Pando切图包/0_切图/android/drawable-hdpi/home_icon_robot.png").toEqual(gitlab.GitlabConverBlobPathToRaw("http://www.lejuhub.com/mini/product/blob/master/Pando切图包/0_切图/android/drawable-hdpi/home_icon_robot.png"));


  expect(gitlab.GitlabParseImageUrl(gitlab.GitlabConverBlobPathToRaw("http://www.lejuhub.com/Product/aelos_mini_feature/uploads/9f106721f297cf9014e45037cb900c09/image.png"))).toEqual("http://www.lejuhub.com/Product/aelos_mini_feature/uploads/9f106721f297cf9014e45037cb900c09/image.png");

});
