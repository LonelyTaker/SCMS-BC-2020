function f(){
  $.ajax({
    url: 'php/commodity.php',
    type: 'POST',
    contentType: false,
    processData: false,
    success: function(json){
      var data=JSON.parse(json);
      $("tbody").empty();
      $.each(data,function(){
        var Gid=this.Gid;
        var Gname=this.Gname;
        var Gitem=this.Gtype;
        var Gprice=this.Gprice;
        var Gquantity=this.Gquantity;
        var GneedPoints=this.GneedPoints;
        var Warehouse_Wid=this.Warehouse_Wid;
        var str="";
        str=str+"<tr><th>"+Gid+"</th>";
        str=str+"<th>"+Gname+"</th>";
        str=str+"<th>"+Gitem+"</th>";
        str=str+"<th>"+Gprice+"</th>";
        str=str+"<th>"+Gquantity+"</th>";
        str=str+"<th>"+GneedPoints+"</th>";
        str=str+"<th>"+Warehouse_Wid+"</th></tr>";
        $("tbody").append(str);
      });
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
      $("#edit_Wid").empty();
      $.each(data,function(){
        var Wid=this.Wid;
        var str="";
        str=str+"<option>"+Wid+"</option>";
        $("#edit_Wid").append(str);
      });
    },
    error: function(){
      alert("error");
    }
  });
}
      //清空编辑模块
      function clear_edit(){
          $("#edit_Gid").val("");
          $("#edit_Gname").val("");
          $("#edit_Gprice").val("");
          $("#edit_GneedPoints").val("");
      }

      $(document).ready(function(){
        //初始化
        f();

        //查询控件
        var choose_result="Gname";
        $("#search_way").change(function () {
            choose_result = $(this).children('option:selected').val();
        });

        $("#search").click(function(){
          var search_data=new FormData();
          search_data.append('search_way',choose_result);
          search_data.append('search_text',$("#search_text").val());
          $.ajax({
          url: 'php/commodity_search.php',
          type: 'POST',
          data:search_data,
          contentType: false,
          processData: false,
          success: function(json){
            var data=JSON.parse(json);
            $("tbody").empty();
            $.each(data,function(){
            var Gid=this.Gid;
            var Gname=this.Gname;
            var Gtype=this.Gtype;
            var Gprice=this.Gprice;
            var Gquantity=this.Gquantity;
            var GneedPoints=this.GneedPoints;
            var Warehouse_Wid=this.Warehouse_Wid;
            var str="";
            str=str+"<tr><th>"+Gid+"</th>";
            str=str+"<th>"+Gname+"</th>";
            str=str+"<th>"+Gtype+"</th>";
            str=str+"<th>"+Gprice+"</th>";
            str=str+"<th>"+Gquantity+"</th>";
            str=str+"<th>"+GneedPoints+"</th>";
            str=str+"<th>"+Warehouse_Wid+"</th></tr>";
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
        var edit_Gtype="日用品";
        $("#edit_Gtype").change(function () {
            edit_Gtype = $(this).children('option:selected').val();
        });
        var edit_Wid="W001";
        $("#edit_Wid").change(function () {
            edit_Wid = $(this).children('option:selected').val();
        });
        //新增
        $("#add").click(function(){
          // if ($("#edit_Gid").val()=="") {
          //   alert("请输入商品编号");
          // }
          if ($("#edit_Gname").val()=="") {
            alert("请输入商品名称");
          }
          else if ($("#edit_Gtype").val()=="") {
            alert("请输入商品类型");
          }
          else if ($("#edit_Gprice").val()=="") {
            alert("请输入商品价格");
          }
          else{
          var add_data=new FormData();
          add_data.append('edit_Gid',$("#edit_Gid").val());
          add_data.append('edit_Gname',$("#edit_Gname").val());
          add_data.append('edit_Gtype',edit_Gtype);
          add_data.append('edit_Gprice',$("#edit_Gprice").val());
          add_data.append('edit_GneedPoints',$("#edit_GneedPoints").val());
          add_data.append('edit_Warehouse_Wid',edit_Wid);
          $.ajax({
          url: 'php/commodity_add.php',
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

        //下架
        $("#delete").click(function(){
          if ($("#edit_Gid").val()=="") {
            alert("请输入商品编号");
          }
          else{
            var delete_data=new FormData();
            delete_data.append('edit_Gid',$("#edit_Gid").val());
            $.ajax({
            url: 'php/commodity_delete.php',
            type: 'POST',
            data:delete_data,
            contentType: false,
            processData: false,
            success: function(json){
              var data=JSON.parse(json);
              if (data.feedback=="success") {
                alert("下架成功");
                clear_edit();
                f();
              }
              else{
                alert("该商品不存在");
              }
            },
            });
          }
        });

        //更新
        $("#update").click(function(){
          if ($("#edit_Gid").val()=="") {
            alert("请输入商品编号");
          }
          else{
          var update_data=new FormData();
          update_data.append('edit_Gid',$("#edit_Gid").val());
          update_data.append('edit_Gname',$("#edit_Gname").val());
          update_data.append('edit_Gtype',$("#edit_Gtype").val());
          update_data.append('edit_Gprice',$("#edit_Gprice").val());
          update_data.append('edit_GneedPoints',$("#edit_GneedPoints").val());
          update_data.append('edit_Warehouse_Wid',edit_Wid);
          $.ajax({
          url: 'php/commodity_update.php',
          type: 'POST',
          data:update_data,
          contentType: false,
          processData: false,
          success: function(json){
            var data=JSON.parse(json);
            if (data.feedback=="success") {
              alert('修改成功');
              clear_edit();
              f();
            }
            else if(data.feedback=="Goods_wrong"){
              alert("商品不存在");
            }
            else if(data.feedback=="exist_wrong"){
              alert("商品名称无法修改");
            }
          },
          });
          }
        });

      });