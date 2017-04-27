function CreateForm(option) {
  this.url = option.url
  this.init()
}
CreateForm.prototype={
  constructor:CreateForm,
  init:function () {
    this.render();
        // 第一页数据
    this.creatThead(this.allData.namelist,"#mainHead");
    this.creatTbody(this.allData.datalist,"#mainBody");
    // 第二页数据
    this.creatThead(this.allData.namelist,"#secondHead");
    this.creatTbody(this.allData.datalist,"#secondBody");
    // 第三页数据
    this.creatThead(this.allData.namelist,"#thirdHead");
    this.creatTbody(this.allData.datalist,"#thirdBody");
        // 初始化搜索事件
    this.searchEvents();
  },
  render:function () {
    this.allData=this.getData(this.url);
    this.data = this.getData(this.url);
    this.tabDataInit();
  },
  bindEvents:function () {
    // 第一页数据
    this.creatThead(this.data.namelist,"#mainHead");
    this.creatTbody(this.data.datalist,"#mainBody");
 
    this.searchEvents();

  },
  getData:function (url) {
    var datas;
    $.ajax({  
          type:'get',  
          url : url,
          dataType : 'json',
          async : false,
          success :function(data) {  
            datas=data
          }
    })
    return datas
  },
  creatThead:function (data,dom) {
    if ($(dom).html()) {
      $(dom).html("")
    }
    var theadString=""
    for (var i = 0; i < data.length; i++) {
      theadString += `<th>${data[i]}<br><input type="text" id="seach${i}"  placeholder="搜索"/></th>`
    }
    $(theadString).appendTo($(dom))
  },
  creatTbody:function (data,dom) {
    if ($(dom).html()) {
      $(dom).html("")
    }
    var tbodyString=""
    for (var i = 0; i < data.length; i++) {
      var item=data[i];
      tbodyString += 
      ` <tr>
            <td>${item.station_id_d} <b></b></td>
            <td>${item.station_id_c}</td>
            <td>${item.station_name}</td>
            <td>${item.country}</td>
            <td>${item.province}</td>
            <td>${item.city}</td>
            <td>${item.town}</td>
            <td>${item.cnty}</td>
            <td>${item.station_levl}</td>
        </tr>`
    }
    $(tbodyString).appendTo($(dom))
  },
  tabDataInit:function () {
    $("#tabButtons>li").click(function () {
      $("#tabButtons>li").css({'color':'#bdbdbd','background': '#282828'});
      $(this).css({'color':'#282828','background': 'white'});
      var index=$(this).index();
      $("#showData>li").hide();
      $("#showData>li:eq("+index+")").show();
    })
  },
  searchEvents:function () {
    var _this=this;
    var codeList=this.allData.codelist;
    for (let i = 0; i < codeList.length; i++) {
      $('#seach'+i).keyup(function (e) {
        console.log(codeList[i])
        if (e.keyCode===13) {
          var innerTxt = $(this).val()
          // /selectstation5?station_id_d=01011
          var url=_this.url+"?"+codeList[i]+"="+innerTxt;
          _this.data = _this.getData(url);
          _this.bindEvents();  
        }
      })
    }

  }
};

function log(argument) {
  console.log(argument)
}

