//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    oreo:[],
    oreo_str:"",
    message:"",
    image_url:""
  },

  onLoad:function(){
    this.get_bing_img();
    this.generate_oreo("oreo");
  },

  generate_oreo:function(input){
    let res = [];

    let error = false;
    let oreo_str = ""
    for (let i = 0; i < input.length; i++) {
      let char = input[i];
      switch (char) {
        case 'o':
          res.push(2);
          oreo_str+='o'
          break;
        case 'r':
          if (input[i+1] == 'e') {
            res.push(1);
            oreo_str += 're'
            i++;
            break;
          } else {
            error = true;
          }
        default:
          error = true;
      }
    }

    if (res[0] == 2) {
      res[0] = 0;
    }

    if (error) {
      this.setData({
        message: "oops, some character is illegal, but you still get an " + oreo_str
      })
    }else{
      this.setData({
        message: "you get an " + oreo_str
      })
    }



    for (let i = 0; i < res.length; i++) {
      res[i] = {id:i, code: res[i], z_index: res.length - i }
    }

    this.setData({
      oreo: res,
      oreo_length: res.length
    })
  },

  get_bing_img:function(){
    let that = this;
    wx.request({
      url: 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1',
      success(res) {
        console.log(res.data)
        that.setData({
          image_url : "http://s.cn.bing.net" + res.data.images[0].url
        })
        
      }
    })
  },

  bindCommentSubmit: function (e) {
    console.log(e.detail.value.oreo_input);
    this.generate_oreo(e.detail.value.oreo_input);
    
  },

  bindOreoInput:function(e){
    console.log(e.detail.value);
    this.setData({
      oreo_str: e.detail.value
    })
  }
  
})
