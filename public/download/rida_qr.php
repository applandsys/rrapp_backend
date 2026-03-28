<?php
// rida_qr.php - QR Code Generator for RIDA App
// File location: C:\rrapp_backend\public\rida_qr.php

$apk_url = "https://trvnx.com/download/app-release.apk";
$app_package = "com.rida.app";
$admin_receiver = "com.rida.app/.RIDAAdminReceiver";

// Generate unique device ID for tracking
$device_id = "RIDA-" . strtoupper(uniqid());
$timestamp = time();

// Create QR data payload
$qr_data = json_encode([
    'action' => 'install',
    'app_url' => $apk_url,
    'package' => $app_package,
    'device_id' => $device_id,
    'timestamp' => $timestamp
]);

// QR code URL using Google Charts API
$qr_url = "https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=" . urlencode($qr_data);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RIDA - Device Provisioning QR Code</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #ff5722 0%, #ff8c00 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 550px;
            width: 100%;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 { color: #ff5722; margin-bottom: 10px; }
        .qr-box {
            background: white;
            padding: 20px;
            margin: 20px 0;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .qr-box img { width: 250px; height: 250px; }
        .device-id {
            background: #f5f5f5;
            padding: 10px;
            border-radius: 8px;
            font-family: monospace;
            font-size: 12px;
            margin: 10px 0;
        }
        .steps {
            text-align: left;
            background: #e3f2fd;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
        .steps h3 { margin-bottom: 10px; color: #ff5722; }
        .steps ol { padding-left: 20px; }
        .steps li { margin: 8px 0; }
        .cmd {
            background: #1e1e1e;
            color: #0f0;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            font-size: 12px;
            margin: 10px 0;
            word-break: break-all;
        }
        button {
            background: #ff5722;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            margin: 5px;
        }
        button:hover { background: #e64a19; }
        @media print {
            .no-print { display: none; }
            .container { box-shadow: none; padding: 20px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔒 RIDA Device Setup</h1>
        <p>Scan QR code to provision this device</p>

        <div class="qr-box">
            <img id="qrImage" src="<?php echo $qr_url; ?>" alt="QR Code">
        </div>

        <div class="device-id">
            <strong>Device ID:</strong> <?php echo $device_id; ?>
        </div>

        <div class="steps">
            <h3>📱 Setup Instructions:</h3>
            <ol>
                <li><strong>Scan this QR code</strong> with your phone</li>
                <li>Download and install RIDA app</li>
                <li>Enable USB Debugging on phone</li>
                <li>Connect phone to computer</li>
                <li>Run the ADB command below</li>
                <li>Open RIDA app and enable Device Admin</li>
            </ol>

            <p><strong>📋 ADB Command (copy and run):</strong></p>
            <div class="cmd" id="adbCommand">adb shell dpm set-device-owner <?php echo $app_package; ?>/<?php echo $admin_receiver; ?></div>
            <button onclick="copyCommand()">📋 Copy Command</button>
        </div>

        <div class="no-print">
            <button onclick="window.print()">🖨️ Print QR Code</button>
            <button onclick="location.reload()">🔄 New Device</button>
        </div>
    </div>

    <script>
        function copyCommand() {
            const command = document.getElementById('adbCommand').innerText;
            navigator.clipboard.writeText(command);
            alert('✅ Command copied to clipboard!');
        }
    </script>
</body>
</html>