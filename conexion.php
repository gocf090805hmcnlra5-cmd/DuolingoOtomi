<?php

// Iniciar sesión solamente si todavía no está iniciada
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Datos de conexión
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "duotomi_fernando";

// Crear conexión
$conn = new mysqli(
    $servername,
    $username,
    $password,
    $dbname
);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Configurar caracteres
$conn->set_charset("utf8mb4");

?>