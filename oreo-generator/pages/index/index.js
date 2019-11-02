//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    oreo: [],
    real_oreo_str: "",
    message: "",
    image_url: ""
  },

  onLoad: function() {
    // 在页面加载时默认生成一个oreo
    this.generate_oreo("oreo");
  },

  generate_oreo: function(input) {
    // 每层oreo的code存在这里
    let res = [];

    // 标记是否出现了错误
    let error = false;
    // 真正的oreo字符串，如果输入有误则值为更正后的oreo字符串，如果输入无误则和输入一样
    let real_oreo_str = ""
    // 对输入中的每一个字符进行遍历，以oreorreo为例（这是个有问题的输入）
    for (let i = 0; i < input.length; i++) {
      let char = input[i];
      switch (char) {
        case 'o':
          // 如果是o，新加一层2（底层饼干），并使真正的oreo字符串后附加一个o
          res.push(2);
          real_oreo_str += 'o'
          break;
        case 'r':
          // 其实if的条件可以直接写input[i + 1] == 'e'，在js里如果数组越界会返回undefined而不会抛异常。但仍然建议不要养成越界毫无问题的观念，毕竟也就js这种奇葩才可以这么干，而且js里无意识的数组越界经常会引发隐秘的bug
          if (i + 1 < input.length && input[i + 1] == 'e') {
            // 如果是r，则查看后一个字符是不是e，如果是，则加一层1（夹心），并使真正的oreo字符串后附加一个re，i自增跳过e这个字符
            res.push(1);
            real_oreo_str += 're'
            i++;
            break;
          } else {
            error = true;
          }
        default:
          error = true;
      }
    }

    // 如果最上面一层是o（饼干），由于之前都是当底层饼干处理的，现在把它改成顶层饼干
    if (res[0] == 2) {
      res[0] = 0;
    }

    // 根据出错与否设置不同的提示信息
    if (error) {
      this.setData({
        message: "oops, some character is illegal, but you still get an " + real_oreo_str
      })
    } else {
      this.setData({
        message: "you get an " + real_oreo_str
      })
    }

    // 构建oreo这个字典列表，值得一提的是，js里字典和对象的边界非常模糊，感兴趣的可以自行查找相关资料（直接搜“js 对象 字典”就行）
    for (let i = 0; i < res.length; i++) {
      res[i] = {
        id: i,
        code: res[i],
        z: res.length - i
      }
    }

    // 设置oreo属性
    this.setData({
      oreo: res,
    })
  },

  bindCommentSubmit: function(e) {
    // 当提交输入时，在控制台（就是下面那个区域的console）里输出输入的内容，并根据内容生成一个oreo
    console.log(e.detail.value.oreo_input);
    this.generate_oreo(e.detail.value.oreo_input);
  },

  bindOreoInput: function(e) {
    // 每次输入更新时，将oreo_str设为输入的内容
    // console.log(e.detail.value);
    this.setData({
      oreo_str: e.detail.value
    })
  }
})