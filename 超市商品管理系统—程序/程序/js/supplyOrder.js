function showGoods(){
        if ($("#edit_Gid").val()==""){
          $("#disGname").val("输入商品编号后查看");
        }
        else{
          var show_data=new FormData();
          show_data.append('show_data',$("#edit_Gid").val());
          $.ajax({
            url: 'php/supplyOrder_showGoods.php',
            data:show_data,
            type: 'POST',
            contentType: false,
            processData: false,
            success: function(json){
              var data=JSON.parse(json);
              if (data.feedback=="fail") {
                $("#disGname").val("商品不存在");
              }
              else {
                $("#disGname").val(data.feedback);
              }
            },
            error: function(){
              alert("error");
            }
          });
        }
      }
      //初始化函数
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
          url: 'php/supplyOrder.php',
          type: 'POST',
          contentType: false,
          processData: false,
          success: function(json){
            var data=JSON.parse(json);
            $("tbody").empty();
            $.each(data,function(){
              var CTid=this.CTid;
              var Goods_Gid=this.Goods_Gid;
              var Gname=this.Gname;
              var Supplier_Sid=this.Supplier_Sid;
              var Sname=this.Sname;
              var CTunitPrice=this.CTunitPrice;
              var CTquantity=this.CTquantity;
              var CTtotalMoney=this.CTtotalMoney;
              var CTdate=this.CTdate;
              var CTnote=this.CTnote;
              var str="";
              str=str+"<tr>";
              str=str+"<th>"+CTid+"</th>";
              str=str+"<th>"+Goods_Gid+"</th>";
              str=str+"<th>"+Gname+"</th>";
              str=str+"<th>"+Supplier_Sid+"</th>";
              str=str+"<th>"+Sname+"</th>";
              str=str+"<th>"+CTunitPrice+"</th>";
              str=str+"<th>"+CTquantity+"</th>";
              str=str+"<th>"+CTtotalMoney+"</th>";
              str=str+"<th>"+CTdate+"</th>";
              str=str+"<th>"+CTnote+"</th>";
              str=str+"</tr>";
              $("tbody").append(str);
            });
          },
          error: function(){
            alert("error");
          }
        });
        $.ajax({
          url: 'php/supply.php',
          type: 'POST',
          contentType: false,
          processData: false,
          success: function(json){
            var data=JSON.parse(json);
            $("#edit_Sid").empty();
            $.each(data,function(){
              var Sid=this.Sid;
              var str="";
              str=str+"<option>"+Sid+"</option>";
              $("#edit_Sid").append(str);
            });
          },
          error: function(){
            alert("error");
          }
        });
      }
      //清空编辑模块
      function clear_edit(){
          $("#edit_CTid").val("");
          $("#edit_Gid").val("");
          $("#disGname").val("");
          $("#edit_Sprice").val("");
          $("#edit_Gnumber").val("");
          $("#edit_date").val("");
          $("#edit_note").val("");
      }


      $(document).ready(function(){
        //初始化
        f();

        //查询控件
        var choose_result="CTid";
        $("#search_way").change(function () {
            choose_result = $(this).children('option:selected').val();
        });

        $("#search").click(function(){
          if (choose_result=="Searchway_date" && $("#search_date").val()=="") {
            alert("请选择日期");
          }
          else{
            var search_data=new FormData();
            search_data.append('search_way',choose_result);
            search_data.append('search_text',$("#search_text").val());
            search_data.append('search_date',$("#search_date").val());
            $.ajax({
              url: 'php/supplyOrder_search.php',
              type: 'POST',
              data:search_data,
              contentType: false,
              processData: false,
              success: function(json){
                var data=JSON.parse(json);
                $("tbody").empty();
                $.each(data,function(){
                  var CTid=this.CTid;
                  var Goods_Gid=this.Goods_Gid;
                  var Gname=this.Gname;
                  var Supplier_Sid=this.Supplier_Sid;
                  var Sname=this.Sname;
                  var CTunitPrice=this.CTunitPrice;
                  var CTquantity=this.CTquantity;
                  var CTtotalMoney=this.CTtotalMoney;
                  var CTdate=this.CTdate;
                  var str="";
                  str=str+"<tr>";
                  str=str+"<th>"+CTid+"</th>";
                  str=str+"<th>"+Goods_Gid+"</th>";
                  str=str+"<th>"+Gname+"</th>";
                  str=str+"<th>"+Supplier_Sid+"</th>";
                  str=str+"<th>"+Sname+"</th>";
                  str=str+"<th>"+CTunitPrice+"</th>";
                  str=str+"<th>"+CTquantity+"</th>";
                  str=str+"<th>"+CTtotalMoney+"</th>";
                  str=str+"<th>"+CTdate+"</th>";
                  str=str+"<th>"+""+"</th>";
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

        //编辑模块
        var edit_Sid="S001";
        $("#edit_Sid").change(function () {
            edit_Sid = $(this).children('option:selected').val();
        });
        //新增
        $("#add").click(function(){
          if ($("#edit_Gid").val()=="") {
            alert("请输入商品编号");
          }
          else if ($("#edit_Sprice").val()=="") {
            alert("请输入进货价");
          }
          else if ($("#edit_Gnumber").val()=="") {
            alert("请输入数量");
          }
          else if ($("#edit_date").val()=="") {
            alert("请输入日期");
          }
          else if ($("#disGname").val()=="商品不存在") {
            alert("商品不存在，请先新增商品");
          }
          else{
          var add_data=new FormData();
          add_data.append('edit_CTid',$("#edit_CTid").val());
          add_data.append('edit_Sid',edit_Sid);
          add_data.append('edit_Gid',$("#edit_Gid").val());
          add_data.append('edit_Sprice',$("#edit_Sprice").val());
          add_data.append('edit_Gnumber',$("#edit_Gnumber").val());
          add_data.append('edit_date',$("#edit_date").val());
          $.ajax({
            url: 'php/supplyOrder_add.php',
            type: 'POST',
            data:add_data,
            contentType: false,
            processData: false,
            success: function(json){
              var data=JSON.parse(json);
              if (data.feedback=="success") {
                alert("添加成功");
                clear_edit();
                f();
              }
              else if(data.feedback=="Sid_wrong"){
                alert("供应商不存在");
              }
            },
          });
          }
        });

        //修改
        $("#update").click(function(){
          if ($("#edit_note").val()=='') {
            alert("请备注");
          }
          else{
            var update_data=new FormData();
            update_data.append('edit_CTid',$("#edit_CTid").val());
            update_data.append('edit_Sid',$("#edit_Sid").val());
            update_data.append('edit_Gid',$("#edit_Gid").val());
            update_data.append('edit_Sprice',$("#edit_Sprice").val());
            update_data.append('edit_Gnumber',$("#edit_Gnumber").val());
            update_data.append('edit_date',$("#edit_date").val());
            update_data.append('edit_note',$("#edit_note").val());
            $.ajax({
              url: 'php/supplyOrder_update.php',
              type: 'POST',
              data:update_data,
              contentType: false,
              processData: false,
              success: function(json){
                var data=JSON.parse(json);
                if (data.feedback=="success") {
                  alert("修改成功");
                  clear_edit();
                  f();
                }
                else if(data.feedback=="CTid_wrong"){
                  alert("订单不存在");
                }
              },
            });
          }
        })

      });