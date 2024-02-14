import inquirer from 'inquirer';
import qr from "qrcode";
import fs from "fs";




const GenerateQRcode = async(req,res)=>{
    res.end("hello from qr code");
}

export {GenerateQRcode}