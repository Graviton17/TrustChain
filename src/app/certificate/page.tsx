import React, { Suspense } from "react";
import CertificateLoader from "./CertificateLoader";

export default function Page() {
	return (
		<Suspense fallback={<div style={{ padding: 24 }}>Loading certificate...</div>}>
			<CertificateLoader />
		</Suspense>
	);
}
