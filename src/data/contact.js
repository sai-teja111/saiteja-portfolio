const WHATSAPP_COUNTRY_CODE = "91";

/**
 * Pre-filled chat message shown in the WhatsApp chat box.
 * It is only pre-filled, never sent automatically: the visitor reviews it and
 * presses WhatsApp's own Send button.
 */
export const WHATSAPP_DEFAULT_MESSAGE =
  "Hello Saiteja, I found your portfolio and would like to connect with you.";

export const contact = {
  email: "saiteja6111@gmail.com",
  phone: "9866060229",
  whatsapp: "9866060229",
  github: "https://github.com/sai-teja111",
  linkedin: "https://www.linkedin.com/in/saitejadev/",
};

/** Strips spaces, plus signs, hyphens, brackets and every other non-digit character. */
function toDigits(value = "") {
  return String(value).replace(/\D/g, "");
}

/**
 * Builds a wa.me click-to-chat URL for a phone number.
 * Only digits are kept from the number, and the country code is added only
 * when the number does not already start with it, so "+91 98660 60229" and
 * "9866060229" both resolve to the same chat URL.
 * The message is URL-encoded and pre-filled in the chat; nothing is sent
 * automatically, the visitor presses Send in WhatsApp.
 */
export function getWhatsAppUrl(
  number = contact.whatsapp,
  countryCode = WHATSAPP_COUNTRY_CODE,
  message = WHATSAPP_DEFAULT_MESSAGE,
) {
  const dialCode = toDigits(countryCode);
  const digits = toDigits(number);
  const hasCountryCode = digits.length > 10 && digits.startsWith(dialCode);
  const fullNumber = hasCountryCode ? digits : dialCode + digits;
  const chatUrl = "https://wa.me/" + fullNumber;
  const text = String(message).trim();

  if (!text) {
    return chatUrl;
  }

  return chatUrl + "?text=" + encodeURIComponent(text);
}

export const whatsappUrl = getWhatsAppUrl();

export default contact;
