<?php
    include '../PHP/config.php';
    
    //Get username
    $username = $_POST['username'];

    //Check if user exist & mail reset link
    $query = mysqli_query($conn, "SELECT Email FROM Users WHERE Email = '$username';");
    if(mysqli_fetch_assoc($query) === 1) {
        echo 'We have sent you instructions to reset your password to your email.';

        $To = $username;
        $From = 'rpi.alerts5@gmail.com';
        $Subj = 'Noreply@tastebuds.com: Password Reset';
        $Msg = 'You are receiving this email because you have requested a password change. Click the <a href="../PHP/passwd-reset.php">link</a> and follow the prompt to reset your password. If you did not make this request, please ignore this email.';
        mail($To, $From, $Subj, $Msg);
    }
    else{
        die('User does not exist.');
    }

    //Get updated password
    $passwd = $_POST['passwd1'];
    $passwd2 = $_POST['passwd2'];

    $query = mysqli_query($conn, "UPDATE Users SET Passwd = '$passwd' AND Passwd2 = '$passwd2' WHERE Email = '$username';");
    
    if($query) {
        while ($query->fetch_row() === 1) {

            echo 'Password updated successfully!';
            header('Location: ../HTML/foodmenu.html');
            $To = $username;
            $From = 'rpi.alerts5@gmail.com';
            $Subj = 'Noreply@tastebuds.com: Password Reset Successful!';
            $Msg = 'Your password was sucessfully updated. Thank you!';
            mail($To, $From, $Subj, $Msg);
        }
    }
    else {
        die('Failed to update password. Please try again.');
    }
    mysqli_close($conn);
?>