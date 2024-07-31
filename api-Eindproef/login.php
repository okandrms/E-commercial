<?php
require 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];
$password = $data['password'];

$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(401);
    echo json_encode(['message' => 'Invalid email or password']);
    exit;
}

$user = $result->fetch_assoc();

if (password_verify($password, $user['password'])) {
    http_response_code(200);
    echo json_encode(['message' => 'Login successful', 'data' => $user]);
} else {
    http_response_code(401);
    echo json_encode(['message' => 'Invalid email or password']);
}

$stmt->close();
$conn->close();
?>
