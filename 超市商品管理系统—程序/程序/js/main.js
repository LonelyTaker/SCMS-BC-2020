function useritem(){
        $("#wait").empty();
        $("#wait").append('<iframe src="user.html" width="100%" height="100%" frameborder="0"></iframe>');
        $("#guide").empty();
        $("#guide").append("<p style='font-size: 20px;line-height: 60px;color: white'>个人资料</p>");
      }
      function logout(){
        window.location.href="Sign.html";
        $.ajax({
          url: './php/logout_username.php',
          type: 'POST',
          contentType: false,
          processData: false,
        });
      }
    $(document).ready(function(){
      $("#commodity").click(function(){
        $("#wait").empty();
        $("#wait").append('<iframe src="commodity.html" width="100%" height="100%" frameborder="0"></iframe>');
        $("#guide").empty();
        $("#guide").append("<p style='font-size: 20px;line-height: 60px;color: white'>商品管理</p>");
      });
      $("#supply").click(function(){
        $("#wait").empty();
        $("#wait").append('<iframe src="supply.html" width="100%" height="100%" frameborder="0"></iframe>');
        $("#guide").empty();
        $("#guide").append("<p style='font-size: 20px;line-height: 60px;color: white'>供应信息</p>");
      });
      $("#purchase").click(function(){
        $("#wait").empty();
        $("#wait").append('<iframe src="purchase.html" width="100%" height="100%" frameborder="0"></iframe>');
        $("#guide").empty();
        $("#guide").append("<p style='font-size: 20px;line-height: 60px;color: white'>销售统计</p>");
      });
      $("#customer").click(function(){
        $("#wait").empty();
        $("#wait").append('<iframe src="customer.html" width="100%" height="100%" frameborder="0"></iframe>');
        $("#guide").empty();
        $("#guide").append("<p style='font-size: 20px;line-height: 60px;color: white'>顾客信息</p>");
      });
      $("#return").click(function(){
        $("#wait").empty();
        $("#wait").append('<iframe src="return.html" width="100%" height="100%" frameborder="0"></iframe>');
        $("#guide").empty();
        $("#guide").append("<p style='font-size: 20px;line-height: 60px;color: white'>退货处理</p>");
      });
      $("#warehouse").click(function(){
        $("#wait").empty();
        $("#wait").append('<iframe src="warehouse.html" width="100%" height="100%" frameborder="0"></iframe>');
        $("#guide").empty();
        $("#guide").append("<p style='font-size: 20px;line-height: 60px;color: white'>仓库信息</p>");
      });
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
          url: 'php/get_username.php',
          type: 'POST',
          contentType: false,
          processData: false,
          success: function(json){
            var data=JSON.parse(json);
            $("#user").empty();
            $("#user").append('你好，<a href="javascript:void(0);" onclick="useritem()" style="color:#1684A5">'+data.username+'</a>');
            $("#user").append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
            $("#user").append('<a href="javascript:void(0);" onclick="logout()" style="font-size: 15px" style="color:#1684A5">退出登录</a>');
          },
          error: function(){
            alert("error");
          }
      });
    });