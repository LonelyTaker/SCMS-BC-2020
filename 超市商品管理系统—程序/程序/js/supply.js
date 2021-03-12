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
          url: 'php/supply.php',
          type: 'POST',
          contentType: false,
          processData: false,
          success: function(json){
            var data=JSON.parse(json);
            $("tbody").empty();
            $.each(data,function(){
              var Sid=this.Sid;
              var Sname=this.Sname;
              var ScontactName=this.ScontactName;
              var ScontactPhone=this.ScontactPhone;
              var Saddress=this.Saddress;
              var str="";
              str=str+"<tr><th>"+Sid+"</th>";
              str=str+"<th>"+Sname+"</th>";
              str=str+"<th>"+ScontactName+"</th>";
              str=str+"<th>"+ScontactPhone+"</th>";
              str=str+"<th>"+Saddress+"</th></tr>";
              $("tbody").append(str);
            });
          },
          error: function(){
            alert("error");
          }
        });
      }
      function clear_edit(){
        $("#edit_Sid").val("");
        $("#edit_Sname").val("");
        $("#edit_SconName").val("");
        $("#edit_SconPhone").val("");
        $("#edit_Sadd").val("");
      }
    $(document).ready(function(){
        //初始化
        f();
        
        //查询控件
        var choose_result="Sname";
        $("#search_way").change(function () {
            choose_result = $(this).children('option:selected').val();
        });

        $("#search").click(function(){
          var search_data=new FormData();
          search_data.append('search_way',choose_result);
          search_data.append('search_text',$("#search_text").val());
          $.ajax({
          url: 'php/supply_search.php',
          type: 'POST',
          data:search_data,
          contentType: false,
          processData: false,
          success: function(json){
            var data=JSON.parse(json);
            $("tbody").empty();
            $.each(data,function(){
            var Sid=this.Sid;
            var Sname=this.Sname;
            var ScontactName=this.ScontactName;
            var ScontactPhone=this.ScontactPhone;
            var Saddress=this.Saddress;
            var str="";
            str=str+"<tr><th>"+Sid+"</th>";
            str=str+"<th>"+Sname+"</th>";
            str=str+"<th>"+ScontactName+"</th>";
            str=str+"<th>"+ScontactPhone+"</th>";
            str=str+"<th>"+Saddress+"</th></tr>";
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
        //新增
        $("#add").click(function(){
          if ($("#edit_Sname").val()=="") {
            alert("请输入供应商名称");
          }
          else if ($("#edit_SconName").val()=="") {
            alert("请输入联系人名字");
          }
          else if ($("#edit_SconPhone").val()=="") {
            alert("请输入联系人电话");
          }
          else{
          var add_data=new FormData();
          add_data.append('edit_Sname',$("#edit_Sname").val());
          add_data.append('edit_SconName',$("#edit_SconName").val());
          add_data.append('edit_SconPhone',$("#edit_SconPhone").val());
          add_data.append('edit_Sadd',$("#edit_Sadd").val());
          $.ajax({
            url: 'php/supply_add.php',
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
          if ($("#edit_Sid").val()=="") {
            alert("请输入供应商编号");
          }
          else{
            var delete_data=new FormData();
            delete_data.append('edit_Sid',$("#edit_Sid").val());
            $.ajax({
            url: 'php/supply_delete.php',
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
                alert("供应商不存在");
              }
            },
            });
          }
        });

        //更新
        $("#update").click(function(){
          if ($("#edit_Sid").val()=="") {
            alert("请输入供应商编号");
          }
          else{
            var update_data=new FormData();
            update_data.append('edit_Sid',$("#edit_Sid").val());
            update_data.append('edit_Sname',$("#edit_Sname").val());
            update_data.append('edit_SconName',$("#edit_SconName").val());
            update_data.append('edit_SconPhone',$("#edit_SconPhone").val());
            update_data.append('edit_Sadd',$("#edit_Sadd").val());
            $.ajax({
              url: 'php/supply_update.php',
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
                else{
                  alert("供应商不存在");
                }
              },
            });
          }
        });

      });