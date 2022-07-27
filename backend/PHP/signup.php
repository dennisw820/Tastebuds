<?php
    include '../PHP/config.php';
    
    //Get data
    $username = $_POST['username'];
    $email = $_POST['email'];
    $passwd = $_POST['passwd'];
    $passwd2 = $_POST['passwd2'];
    $acknowledgement = $_POST['acknw'];

    $query = mysqli_query($conn, "INSERT INTO Users('UserName', 'Email', 'Passwd', 'Passwd2', 'Acknowledgement') VALUES('$username', '$email', '$passwd', '$passwd2', '$acknowledgement');");

    if ($query) {
        echo 'Registration succesful!';
        header('Locaiton: ../HTML/signin.html');
    }
    else{
        die('Registration failed. Please try again.');
    }
    mysqli_close($conn);
?>