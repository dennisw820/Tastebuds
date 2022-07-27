<?php
   include '../PHP/config.php';

    $user_name = filter_var($_POST["username"], FILTER_SANITIZE_STRING);
    $user_passwd = filter_var($_POST["password"], FILTER_SANITIZE_STRING);

    $query = $conn->query("SELECT UserName OR Email AND Passwd FROM users WHERE UserName = '$user_name' OR Email = '$user_name' AND Passwd = '$passwd';");


    if($query->num_rows === 1) {
        session_register("user_name");
        $_SESSION['login_user'] = $user_name;

        header("Location: ../HTML/welcome.html");
    }
    else {
        die('Error: Incorrect Username or Password. Please check the login credentials and try again.');
    }
    $conn->close();
?>