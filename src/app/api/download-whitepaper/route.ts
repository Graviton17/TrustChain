import PDFDocument from "pdfkit";

export async function GET() {
  try {
    const doc = new PDFDocument({ margin: 50 });

    const chunks: Buffer[] = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    const done = new Promise<Buffer>((resolve) =>
      doc.on("end", () => resolve(Buffer.concat(chunks)))
    );

    // ✅ Explicitly set font to avoid Helvetica.afm error
    doc.font("Times-Roman").fontSize(26).text("TrustChain Whitepaper", { align: "center" });
    doc.moveDown();
    doc
      .font("Times-Roman")
      .fontSize(14)
      .text("Transparent Subsidy Disbursement for Green Hydrogen", {
        align: "center",
      });
    doc.moveDown(4);
    doc
      .font("Times-Roman")
      .fontSize(12)
      .text(
        "This is a dynamically generated TrustChain whitepaper. It contains user guidelines, subsidy information, and compliance terms."
      );

    doc.end();

    const pdfBuffer = await done;

    // ✅ Convert Buffer → Uint8Array
    return new Response(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=TrustChain-Whitepaper.pdf",
      },
    });
  } catch (err) {
    console.error("PDF generation failed:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}