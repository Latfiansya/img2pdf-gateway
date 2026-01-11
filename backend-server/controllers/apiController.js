const { ApiKey } = require("../models");
// UUID module
const { v4: uuidv4 } = require("uuid");
// File system module
const fs = require("fs");
const PDFDocument = require("pdfkit");
// Image processing module
const sharp = require("sharp");
const path = require("path");


exports.generateKey = async (req, res) => {
    // Cek apakah user sudah memiliki API key
    const exist = await ApiKey.findOne({ where: { UserId: req.user.id } });
    // Jika sudah ada, generate ulang key
    if (exist) {
        exist.publicKey = uuidv4();
        exist.privateKey = uuidv4();
        await exist.save();
        return res.json(exist);
    }

    const key = await ApiKey.create({
        publicKey: uuidv4(),
        privateKey: uuidv4(),
        UserId: req.user.id,
        isActive: true
    });

    res.json(key);
};

// Fungsi helper untuk mengkapitalisasi setiap kata (digunakan oleh convertPdf)
function capitalizeWords(str) {
    return str.replace(/\b\w/g, l => l.toUpperCase());
}

exports.convertPdf = async (req, res) => {
    if (!req.files || req.files.length === 0)
        return res.status(400).json({ message: "No image uploaded" });

    const files = req.files;
    const layout = req.body.layout || "single";
    const useCover = req.body.useCover === "true";

    const hasMeta = useCover && req.body.title && req.body.author;
    const title = hasMeta ? capitalizeWords(req.body.title) : null;
    const author = hasMeta ? capitalizeWords(req.body.author) : null;

    const PAGE = 800;
    const MARGIN = 20;
    const HEADER = hasMeta ? 30 : 0;

    const doc = new PDFDocument({
        autoFirstPage: false,
        size: [PAGE, PAGE],
        margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN }
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=report.pdf");
    doc.pipe(res);

    // ===== COVER PAGE =====
    if (hasMeta) {
        doc.addPage();
        const textWidth = PAGE - MARGIN * 2;
        const startY = PAGE / 2 - 80;

        doc.fontSize(26).text(title, MARGIN, startY, { width: textWidth, align: "center" });
        doc.moveDown(1.5);
        doc.fontSize(14).text("Oleh:", { width: textWidth, align: "center" });
        doc.text(author, { width: textWidth, align: "center" });
        doc.moveDown();
        doc.text(`Tanggal: ${new Date().toLocaleDateString("id-ID")}`, { width: textWidth, align: "center" });
    }

    const contentWidth = PAGE - MARGIN * 2;
    const contentHeight = PAGE - MARGIN * 2 - HEADER;

    let index = 0;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const compressedPath = path.join("uploads", "cmp-" + file.filename + ".jpg");

        // ===== KOMPRESI GAMBAR =====
        await sharp(file.path)
        .resize({ width: 1000 })
        .jpeg({ quality: 45 })
        .toFile(compressedPath);

        if (layout === "single" || files.length === 1 || index % 4 === 0) {
        doc.addPage();
        if (hasMeta) doc.fontSize(10).text(`${title} - ${author}`, MARGIN, MARGIN - 5);
        index = 0;
        }

        if (layout === "single" || files.length === 1) {
        doc.image(compressedPath, MARGIN, MARGIN + HEADER, {
            fit: [contentWidth, contentHeight],
            align: "center",
            valign: "center"
        });
        } else {
        const cellW = contentWidth / 2;
        const cellH = contentHeight / 2;
        const x = MARGIN + (index % 2) * cellW;
        const y = MARGIN + HEADER + Math.floor(index / 2) * cellH;

        doc.image(compressedPath, x, y, {
            fit: [cellW - 10, cellH - 10],
            align: "center",
            valign: "center"
        });
        }

        fs.unlinkSync(file.path);
        fs.unlinkSync(compressedPath);
        index++;
    }

    doc.end();
};



