"use client";

import { trackMetaEvent, trackMetaCustomEvent } from "@/src/lib/metaPixel";

export default function FloatingWhatsapp() {
  const numero = "55SEUNUMEROAQUI";

  const clicarWhatsapp = () => {
    trackMetaEvent("Contact", {
      content_name: "whatsapp_floating_button",
    });

    trackMetaCustomEvent("WhatsappClick");
  };

  return (
    <a
      href={`https://wa.me/${numero}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      onClick={clicarWhatsapp}
      style={{
        position: "fixed",
        right: "18px",
        bottom: "18px",
        width: "54px",
        height: "54px",
        borderRadius: "9999px",
        backgroundColor: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
        zIndex: 9999,
        textDecoration: "none",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="30"
        height="30"
        fill="white"
        style={{
          width: "30px",
          height: "30px",
          display: "block",
          flexShrink: 0,
        }}
      >
        <path d="M19.11 17.21c-.27-.14-1.57-.77-1.81-.86-.24-.09-.42-.14-.6.14-.18.27-.69.86-.85 1.04-.16.18-.31.2-.58.07-.27-.14-1.12-.41-2.13-1.31-.79-.7-1.32-1.56-1.48-1.83-.16-.27-.02-.41.12-.54.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.14-.6-1.45-.82-1.98-.22-.53-.44-.46-.6-.47h-.51c-.18 0-.47.07-.72.34-.25.27-.94.92-.94 2.24 0 1.32.96 2.59 1.09 2.77.14.18 1.88 2.88 4.56 4.03.64.28 1.15.44 1.54.56.65.21 1.24.18 1.71.11.52-.08 1.57-.64 1.79-1.26.22-.62.22-1.15.16-1.26-.07-.11-.24-.18-.51-.32Z" />
        <path d="M16.03 3.2c-7.01 0-12.7 5.67-12.7 12.67 0 2.24.59 4.43 1.71 6.35L3.2 28.8l6.76-1.77a12.77 12.77 0 0 0 6.07 1.55h.01c7 0 12.69-5.68 12.69-12.68 0-3.39-1.32-6.57-3.72-8.96A12.58 12.58 0 0 0 16.03 3.2Zm0 23.18h-.01a10.6 10.6 0 0 1-5.39-1.48l-.39-.23-4.01 1.05 1.07-3.91-.26-.4a10.55 10.55 0 0 1-1.62-5.63c0-5.84 4.76-10.59 10.61-10.59 2.83 0 5.49 1.1 7.49 3.1a10.5 10.5 0 0 1 3.1 7.49c0 5.85-4.76 10.6-10.59 10.6Z" />
      </svg>
    </a>
  );
}