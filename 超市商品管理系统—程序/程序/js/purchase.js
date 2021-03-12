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
          $.ajax({
          url: 'php/purchase.php',
          type: 'POST',
          contentType: false,
          processData: false,
          success: function(json){
          var data=JSON.parse(json);
          $("tbody").empty();
          $.each(data,function(){
            var Pid=this.Pid;
            var Customer_Cid=this.Customer_Cid;
            var Goods_Gid=this.Goods_Gid;
            var Gname=this.Gname;
            var Pquantity=this.Pquantity;
            var PtotalMoney=this.PtotalMoney;
            var PpayMethod=this.PpayMethod;
            var PaddPoints=this.PaddPoints;
            var Pdate=this.Pdate;
            var str="";
            str=str+"<tr>";
            str=str+"<th>"+Pid+"</th>";
            str=str+"<th>"+Customer_Cid+"</th>";
            str=str+"<th>"+Goods_Gid+"</th>";
            str=str+"<th>"+Gname+"</th>";
            str=str+"<th>"+Pquantity+"</th>";
            str=str+"<th>"+PtotalMoney+"</th>";
            str=str+"<th>"+PpayMethod+"</th>";
            str=str+"<th>"+PaddPoints+"</th>";
            str=str+"<th>"+Pdate+"</th>";
            str=str+"</tr>";
            $("tbody").append(str);
          });
          },
          error: function(){
          alert("error");
          }
          });
        }
    $(document).ready(function(){
        //初始化
        f();

        //查询控件
        var choose_result="Pid";
        $("#search_way").change(function () {
            choose_result = $(this).children('option:selected').val();
        });

        $("#search").click(function(){
          if (choose_result=="Pdate" && $("#search_date").val()=="") {
            alert("请选择日期");
          }
          else{
            var search_data=new FormData();
            search_data.append('search_way',choose_result);
            search_data.append('search_text',$("#search_text").val());
            search_data.append('search_date',$("#search_date").val());
            $.ajax({
              url: 'php/purchase_search.php',
              type: 'POST',
              data:search_data,
              contentType: false,
              processData: false,
              success: function(json){
                var data=JSON.parse(json);
                $("tbody").empty();
                $.each(data,function(){
                  var Pid=this.Pid;
                  var Customer_Cid=this.Customer_Cid;
                  var Goods_Gid=this.Goods_Gid;
                  var Gname=this.Gname;
                  var Pquantity=this.Pquantity;
                  var PtotalMoney=this.PtotalMoney;
                  var PpayMethod=this.PpayMethod;
                  var PaddPoints=this.PaddPoints;
                  var Pdate=this.Pdate;
                  var str="";
                  str=str+"<tr>";
                  str=str+"<th>"+Pid+"</th>";
                  str=str+"<th>"+Customer_Cid+"</th>";
                  str=str+"<th>"+Goods_Gid+"</th>";
                  str=str+"<th>"+Gname+"</th>";
                  str=str+"<th>"+Pquantity+"</th>";
                  str=str+"<th>"+PtotalMoney+"</th>";
                  str=str+"<th>"+PpayMethod+"</th>";
                  str=str+"<th>"+PaddPoints+"</th>";
                  str=str+"<th>"+Pdate+"</th>";
                  str=str+"</tr>";
                  $("tbody").append(str);
                });
              },
            });
          }

        });

        $("#search_cancel").click(function(){
          f();
          $("#search_text").val("");
          $("#search_date").val("");
        });

      });