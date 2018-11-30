var chai = require('chai');  
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Assert style
var should = chai.should;    // Using Assert style
var gitlab = require("../gitlab");

expect("http://www.lejuhub.com/mini/product/blob/master/Pando切图包/3_效果图/遥控器界面新增6个按钮.png").to.deep.equal(gitlab.GitlabParseImageUrl("*动作配置按钮位于遥控器中部, 单击进入动作配置界面 (效果图: http://www.lejuhub.com/mini/product/blob/master/Pando切图包/3_效果图/遥控器界面新增6个按钮.png)"));

expect("http://www.lejuhub.com/mini/product/blob/master/Pando切图包/0_切图/android/drawable-hdpi/home_icon_robot.png").to.deep.equal(gitlab.GitlabParseImageUrl("-http://www.lejuhub.com/mini/product/blob/master/Pando切图包/0_切图/android/drawable-hdpi/home_icon_robot.png"));

expect("http://www.lejuhub.com/product-commitee/mini/uploads/40b6d54d1ec5031fbef4538f8b853eba/右摇杆.png").to.equal(gitlab.GitlabParseImageUrl("/uploads/40b6d54d1ec5031fbef4538f8b853eba/右摇杆.png"));

// assert.equal(["http://www.lejuhub.com/mini/product/blob/master/Pando切图包/3_效果图/遥控器界面新增6个按钮.png"],gitlab.GitlabParseImageUrl("*动作配置按钮位于遥控器中部, 单击进入动作配置界面 (效果图: http://www.lejuhub.com/mini/product/blob/master/Pando切图包/3_效果图/遥控器界面新增6个按钮.png)"));

