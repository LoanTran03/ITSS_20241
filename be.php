<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dtb";
$dbname = "user_database";

$conn = new mysqli($servername, $username, $password, $dbname);
// Connect to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to process user registration
function registerUser($email, $password, $language) {
    global $conn;

    // Check if email is already registered
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        return translate("Email đã được đăng ký", $language);
    }

    // Validate password
    if (strlen($password) < 6) {
        return translate("Mật khẩu phải có ít nhất 6 ký tự", $language);
    }

    // Store user information
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $sql = "INSERT INTO users (email, password) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $email, $hashed_password);
    if ($stmt->execute()) {
        sendVerificationEmail($email);
        return translate("Đăng ký thành công. Vui lòng kiểm tra email để xác minh tài khoản.", $language);
    } else {
        return translate("Đăng ký thất bại. Vui lòng thử lại.", $language);
    }
}

// Function to send verification email
function sendVerificationEmail($email) {
    // Implementation for sending email
}

// Function to handle login requests
function loginUser($email, $password, $remember, $language) {
    global $conn;

    // Check email and password
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 0) {
        return translate("Email không tồn tại", $language);
    }

    $user = $result->fetch_assoc();
    if (!password_verify($password, $user['password'])) {
        return translate("Mật khẩu không chính xác", $language);
    }

    // Handle "remember password"
    if ($remember) {
        setcookie("user", $email, time() + (86400 * 30), "/"); // 30 days
    }

    return translate("Đăng nhập thành công", $language);
}

// Function to translate messages
function translate($message, $language) {
    $translations = [
        "Email đã được đăng ký" => ["ja" => "メールはすでに登録されています"],
        "Mật khẩu phải có ít nhất 6 ký tự" => ["ja" => "パスワードは6文字以上である必要があります"],
        "Đăng ký thành công. Vui lòng kiểm tra email để xác minh tài khoản." => ["ja" => "登録に成功しました。アカウントを確認するためにメールを確認してください。"],
        "Đăng ký thất bại. Vui lòng thử lại." => ["ja" => "登録に失敗しました。もう一度やり直してください。"],
        "Email không tồn tại" => ["ja" => "メールが存在しません"],
        "Mật khẩu không chính xác" => ["ja" => "パスワードが正しくありません"],
        "Đăng nhập thành công" => ["ja" => "ログイン成功"]
    ];

    return $translations[$message][$language] ?? $message;
}

// Example usage
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $action = $_POST['action'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $language = $_POST['language'] ?? 'vi';
    $remember = isset($_POST['remember']) ? true : false;

    if ($action == 'register') {
        echo registerUser($email, $password, $language);
    } elseif ($action == 'login') {
        echo loginUser($email, $password, $remember, $language);
    }
}
?>