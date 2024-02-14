import qr from "qrcode";
import qrcodeTerminal from "qrcode-terminal";
import fs from "fs";
import path from "path";

const GenerateQRcode = async (req, res) => {
  const { link } = req.body;

  if (!link) {
    return res
      .status(400)
      .json({ status: 400, error: "Link is required to generate QR code!" });
  }

  try {
    const qrImage = await qr.toDataURL(link);
    console.log("QR Code:");

    // Display the qr code in the terminal
    qrcodeTerminal.generate(link, { small: true });

    // Save QR code image to uploads directory
    const currentDir = process.cwd();  // getting current directory
    const uploadsDir = path.join(currentDir, "uploads"); // searching if uploads directory found
    // if directory "uploads" don't exist then it will create the directory
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    // Generate filename with date and time prefix
    const dateTimePrefix = new Date().toISOString().replace(/[:.]/g, "-");
    const qrImageFilename = `qrCode_${dateTimePrefix}.png`;

    const qrImagePath = path.join(uploadsDir, qrImageFilename);
    const qrImageBuffer = Buffer.from(qrImage.split(",")[1], "base64");
    fs.writeFileSync(qrImagePath, qrImageBuffer);

    // Construct response with QR image and link
    const response = {
      message: "QR code generated",
      qrImage: qrImagePath,
      link: link
    };

    res.status(200).json(response);
  } catch (err) {
    console.error("Error generating QR code:", err);
    res.status(500).json({ status: 500, error: "Internal server error" });
  }
};

export { GenerateQRcode };
