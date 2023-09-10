'use client'
import React, { useRef } from 'react';
import QRCode from 'qrcode.react';
import ReactToPdf from 'react-to-pdf';
import jsPDF from 'jspdf';
import './recept.css';

const Page = () => {
    const name = 'John Doe';
    const email = 'johndoe@example.com';
    const successSlogan = 'Thank you for your purchase!';
    const qrCodeData = `${name}\n${email}\n${successSlogan}`;
    const componentRef = useRef(null);

    const handleDownloadPDF = () => {
        // Create a PDF document with the componentRef content
        const pdf = new jsPDF({
            orientation: 'portrait', // or 'landscape'
            unit: 'mm',
            format: 'a4',
        });
        
        pdf.html(componentRef.current, {
            callback: function () {
                pdf.save('receipt.pdf'); // Trigger the download
            },
        });
    };

    return (
        <>
            <div className="recept" ref={componentRef}>
                <div className="name"><center><b>NRI GRUOP OF INSTITUTION ( BHOPAL )</b></center></div>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <div className="qr">
                    <QRCode className='canvas' width={70} height={70} value={qrCodeData} />
                </div>
            </div>
            <div>
                <button onClick={handleDownloadPDF}>Download PDF</button>
            </div>
        </>
    );
};

export default Page;
