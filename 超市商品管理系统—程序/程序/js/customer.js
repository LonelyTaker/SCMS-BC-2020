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
          url: 'php/customer.php',
          type: 'POST',
          contentType: false,
          processData: false,
          success: function(json){
          var data=JSON.parse(json);
          $("tbody").empty();
          $.each(data,function(){
            var Cid=this.Cid;
            var Cname=this.Cname;
            var Cphone=this.Cphone;
            var Caddress=this.Caddress;
            var VIPpoints=this.VIPpoints;
            var VIPbalance=this.VIPbalance;
            var str="";
            str=str+"<tr>";
            str=str+"<th>"+Cid+"</th>";
            str=str+"<th>"+Cname+"</th>";
            str=str+"<th>"+Cphone+"</th>";
            str=str+"<th>"+Caddress+"</th>";
            str=str+"<th>"+VIPpoints+"</th>";
            str=str+"<th>"+VIPbalance+"</th>";
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
        var choose_result="Cid";
        $("#search_way").change(function () {
            choose_result = $(this).children('option:selected').val();
        });

        $("#search").click(function(){
          var search_data=new FormData();
          search_data.append('search_way',choose_result);
          search_data.append('search_text',$("#search_text").val());
          $.ajax({
          url: 'php/customer_search.php',
          type: 'POST',
          data:search_data,
          contentType: false,
          processData: false,
          success: function(json){
            var data=JSON.parse(json);
            $("tbody").empty();
            $.each(data,function(){
              var Cid=this.Cid;
              var Cname=this.Cname;
              var Cphone=this.Cphone;
              var Caddress=this.Caddress;
              var VIPpoints=this.VIPpoints;
              var VIPbalance=this.VIPbalance;
              var str="";
              str=str+"<tr>";
              str=str+"<th>"+Cid+"</th>";
              str=str+"<th>"+Cname+"</th>";
              str=str+"<th>"+Cphone+"</th>";
              str=str+"<th>"+Caddress+"</th>";
              str=str+"<th>"+VIPpoints+"</th>";
              str=str+"<th>"+VIPbalance+"</th>";
              str=str+"</tr>";
              $("tbody").append(str);
            });
          },
          });
        });

        $("#search_cancel").click(function(){
          f();
          $("#search_text").val("");
        });

        //编辑控件
        function clear_edit(){
          $("#edit_Cid").val("");
          $("#edit_Cname").val("");
          $("#edit_Cphone").val("");
          $("#edit_Cadd").val("");
          $("#edit_VIPbalance").val("");
        }
        //新增
        $("#add").click(function(){
          if ($("#edit_Cname").val()=="") {
            alert("请输入顾客姓名");
          }
          else if ($("#edit_Cphone").val()=="") {
            alert("请输入顾客电话");
          }
          else{
            var add_data=new FormData();
            add_data.append('edit_Cname',$("#edit_Cname").val());
            add_data.append('edit_Cphone',$("#edit_Cphone").val());
            add_data.append('edit_Cadd',$("#edit_Cadd").val());
            add_data.append('edit_VIPbalance',$("#edit_VIPbalance").val());
            $.ajax({
              url: 'php/customer_add.php',
              type: 'POST',
              data:add_data,
              contentType: false,
              processData: false,
              success: function(json){
                var data=JSON.parse(json);
                if (data.feedback=="success") {
                  clear_edit();
                  f();
                }
              },
            });
          }
        });

        //删除
        $("#delete").click(function(){
          if ($("#edit_Cid").val()=="") {
            alert("请输入顾客编号");
          }
          else{
            var delete_data=new FormData();
            delete_data.append('edit_Cid',$("#edit_Cid").val());
            $.ajax({
            url: 'php/customer_delete.php',
            type: 'POST',
            data:delete_data,
            contentType: false,
            processData: false,
            success: function(json){
              var data=JSON.parse(json);
              if (data.feedback=="success") {
                clear_edit();
                f();
              }
              else{
                alert("编号不存在");
              }
            },
            });
          }
        });

        //更新
        $("#update").click(function(){
          if ($("#edit_Cid").val()=="") {
            alert("请输入顾客编号");
          }
          else{
            var update_data=new FormData();
            update_data.append('edit_Cid',$("#edit_Cid").val());
            update_data.append('edit_Cname',$("#edit_Cname").val());
            update_data.append('edit_Cphone',$("#edit_Cphone").val());
            update_data.append('edit_Cadd',$("#edit_Cadd").val());
            update_data.append('edit_VIPbalance',$("#edit_VIPbalance").val());
            $.ajax({
              url: 'php/customer_update.php',
              type: 'POST',
              data:update_data,
              contentType: false,
              processData: false,
              success: function(json){
                var data=JSON.parse(json);
                if (data.feedback=="success") {
                  clear_edit();
                  f();
                }
                else{
                  alert("编号不存在");
                }
              },
            });
          }
        });

      });