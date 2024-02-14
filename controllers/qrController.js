import qr from "qrcode";
import qrcodeTerminal from "qrcode-terminal";

const GenerateQRcode = async (req, res) => {
    // static link
    const link = "https://github.com/muhammad-hamza-liaqat";

    if (!link) {
        return res.status(400).json({ status: 400, error: "Link is required to generate QR code!" });
    }

    try {
        // Generate QR code
        const qrImage = await qr.toDataURL(link);

        // display the qr code in the terminal as well
        qrcodeTerminal.generate(link, { small: true });
        // format, how the Qr code will be presented in the browser
        const htmlResponse = `
            <html>
            <head>
                <title>QR Code</title>
                <style>
                    body {
                        background-color: #2874A6; 
                        display: flex;
                        justify-content: center; 
                        align-items: center; 
                        height: 100vh; 
                        margin: 0; 
                    }
                    .qr-code-container {
                        text-align: center; 
                        border-radius: 35px; 
                        padding: 20px; 
                        background-color: #fff; 
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                    }
                    .qr-code-container img {
                        border-radius: 10; 
                    }
                </style>
            </head>
            <body>
                <div class="qr-code-container">
                    <h1>QR Code</h1>
                    <img src="${qrImage}" alt="QR Code">
                </div>
            </body>
            </html>
        `;
        res.status(200).send(htmlResponse);
    } catch (err) {
        console.error("Error generating QR code:", err);
        res.status(500).json({ status: 500, error: "Internal server error" });
    }
};

export { GenerateQRcode };
