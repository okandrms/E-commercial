<?php
require 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'];
$surname = $data['surname'];
$email = $data['email'];
$password = $data['password'];

if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid email format']);
    exit;
}

if (strlen($password) < 8 || !preg_match('/[a-zA-Z]/', $password)) {
    http_response_code(400);
    echo json_encode(['message' => 'Password must be at least 8 characters long and contain letters']);
    exit;
}

$hashed_password = password_hash($password, PASSWORD_BCRYPT);

$sql = "INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $name, $surname, $email, $hashed_password);

if ($stmt->execute()) {
    http_response_code(200);
    echo json_encode(['message' => 'User created successfully']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Error creating user']);
}

$stmt->close();
$conn->close();
?>
