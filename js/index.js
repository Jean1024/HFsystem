function CreateForm(option) {
  this.originUrl=option.url;
  this.url = option.url;
  this.init();
  this.pageIndex=1;
}
CreateForm.prototype={
  constructor:CreateForm,
  init:function () {
    this.getDataByURL(this.url);
    // 顶部TAB栏初始化
    this.tabDataInit();
    // 第一页数据
    // this.creatThead(this.allData.namelist,"#mainHead");
    // this.creatTbody(this.allData.datalist,"#mainBody");
    // 第二页数据

    // 第三页数据

    // 初始化搜索事件
    this.searchEvents();
    this.bindEvents(this.url);
  },
  // 获取url下的数据（this.allData)以及本url下的第一页数据(this.data)
  getDataByURL:function (url) {
    this.allData = this.getData(url);
    this.data = this.getData(url+'?page=1&pagenum=12');
  },
  bindEvents:function (url) {
    // 第一页数据
    this.creatThead(this.data.namelist,"#mainHead");
    this.creatTbody(this.data.datalist,"#mainBody");
    this.searchEvents();
    this.initPageCount(url);
  },
  // 初始化点击分页数据
  initPageCount:function (url) {
    var _this=this;
    if ($('#pageToolbar').html()) {
      return
    }
    this.len=this.allData.datalist.length;
    $('#pageToolbar').Paging({pagesize:12,count:this.len,toolbar:true});
    
    $(".ui-paging-container").on('click',$('.ui-pager'),function () {
      _this.renderPageNum(url)
    })
     $(".ui-paging-container").on('click',$('.ui-paging-toolbar a'),function () {
      _this.renderPageNum(url)
    })
     $(".ui-paging-container").on('keydown',$('.ui-paging-toolbar input'),function (e) {
      if (e.keyCode===13) {
        _this.renderPageNum(url)
      }
    })
  },
  // 根据页码将数据渲染到页面上  页码
  renderPageNum:function (url) {
      this.getCurrentPageNum();
      this.data=this.getData((url+'?page='+this.pageIndex+'&pagenum=12').replace(/\?/g,"&").replace(/\&/,"?"));
      this.bindEvents(url);
  },
  // 获取当前页的页码    页码
  getCurrentPageNum:function () {
    var _this=this;
    $(".ui-pager").each(function () {
      if ($(this).hasClass("focus")) {
        _this.pageIndex=$(this).text()
      }
    })
  },
  // 获取数据
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
  // 创建表头
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
  // 将数据添加到表格中
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
  // tab栏切换
  tabDataInit:function () {
    $("#tabButtons>li").click(function () {
      $("#tabButtons>li").css({'color':'#bdbdbd','background': '#282828'});
      $(this).css({'color':'#282828','background': 'white'});
      var index=$(this).index();
      $("#showData>li").hide();
      $("#showData>li:eq("+index+")").show();
    })
  },
  // 为搜索框注册事件
  searchEvents:function () {
    var _this=this;
    var codeList=this.allData.codelist;
    for (let i = 0; i < codeList.length; i++) {
      $('#seach'+i).keyup(function (e) {
        if (e.keyCode===13) {
          // 获取输入框的内容
          $('#pageToolbar').empty()
          var innerTxt = $(this).val()
          // // /selectstation5?station_id_d=01011
          _this.url=_this.originUrl+"?"+codeList[i]+"="+innerTxt;
          _this.allData = _this.getData(_this.url)
          // _this.renderPageNum(_this.url);
          log(_this.allData)
          log(_this.url)
          _this.data=_this.getData(_this.url+'&page='+_this.pageIndex+'&pagenum=12');
          _this.creatThead(_this.data.namelist,"#mainHead");
          _this.creatTbody(_this.data.datalist,"#mainBody");
          _this.initPageCount(_this.url)
          // 清空输入框
           $(this).val("")
           _this.searchEvents()
        }
      })
    }
  }
}

function log(argument) {
  console.log(argument)
}

