<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Booking page</title>
		<link rel="stylesheet" type="text/css" href="JSLibs/Bootstrap/css/bootstrap.min.css">
	</head>
	<body>
		<h1>Admin page</h1>
		
		<p>ID : ${ id }</p>
		<p>Name : ${ name }</p>
		<p>Email : ${ email }</p>
		<p>Family_Name : ${ family_name }</p>
		<p>Google Plus: ${ link }</p>
		<p>Photo : <img src=${ picture }></p>
		
		
		<script type="text/javascript" src="JSLibs/jquery.min.js"></script>
		<script type="text/javascript" src="JSLibs/Bootstrap/js/bootstrap.min.js"></script>
	</body>
</html>