import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

const rootDir = process.cwd();
const assetsDir = path.join(rootDir, 'assets');
const primaryOutput = path.join(assetsDir, 'Our Product Catalog.pdf');
const fallbackOutput = path.join(assetsDir, 'catalog.pdf');

const logo = path.join(assetsDir, 'logo.jpg');
const hero = path.join(assetsDir, 'hero.jpg');
const product = path.join(assetsDir, 'Ashwagandha.jpg');
const certImages = [
  { file: path.join(assetsDir, 'FSSAI.png'), name: 'FSSAI' },
  { file: path.join(assetsDir, 'GST.png'), name: 'GST' },
  { file: path.join(assetsDir, 'ISO.jpg'), name: 'ISO' },
  { file: path.join(assetsDir, 'COA Available.jpg'), name: 'COA Available' },
];

function drawFallbackBox(doc, x, y, width, height, label) {
  doc.roundedRect(x, y, width, height, 10).fillAndStroke('#eef4ee', '#cbd8cf');
  doc.fillColor('#5b6475').font('Helvetica').fontSize(10).text(label, x + 10, y + 10, { width: width - 20 });
}

function safeImage(doc, filePath, x, y, options) {
  const width = options.width ?? options.fit?.[0] ?? 120;
  const height = options.height ?? options.fit?.[1] ?? 80;
  const label = path.basename(filePath).replace(/\.[^.]+$/, '');
  drawFallbackBox(doc, x, y, width, height, label);
}

function sectionTitle(doc, title, subtitle, y) {
  doc.fillColor('#1f3a5f').font('Helvetica-Bold').fontSize(18).text(title, 40, y);
  if (subtitle) {
    doc.fillColor('#5b6475').font('Helvetica').fontSize(10).text(subtitle, 40, y + 22, { width: 515 });
  }
}

fs.mkdirSync(assetsDir, { recursive: true });

const doc = new PDFDocument({ size: 'A4', margin: 40 });
const output = fs.createWriteStream(primaryOutput);
doc.pipe(output);

// Page 1: cover and product summary.
doc.rect(0, 0, doc.page.width, 130).fill('#1f3a5f');
doc.rect(0, 130, doc.page.width, 16).fill('#3a8d3b');

doc.roundedRect(40, 28, 130, 60, 14).fill('#ffffff').stroke('#ffffff');
doc.fillColor('#1f3a5f').font('Helvetica-Bold').fontSize(20).text('BLUVERA', 56, 45);
doc.fillColor('#3a8d3b').font('Helvetica').fontSize(10).text('EXPORTS', 57, 68);

doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(24).text('Our Product Catalog', 40, 170);
doc.font('Helvetica').fontSize(11).text('Bluvera Exports | Premium Ayurvedic raw materials exporter from India', 40, 204);
doc.text('Focused launch catalog featuring Ashwagandha and export-ready quality assets.', 40, 222, { width: 280 });

doc.roundedRect(40, 268, 250, 112, 18).fill('#f4f8f5').stroke('#d7e3d8');
doc.fillColor('#1f3a5f').font('Helvetica-Bold').fontSize(14).text('Featured Product', 56, 286);
doc.fillColor('#3a8d3b').fontSize(22).text('Ashwagandha', 56, 310);
doc.fillColor('#162033').font('Helvetica').fontSize(10).text('Root cuts or powder available', 56, 340);
doc.text('Batch specs, COA, export documents and bulk supply on request.', 56, 356, { width: 210 });

doc.roundedRect(310, 268, 240, 112, 18).fill('#ffffff').stroke('#d7e3d8');
doc.fillColor('#1f3a5f').font('Helvetica-Bold').fontSize(13).text('Quick Highlights', 326, 286);
doc.fillColor('#162033').font('Helvetica').fontSize(10);
doc.text('• Direct sourcing from farmers', 326, 312);
doc.text('• Strict quality control and testing', 326, 330);
doc.text('• Export documentation support', 326, 348);
doc.text('• Competitive bulk pricing', 326, 366);

safeImage(doc, hero, 350, 112, { fit: [170, 245] });
safeImage(doc, product, 40, 410, { fit: [240, 180] });

doc.roundedRect(300, 410, 250, 180, 18).fill('#f9fbf9').stroke('#d7e3d8');
doc.fillColor('#1f3a5f').font('Helvetica-Bold').fontSize(14).text('Product Details', 316, 428);
doc.fillColor('#162033').font('Helvetica').fontSize(10);
doc.text('Product: Ashwagandha', 316, 454);
doc.text('Forms: Root cuts / powder', 316, 470);
doc.text('Quality: COA available', 316, 486);
doc.text('Use cases: Pharma, nutraceutical, cosmetic, food', 316, 502, { width: 210 });
doc.text('Packaging: Bulk export packing', 316, 534);
doc.text('MOQ: On request', 316, 550);

// Page 2: certifications, markets, contact.
doc.addPage();
sectionTitle(doc, 'Certifications & Quality', 'Documents and compliance highlights included in the catalog.', 40);

const certPositions = [
  [40, 88],
  [305, 88],
  [40, 230],
  [305, 230],
];

certImages.forEach((cert, index) => {
  const [x, y] = certPositions[index];
  doc.roundedRect(x, y, 250, 122, 16).fill('#ffffff').stroke('#d7e3d8');
  safeImage(doc, cert.file, x + 12, y + 12, { fit: [90, 70] });
  doc.fillColor('#1f3a5f').font('Helvetica-Bold').fontSize(13).text(cert.name, x + 118, y + 18, { width: 110 });
  doc.fillColor('#5b6475').font('Helvetica').fontSize(9).text('Available in catalog', x + 118, y + 42, { width: 110 });
  doc.fillColor('#162033').fontSize(9).text('Included for buyer confidence and export readiness.', x + 118, y + 62, { width: 110 });
});

sectionTitle(doc, 'Export Markets', 'Serving buyers across major international regions.', 386);
const markets = ['UAE', 'USA', 'Germany', 'Southeast Asia'];
let marketX = 40;
markets.forEach((market) => {
  doc.roundedRect(marketX, 430, 110, 34, 17).fill('#eaf4ea').stroke('#cfded0');
  doc.fillColor('#3a8d3b').font('Helvetica-Bold').fontSize(11).text(market, marketX, 441, { width: 110, align: 'center' });
  marketX += 122;
});

doc.roundedRect(40, 490, 515, 110, 18).fill('#1f3a5f').stroke('#1f3a5f');
doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(14).text('Contact', 58, 510);
doc.font('Helvetica').fontSize(10);
doc.text('Bluvera Exports', 58, 536);
doc.text('SF-208, 2nd Floor, D Block, Greenaly Signature, Bengaluru, Karnataka - 560076', 58, 552, { width: 470 });
doc.text('WhatsApp: +91 97395 41463', 58, 570);
doc.text('Email: bluveraexports@gmail.com', 58, 586);

doc.end();

output.on('finish', () => {
  fs.copyFileSync(primaryOutput, fallbackOutput);
  console.log(`Catalog PDF saved to ${primaryOutput}`);
  console.log(`Duplicate PDF saved to ${fallbackOutput}`);
});
