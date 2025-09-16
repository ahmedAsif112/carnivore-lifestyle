"use client";
import { useEffect } from "react";

export default function ReferralTracker() {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const ref = urlParams.get("ref");

        if (ref) {
            localStorage.setItem("referrer", ref);
            console.log("✅ Referrer captured:", ref);
        }
    }, []);

    return null; // ye component UI me kuch show nahi karega
}
