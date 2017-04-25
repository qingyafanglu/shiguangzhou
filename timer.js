/**
 * Created by Steven on 2017/2/10.
 */
//2 定义公用函数-------------------
var g=function(id){
    return document.getElementById(id);
}

//1 重新排列数据-----------------
var list={};
for(var i=0;i<data.length;i++){
    var date= new Date(data[i].date);

    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var lunar = GetLunarDateString( date );
    if(!list[year]){
        list[year]={};

    }
    if(!list[year][month]){
        list[year][month]=[];

    }
    var item=data[i];
    item.lunar = lunar[0]+'<br>&nbsp;'+lunar[1];
    item.like_format = item.like < 10000 ? item.like : ( item.like / 10000 ).toFixed(1) ;

    list[year][month].push( item );

}



window.onload= function () {
//3 输入模板结构--------------------------------
    //3.1 输入时序菜单--------------

 var html_s_year=[];
    for(y in list){
        var html_s_month=[];
        for(m in list[y]){
          var _html_s_month =g('tpl_s_month').innerHTML.replace(/\{month\}/,m);
          html_s_month.unshift(_html_s_month);
       };

        var _html_s_year=g('tpl_s_year').innerHTML
            .replace(/\{year\}/,y)
            .replace(/\{list\}/,html_s_month.join(''));
        html_s_year.unshift(_html_s_year);

    }
    g('scrubber').innerHTML='<a href="#">first</a>'
    g('scrubber').innerHTML+=html_s_year.join('')+'<a href="#">end</a>';

   //3.2 输入内容菜单--------------------



    var html_c_year=[];
    for(y in list){
        var html_c_month=[];
        for(m in list[y]){
            var html_item=[];
            var isFirst=true;
          for(var i=0;i<list[y][m].length;i++){
                var item=list[y][m][i];
                var _html_item=g('tpl_c_item').innerHTML
                   .replace(/\{lunar\}/,item.lunar)
                    .replace(/\{date\}/,item.date)
                    .replace(/\{intro\}/,item.intro)
                    .replace(/\{media\}/,item.media)
                    .replace(/\{like\}/,item.like)
                    .replace(/\{comment\}/,item.comment)
                    .replace(/\{like_format\}/,item.like_format)
                    .replace(/\{position\}/,(i%2==0)?'left':'right')
                    .replace(/\{isFirst\}/,(isFirst)?'first':'');
                isFirst=false;
                html_item.push(_html_item);
            }

            var _html_c_month =g('tpl_c_month').innerHTML.replace(/\{month\}/,m).replace(/\{list\}/, html_item.join(''));
            html_c_month.unshift(_html_c_month);
        };

        var _html_c_year=g('tpl_c_year').innerHTML
            .replace(/\{year\}/,y)
            .replace(/\{list\}/,html_c_month.join(''));
        html_c_year.unshift(_html_c_year);

    }
    g('content').innerHTML='<div class="c_month">first</div>';
    g('content').innerHTML+=html_c_year.join('');
    g('content').innerHTML+='<div class="c_month">end</div>';
  //4   时序菜单点击展开-------------------------------------






}




