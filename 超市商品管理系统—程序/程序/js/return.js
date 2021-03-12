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
      var modular=new FormData();
      modular.append('modular',"nproccess");
      $.ajax({
        url: 'php/return.php',
        type: 'POST',
        data:modular,
        contentType: false,
        processData: false,
        success: function(json){
          var data=JSON.parse(json);
          $("tbody").empty();
          $.each(data,function(){
            var Rid=this.Rid;
            var Cid=this.Cid;
            var Pid=this.Pid;
            var Gname=this.Gname;
            var Rquantity=this.Rquantity;
            var Rprice=this.Rprice;
            var Rreason=this.Rreason;
            var Rdate=this.Rdate;
            var str="";
            str=str+"<tr><th>"+Rid+"</th>";
            str=str+"<th>"+Cid+"</th>";
            str=str+"<th>"+Pid+"</th>";
            str=str+"<th>"+Gname+"</th>";
            str=str+"<th>"+Rquantity+"</th>";
            str=str+"<th>"+Rprice+"</th>";
            str=str+"<th>"+Rreason+"</th>";
            str=str+"<th>"+Rdate+"</th></tr>";
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

      //查询模块
      $("#search").click(function(){
        if ($("#search_date").val()=="") {
          alert("请选择日期");
        }
        else{
          var search_data=new FormData();
          search_data.append('search_date',$("#search_date").val());
          search_data.append('modular',"nproccess");
          $.ajax({
            url: 'php/return_search.php',
            type: 'POST',
            data:search_data,
            contentType: false,
            processData: false,
            success: function(json){
              var data=JSON.parse(json);
              $("tbody").empty();
              $.each(data,function(){
                var Rid=this.Rid;
                var Cid=this.Cid;
                var Pid=this.Pid;
                var Gname=this.Gname;
                var Rquantity=this.Rquantity;
                var Rprice=this.Rprice;
                var Rreason=this.Rreason;
                var Rdate=this.Rdate;
                var str="";
                str=str+"<tr><th>"+Rid+"</th>";
                str=str+"<th>"+Cid+"</th>";
                str=str+"<th>"+Pid+"</th>";
                str=str+"<th>"+Gname+"</th>";
                str=str+"<th>"+Rquantity+"</th>";
                str=str+"<th>"+Rprice+"</th>";
                str=str+"<th>"+Rreason+"</th>";
                str=str+"<th>"+Rdate+"</th></tr>";
                $("tbody").append(str);
              });
            },
          });
        }
      });

      $("#search_cancel").click(function(){
        f();
        $("#search_date").val("");
      });

      //确认模块
      var is_back="false";
      $("#Checkbox").click(function(){
        if ($("#Checkbox").get(0).checked)
          is_back="true";
        else{
          is_back="false";
        }
      });

      $("#update").click(function(){
        if ($("#edit_Rid").val()=="") {
          alert("请输入退货单号");
        }
        else{
          var update_data=new FormData();
          update_data.append('edit_Rid',$("#edit_Rid").val());
          update_data.append('is_back',is_back);
          $.ajax({
            url: 'php/return_makesure.php',
            type: 'POST',
            data:update_data,
            contentType: false,
            processData: false,
            success: function(json){
              var data=JSON.parse(json);
              if (data.feedback=="Rid_wrong") {
                alert("退货单号不存在");
              }
              else if (data.feedback=="Rstate_wrong") {
                alert("该退货单号已确认");
              }else if (data.feedback=="time_wrong") {
                alert("客户购买已超过三天，不予通过");
                f();
                $("#edit_Rid").val("");
              }
              else{
                f();
                $("#edit_Rid").val("");
              }
            },
          });
        }
      });

    });