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
          url: 'php/warehouse.php',
          type: 'POST',
          contentType: false,
          processData: false,
          success: function(json){
            var data=JSON.parse(json);
            $("tbody").empty();
            $.each(data,function(){
              var Wid=this.Wid;
              var Waddress=this.Waddress;
              var WkeeperName=this.WkeeperName;
              var WkeeperPhone=this.WkeeperPhone;
              var str="";
              str=str+"<tr>";
              str=str+"<th>"+Wid+"</th>";
              str=str+"<th>"+Waddress+"</th>";
              str=str+"<th>"+WkeeperName+"</th>";
              str=str+"<th>"+WkeeperPhone+"</th>";
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
          search_data.append('search_text',$("#search_text").val());
          $.ajax({
          url: 'php/warehouse_search.php',
          type: 'POST',
          data:search_data,
          contentType: false,
          processData: false,
          success: function(json){
            var data=JSON.parse(json);
            $("tbody").empty();
            $.each(data,function(){
              var Wid=this.Wid;
              var Waddress=this.Waddress;
              var WkeeperName=this.WkeeperName;
              var WkeeperPhone=this.WkeeperPhone;
              var str="";
              str=str+"<tr>";
              str=str+"<th>"+Wid+"</th>";
              str=str+"<th>"+Waddress+"</th>";
              str=str+"<th>"+WkeeperName+"</th>";
              str=str+"<th>"+WkeeperPhone+"</th>";
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
          $("#edit_Wid").val("");
          $("#edit_Waddress").val("");
          $("#edit_WkeeperName").val("");
          $("#edit_WkeeperPhone").val("");
        }
        //新增
        $("#add").click(function(){
          if ($("#edit_Waddress").val()=="") {
            alert("请输入仓库地址");
          }
          else if ($("#edit_WkeeperName").val()=="") {
            alert("请输入仓库负责人名字");
          }
          else if ($("#edit_WkeeperPhone").val()=="") {
            alert("请输入仓库负责人手机号码");
          }
          else{
            var add_data=new FormData();
            add_data.append('edit_Waddress',$("#edit_Waddress").val());
            add_data.append('edit_WkeeperName',$("#edit_WkeeperName").val());
            add_data.append('edit_WkeeperPhone',$("#edit_WkeeperPhone").val());
            $.ajax({
              url: 'php/warehouse_add.php',
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
              },
            });
          }
        });

        //删除
        $("#delete").click(function(){
          if ($("#edit_Wid").val()=="") {
            alert("请输入仓库编号");
          }
          else{
            var delete_data=new FormData();
            delete_data.append('edit_Wid',$("#edit_Wid").val());
            $.ajax({
            url: 'php/warehouse_delete.php',
            type: 'POST',
            data:delete_data,
            contentType: false,
            processData: false,
            success: function(json){
              var data=JSON.parse(json);
              if (data.feedback=="success") {
                alert("删除成功");
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
          if ($("#edit_Wid").val()=="") {
            alert("请输入仓库编号");
          }
          else{
            var update_data=new FormData();
            update_data.append('edit_Wid',$("#edit_Wid").val());
            update_data.append('edit_Waddress',$("#edit_Waddress").val());
            update_data.append('edit_WkeeperName',$("#edit_WkeeperName").val());
            update_data.append('edit_WkeeperPhone',$("#edit_WkeeperPhone").val());
            $.ajax({
              url: 'php/warehouse_update.php',
              type: 'POST',
              data:update_data,
              contentType: false,
              processData: false,
              success: function(json){
                var data=JSON.parse(json);
                if (data.feedback=="success") {
                  alert("更新成功");
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