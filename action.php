<?php
    $conn = new PDO("mysql:host=localhost;dbname=test","root","12345678");

    $request_data = json_decode(file_get_contents("php://input"));
    $data=array();
    if($request_data->action=="insert"){
        $data=array(":fname"=>$request_data->fname , ":lname"=>$request_data->lname);
        $query= "INSERT INTO username (fname,lname) VALUES(:fname,:lname)";
        $stmt = $conn->prepare($query);
        $stmt->execute($data);
        $output = array("message"=>"insert Complete");
        echo json_encode($output);
    }
    if($request_data->action=="getAll"){
        $query= "SELECT * FROM username";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $i=0;
        while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
            $i++;
            $data[]=$row;
        }
        
        echo json_encode($data);
    }
    if($request_data->action=="geteditUser"){
        $query= "SELECT * FROM username WHERE id = $request_data->id";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
            $data['id']=$row['id'];
            $data['fname']=$row['fname'];
            $data['lname']=$row['lname'];
        }
        echo json_encode($data);
    }
    if($request_data->action=="update"){
        $data=array(":fname"=>$request_data->fname , ":lname"=>$request_data->lname,":id"=>$request_data->id);
        $query= "UPDATE username SET fname=:fname , lname=:lname WHERE id=:id";
        $stmt = $conn->prepare($query);
        $stmt->execute($data);
        $output = array("message"=>"Update Complete");
        echo json_encode($output);
    }
    if($request_data->action=="getdeleteUser"){
        $query= "DELETE  FROM username WHERE id = $request_data->id";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $output = array("message"=>"Delete Complete");
        echo json_encode($output);
    }
?>