<?php 
    header("Content-type:text/html;charset=utf-8");
    require_once('connectvars.php');
    $edit_CTid=$_POST['edit_CTid'];

    $edit_Sid=$_POST['edit_Sid'];
    $edit_Gid=$_POST['edit_Gid'];
    $edit_Sprice=$_POST['edit_Sprice'];
    $edit_Gnumber=$_POST['edit_Gnumber'];
    $edit_date=$_POST['edit_date'];
    $edit_note=$_POST['edit_note'];
    //创立连接
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    mysqli_query($dbc,"set names utf8");

    $query="select * from goods_contract_supplier where CTid ='$edit_CTid'";
    $result=mysqli_query($dbc,$query);
    $row=mysqli_fetch_array($result,MYSQL_ASSOC);
    if ($row==null) {
      echo json_encode(array("feedback"=>"CTid_wrong"));
    }
    else{
      $befor_Gid=$row["Goods_Gid"];
      $befor_Gquantity=$row["CTquantity"];
      $query="update goods set Gquantity=Gquantity-'$befor_Gquantity' where Gid = '$befor_Gid'";
      mysqli_query($dbc,$query);

      if ($edit_Sid!='') {
        $query="update goods_contract_supplier set Supplier_Sid='$edit_Sid' where CTid ='$edit_CTid'";
        mysqli_query($dbc,$query);
      }
      if ($edit_Gid!='') {
        $query="update goods_contract_supplier set Goods_Gid='$edit_Gid' where CTid ='$edit_CTid'";
        mysqli_query($dbc,$query);
      }
      if ($edit_Sprice!='') {
        $query="update goods_contract_supplier set CTunitPrice='$edit_Sprice' where CTid ='$edit_CTid'";
        mysqli_query($dbc,$query);
      }
      if ($edit_Gnumber!='') {
        $query="update goods_contract_supplier set CTquantity='$edit_Gnumber' where CTid ='$edit_CTid'";
        mysqli_query($dbc,$query);
      }
      if ($edit_date!='') {
        $query="update goods_contract_supplier set CTdate='$edit_date' where CTid ='$edit_CTid'";
        mysqli_query($dbc,$query);
      }
      if ($edit_note!='') {
        $query="update goods_contract_supplier set CTnote='$edit_note' where CTid ='$edit_CTid'";
        mysqli_query($dbc,$query);
      }
      $query="select * from goods_contract_supplier where CTid ='$edit_CTid'";
      $result=mysqli_query($dbc,$query);
      $row=mysqli_fetch_array($result,MYSQL_ASSOC);

      $after_Gid=$row["Goods_Gid"];
      $after_price=$row["CTunitPrice"];
      $after_Gquantity=$row["CTquantity"];

      $query="update goods_contract_supplier set CTtotalMoney='$after_price'*'$after_Gquantity' where CTid ='$edit_CTid'";
      mysqli_query($dbc,$query);
      //更新商品表中的库存
      $query="update goods set Gquantity=Gquantity+'$after_Gquantity' where Gid = '$after_Gid'";
      mysqli_query($dbc,$query);

      echo json_encode(array("feedback"=>"success"));
    }
    //关闭连接
    mysqli_close($dbc);
?>