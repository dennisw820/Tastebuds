<?php
    include '../PHP/config.php';
    $search = $_POST['search'];

    $query = mysqli_query($conn, "SELECT product FROM Menu LIKE $search;");
    if (strlen($search) > 0) {
        if ($query->num_rows > 0) {
            while ($row = $query->fetch_assoc) {
                echo'<table>
                    <tr>
                        <td>
                            <div>
                                <img src="">
                                <h1>$row['product'];</h1>
                                <p>$row['description'];</p>
                                <button>Add to cart</button>
                            </div>
                        </td>
                    </tr>
                </table>';
            }
        }
        else {
            echo '0 results.';
        }
    }
    else {
        echo 'Please enter item to search for.';
    }
    mysqli_close($conn);
?>