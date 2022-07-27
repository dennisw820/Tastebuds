<?php
    include "../PHP/config.php";

    $fName = mysqli_real_escape_string($conn, $_POST['fName']);
    $lName = mysqli_real_escape_string($conn, $_POST['lName']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $tel = mysqli_real_escape_string($conn, $_POST['tel']);
    $subj = mysqli_real_escape_string($conn, $_POST['contact-sub']);
    $msg = mysqli_real_escape_string($conn, $_POST['contact-msg']);

    $query = mysqli_query($conn, "INSERT INTO Contact (FirstName, LastName, Email, Tel, Subj, Msg) VALUES('$fName', '$lName', '$email', '$tel', '$subj', '$msg');");

    if($conn->query($query) === TRUE) {
        $To = $email;
        $From = 'rpi.alerts5@gmail.com';
        $Subj = $subj;
        $Msg = $msg;
        mail($To, $From, $Subj, $Msg);

        if(mail($To, $From, $Subj, $Msg)) {
            echo 'Message sent successfully!';
            header("Location: ../Restaurant/foodmenu.html");
        }
        else {
            die('Message could not be sent. Please try again.');
            header("Location: ../Restaurant/foodmenu.html/#contact");
        }
    }
    
    $conn->close();
?>