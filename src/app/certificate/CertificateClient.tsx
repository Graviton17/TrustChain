"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./certificate.module.css";

export default function CertificateClient() {
  const searchParams = useSearchParams();
  const companyName = searchParams.get("companyName") || "[Company Name]";
  const logoUrl = searchParams.get("logoUrl") || "/icon.png";
  const certId =
    searchParams.get("id") ||
    Math.random().toString(36).slice(2, 10).toUpperCase();
  const issuedOn = searchParams.get("date") || new Date().toLocaleDateString();

  // Print only the certificate area by cloning the node and inlining computed styles
  function handlePrint() {
    if (typeof window === "undefined") return;
    const el = document.getElementById("certificate");
    if (!el) return window.print();

    // deep clone the element
    const cloned = el.cloneNode(true) as HTMLElement;

    // recursively copy computed styles onto cloned nodes to preserve appearance
    function copyStyles(source: Element, target: Element) {
      const computed = window.getComputedStyle(source as Element);
      let cssText = "";
      for (let i = 0; i < computed.length; i++) {
        const prop = computed.item(i);
        const val = computed.getPropertyValue(prop);
        cssText += `${prop}:${val};`;
      }
      (target as HTMLElement).style.cssText = cssText;

      // copy for children
      const srcChildren = Array.from(source.children || []);
      const tgtChildren = Array.from(target.children || []);
      for (let i = 0; i < srcChildren.length; i++) {
        copyStyles(srcChildren[i], tgtChildren[i]);
      }
    }

    copyStyles(el, cloned);

    // create a new window and write only the cloned certificate
    const printWindow = window.open("", "_blank", "width=900,height=1120");
    if (!printWindow) return window.print();

    printWindow.document.open();
    printWindow.document.write(
      `<!doctype html><html><head><meta charset="utf-8"><title>Certificate</title></head><body></body></html>`
    );
    // append cloned node to body
    printWindow.document.body.appendChild(cloned);

    // wait for images to load before printing
    const imgs = printWindow.document.images;
    let loaded = 0;
    if (imgs.length === 0) {
      printWindow.focus();
      printWindow.print();
      // keep the window open for user's download choice
    } else {
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].onload = imgs[i].onerror = () => {
          loaded++;
          if (loaded >= imgs.length) {
            printWindow.focus();
            printWindow.print();
          }
        };
      }
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.actions + " no-print"}>
        <button onClick={handlePrint} className={styles.btn}>
          Print / Download
        </button>
        <Link href="/" className={styles.btn + " " + styles.back}>
          Back to site
        </Link>
      </div>

      <div className={styles.certificateContainer} id="certificate">
        <div className={styles.headerRow}>
          <div className={styles.brand}>
            <Image
              src="/icon.png"
              alt="TrustChain"
              className={styles.trustLogo}
              width={48}
              height={48}
            />
            <div>
              <div className={styles.trustName}>TrustChain</div>
              <div className={styles.trustTag}>
                Transparent Subsidy Disbursement for Green Hydrogen
              </div>
            </div>
          </div>
          <div className={styles.certId}>
            Certificate ID: <strong>{certId}</strong>
          </div>
        </div>

        <div className={styles.certBox}>
          <div className={styles.stamp} aria-hidden>
            <svg
              width="120"
              height="120"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#0aa46c"
                strokeWidth="4"
                fill="rgba(10,164,108,0.03)"
              />
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="8"
                fill="#0aa46c"
                fontWeight={700}
              >
                GOVERNMENT
              </text>
              <text
                x="50%"
                y="62%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="6"
                fill="#0aa46c"
              >
                OFFICIAL SEAL
              </text>
            </svg>
          </div>

          <div className={styles.certInner}>
            <h1 className={styles.title}>Certificate of Completion</h1>
            <p className={styles.lead}>This is to certify that</p>

            <div className={styles.companyWrap}>
              <div className={styles.companyName}>{companyName}</div>
            </div>

            <p className={styles.descr}>
              has successfully completed the TrustChain verification and subsidy
              application process and is hereby awarded this certificate
              recognizing their compliance and contribution to the Green
              Hydrogen subsidy program.
            </p>

            <div className={styles.bottomRow}>
              <div className={styles.logoBlock}>
                <Image
                  src={logoUrl}
                  alt="Company Logo"
                  className={styles.companyLogo}
                  width={140}
                  height={80}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/icon.png";
                  }}
                />
                <div className={styles.logoLabel}>Company Logo</div>
              </div>

              <div className={styles.authBlock}>
                <div className={styles.authTitle}>Authorized by</div>
                <div className={styles.authOrg}>
                  Ministry of Renewable Energy
                </div>
                <div className={styles.signature}>
                  <div className={styles.signLine}></div>
                  <div className={styles.signName}>
                    Director, Government Grants
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.issued}>Issued on {issuedOn}</div>
          </div>
        </div>

        <div className={styles.footer}>
          © {new Date().getFullYear()} Government of Example — All rights
          reserved
        </div>
      </div>
    </div>
  );
}
