<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if(!isset($_POST)) die();

session_start();

$response = [];

$con = mysqli_connect('localhost', 'root', '', 'propertymanagement');

if($con->connect_error) {
    die("Connect failed: %s\n(" . $con->connect_errno . ")" . $con->connect_error);
}

$username = $con->real_escape_string($_POST['username']);
$password = $con->real_escape_string($_POST['password']);

$query = "SELECT * FROM `user` WHERE userName='$username' AND userPass='$password'";

$result = $con->query($query);

if(mysqli_num_rows($result) > 0) {
	$response['status'] = 'loggedin';
	$response['user'] = 'admin';
	$response['useruniqueid'] = md5(uniqid());
	$_SESSION['useruniqueid'] = $response['useruniqueid'];
} else {
	$response['status'] = 'error';
}

echo json_encode($response);

$con->close();