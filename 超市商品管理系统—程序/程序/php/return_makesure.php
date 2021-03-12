<?php 
    header("Content-type:text/html;charset=utf-8");
    require_once('connectvars.php');

    $edit_Rid=$_POST['edit_Rid'];
    $is_back=$_POST['is_back'];
    //创建连接
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    mysqli_query($dbc,"set names utf8");
    $query="select * from customer_return_goods where Rid='$edit_Rid'";
    $result = mysqli_query($dbc,$query);
    $row=mysqli_fetch_array($result,MYSQL_ASSOC);
    if ($row==null) {
    	echo json_encode(array("feedback"=>"Rid_wrong"));
    }
    else{
    	if ($row["Rstate"]==1 || $row["Rstate"]==-1) {
    		echo json_encode(array("feedback"=>"Rstate_wrong"));
    	}
    	else{
            $Pid=$row["Purchase_Pid"];
            $query="select * from customer_purchase_goods where Pid='$Pid'";
            $result = mysqli_query($dbc,$query);
            $row1=mysqli_fetch_array($result,MYSQL_ASSOC);
            $days=abs((strtotime($row["Rdate"])-strtotime($row1["Pdate"]))/86400);
            if ($days>=3) {
                $query="update customer_return_goods set Rstate=-1 where Rid='$edit_Rid'";
                mysqli_query($dbc,$query);
                echo json_encode(array("feedback"=>"time_wrong"));
            }
            else{
                $query="update customer_return_goods set Rstate=1 where Rid='$edit_Rid'";
                mysqli_query($dbc,$query);


                $Rpoints=$row1["PaddPoints"];
                $Cid=$row1["Customer_Cid"];
                $Rquantity=$row["Rquantity"];
                $Gname=$row["Goods_Gname"];

                $query="update customer set VIPpoints=VIPpoints-'$Rpoints' where Cid='$Cid'";
                mysqli_query($dbc,$query);
                if ($row1["PpayMethod"]=='VIPcard') {
                    $query="select * from goods where Gname='$Gname'";
                    $result = mysqli_query($dbc,$query);
                    $row2=mysqli_fetch_array($result,MYSQL_ASSOC);
                    $Rbalance=$row2["Gprice"]*$Rquantity;
                    $query="update customer set VIPbalance=VIPbalance+'$Rbalance' where Cid='$Cid'";
                    mysqli_query($dbc,$query);
                }
                if ($is_back=="true") {
                    $query="update goods set Gquantity=Gquantity+'$Rquantity' where Gname='$Gname'";
                    mysqli_query($dbc,$query);
                }

                echo json_encode(array("feedback"=>"success"));
            }
    	}
    }
    //关闭连接
    mysqli_close($dbc);
?>