const PDFDocument = require("pdfkit");

// PDF styles
const styles = {
  title: { size: 20, color: "#111827" },
  section: { size: 14, color: "#1f2937" },
  normal: { size: 11, color: "#374151" },
  muted: { size: 10, color: "#6b7280" },
};

// Draw section title with divider
function drawSectionTitle(doc, title) {
  if (doc.y > doc.page.height - 120) {
    doc.addPage();
  }

  doc
    .font("Helvetica-Bold")
    .fontSize(styles.section.size)
    .fillColor(styles.section.color)
    .text(title);

  doc.moveDown(0.3);

  doc
    .moveTo(50, doc.y)
    .lineTo(550, doc.y)
    .strokeColor("#e5e7eb")
    .stroke();

  doc.moveDown(0.8);
}

module.exports = function generateAssessmentPDF(assessment, res) {
  const doc = new PDFDocument({ margin: 50 });

  // Response headers
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=assessment-${assessment._id}.pdf`
  );

  doc.pipe(res);

  // Title
  doc
    .font("Helvetica-Bold")
    .fontSize(styles.title.size)
    .fillColor(styles.title.color)
    .text("Cyber Security Assessment Report", { align: "center" });

  doc.moveDown(0.5);

  doc
    .moveTo(50, doc.y)
    .lineTo(550, doc.y)
    .strokeColor("#e5e7eb")
    .stroke();

  doc.moveDown(1.5);

  // Risk level
  doc
    .font("Helvetica-Bold")
    .fontSize(15)
    .fillColor(assessment.summary.risk_color || "black")
    .text(`Risk Level: ${assessment.summary.risk_level}`, { align: "center" });

  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor(styles.muted.color)
    .text(`Grade: ${assessment.summary.grade}`, { align: "center" });

  doc.moveDown(2);

  // Overall summary
  drawSectionTitle(doc, "Overall Score Summary");

  doc
    .font("Helvetica")
    .fontSize(styles.normal.size)
    .fillColor(styles.normal.color);

  doc.text(`Total Score: ${assessment.summary.score}`);
  doc.text(`Total Questions: ${assessment.summary.total_questions}`);
  doc.text(`Maximum Possible Score: ${assessment.summary.max_possible_score}`);
  doc.text(`Percentage: ${assessment.summary.percentage}%`);

  doc.moveDown(1.5);

  // Category-wise performance
  drawSectionTitle(doc, "Category-wise Performance");

  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor(styles.normal.color)
    .text("Category | Grade | Risk | Percentage");

  doc.moveDown(0.5);

  assessment.category_scores.forEach((cat, index) => {
    if (doc.y > doc.page.height - 100) {
      doc.addPage();
    }

    doc
      .font("Helvetica")
      .fontSize(11)
      .fillColor(cat.color || "#111827")
      .text(
        `${index + 1}. ${cat.category_name} | ${cat.grade} | ${cat.risk} | ${cat.percentage}%`
      );

    doc.moveDown(0.3);
  });

  doc.moveDown(1.5);

  // Question & answer summary
  if (assessment.answers && assessment.answers.length > 0) {
    drawSectionTitle(doc, "Question & Answer Summary");

    assessment.answers.forEach((ans, index) => {
      if (doc.y > doc.page.height - 120) {
        doc.addPage();
      }

      doc
        .font("Helvetica-Bold")
        .fontSize(11)
        .fillColor("#111827")
        .text(`Q${index + 1}. ${ans.questionText || ans.question}`);

      doc.moveDown(0.2);

      doc
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .strokeColor("#e5e7eb")
        .stroke();

      doc.moveDown(0.4);

      doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor("#374151")
        .text(
          `Selected Answer: ${
            ans.selectedOption?.option_text || "Not Answered"
          }`
        );

      doc
        .fontSize(10)
        .fillColor(styles.muted.color)
        .text(`Points Awarded: ${ans.pointsAwarded}`);

      if (index !== assessment.answers.length - 1) {
        doc.moveDown(1);
      }
    });
  }

  // Footer (safe)
  if (doc.y < doc.page.height - 80) {
    const footerY = doc.page.height - 50;

    doc
      .fontSize(9)
      .fillColor(styles.muted.color)
      .text(
        `Generated on ${new Date().toLocaleString()} | CyberGuard Security System`,
        50,
        footerY,
        { align: "center", width: doc.page.width - 100 }
      );
  }

  doc.end();
};
