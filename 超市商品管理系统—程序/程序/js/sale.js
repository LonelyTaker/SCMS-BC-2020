function f(){
        $.ajax({
          url: 'php/verification.php',
          type: 'POST',
          contentType: false,
          processData: false,
          success: function(json){
          var data=JSON.parse(json);
          if (data.feedback=='fail') {
            alert("请先登录");
            window.location.href="Sign.html";
          }
          },
          error: function(){
          alert("error");
          }
        });
        var echart_date=[];
        var echart_income=[];
        var echart_pay=[];
        var echart_profit=[];
        var search_data=new FormData();
        search_data.append('search_way','ThreeDays');
        search_data.append('search_date','');
        $.ajax({
          url: 'php/sale.php',
          type: 'POST',
          data:search_data,
          contentType: false,
          processData: false,
          success: function(json){
            var data=JSON.parse(json);
            $("tbody").empty();
            $.each(data,function(){
              var date=this.date;
              var income=this.income;
              var pay=this.pay;
              var profit=this.profit;
              var str="";
              str=str+"<tr>";
              str=str+"<th>"+date+"</th>";
              str=str+"<th>"+income+"</th>";
              str=str+"<th>"+pay+"</th>";
              str=str+"<th>"+profit+"</th>";
              str=str+"</tr>";
              $("tbody").append(str);
              echart_date.push(date);
              echart_income.push(income);
              echart_pay.push(pay);
              echart_profit.push(profit);
            });
            var dom = document.getElementById("echart");
            var myChart = echarts.init(dom);
            option = null;
            option = {
              title: {
                text: '营业情况',
              },
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data: ['支出', '收入','利润']
              },
              toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: {readOnly: false},
                    magicType: {type: ['bar']},
                    restore: {},
                    saveAsImage: {}
                }
              },
              xAxis: {
                data: echart_date
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} 元'
                }
              },
              series: [{
                name: '支出',
                type: 'line',
                data: echart_pay,
              },
              {
                name: '收入',
                type: 'line',
                data: echart_income,
              },
              {
                name: '利润',
                type: 'line',
                data: echart_profit,
                markPoint: {
                    data: [{type: 'max', name: '最大值'},{type: 'min', name: '最小值'}]
                },
                markLine: {
                    data: [{type: 'average', name: '平均值'}]
                }
              }
              ] 
            };
            if (option && typeof option === "object") {
              myChart.setOption(option, true);
            }
          },
        });
      }


    $(document).ready(function(){
        //初始化
        f();

        //查询控件
        var choose_result="ThreeDays";
        $("#search_way").change(function () {
            choose_result = $(this).children('option:selected').val();
        });

        $("#search").click(function(){
          if (choose_result=="date" && $("#search_date").val()=="") {
            alert("请选择日期");
          }
          else{
            var echart_date=[];
            var echart_income=[];
            var echart_pay=[];
            var echart_profit=[];
            var search_data=new FormData();
            search_data.append('search_way',choose_result);
            search_data.append('search_date',$("#search_date").val());
            $.ajax({
              url: 'php/sale.php',
              type: 'POST',
              data:search_data,
              contentType: false,
              processData: false,
              success: function(json){
                var data=JSON.parse(json);
                $("tbody").empty();
                $.each(data,function(){
                  var date=this.date;
                  var income=this.income;
                  var pay=this.pay;
                  var profit=this.profit;
                  var str="";
                  str=str+"<tr>";
                  str=str+"<th>"+date+"</th>";
                  str=str+"<th>"+income+"</th>";
                  str=str+"<th>"+pay+"</th>";
                  str=str+"<th>"+profit+"</th>";
                  str=str+"</tr>";
                  $("tbody").append(str);
                  echart_date.push(date);
                  echart_income.push(income);
                  echart_pay.push(pay);
                  echart_profit.push(profit);
                });
                var dom = document.getElementById("echart");
                var myChart = echarts.init(dom);
                option = null;
                option = {
                  title: {
                    text: '营业情况',
                  },
                  tooltip: {
                    trigger: 'axis'
                  },
                  legend: {
                    data: ['支出', '收入','利润']
                  },
                  toolbox: {
                    show: true,
                    feature: {
                      dataZoom: {
                        yAxisIndex: 'none'
                      },
                      dataView: {readOnly: false},
                      magicType: {type: ['bar']},
                      restore: {},
                      saveAsImage: {}
                    }
                  },
                  xAxis: {
                    data: echart_date
                  },
                  yAxis: {
                    type: 'value',
                    axisLabel: {
                      formatter: '{value} 元'
                    }
                  },
                  series: [{
                    name: '支出',
                    type: 'line',
                    data: echart_pay,
                  },
                  {
                    name: '收入',
                    type: 'line',
                    data: echart_income,
                  },
                  {
                    name: '利润',
                    type: 'line',
                    data: echart_profit,
                    markPoint: {
                        data: [{type: 'max', name: '最大值'},{type: 'min', name: '最小值'}]
                    },
                    markLine: {
                        data: [{type: 'average', name: '平均值'}]
                    }
                  }] 
                };
                if (option && typeof option === "object") {
                  myChart.setOption(option, true);
                }
              },
            });
          }

        });

        $("#search_cancel").click(function(){
          f();
          $("#search_date").val("");
        });

      });