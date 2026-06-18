const HIBP_API_KEY = process.env.NEXT_PUBLIC_HIBP_API_KEY;

export async function checkEmailBreaches(email: string) {
  try {
    const response = await fetch(
      `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}`,
      {
        headers: {
          "hibp-api-key": HIBP_API_KEY || "",
          "user-agent": "SecurityPortfolioApp",
        },
      }
    );

    if (response.status === 404) return { breached: false, count: 0 };
    if (!response.ok) throw new Error("API request failed");

    const data = await response.json();
    return { breached: true, count: data.length, breaches: data };
  } catch (error) {
    console.error("HIBP API error:", error);
    return { breached: false, count: 0, error: "Unable to check" };
  }
}

export function estimatePasswordStrength(password: string): {
  score: number;
  feedback: string[];
  crackTime: string;
  label: string;
  color: string;
} {
  let score = 0;
  const feedback: string[] = [];

  if (password.length === 0) {
    return { score: 0, feedback: [], crackTime: "N/A", label: "Enter password", color: "bg-gray-500" };
  }

  if (password.length < 8) feedback.push("Use at least 8 characters");
  if (password.length < 12) feedback.push("Consider using 12+ characters");
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push("Add uppercase letters");
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push("Add lowercase letters");
  if (/[0-9]/.test(password)) score += 1;
  else feedback.push("Add numbers");
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  else feedback.push("Add special characters");

  if (/(.)\1{2,}/.test(password)) feedback.push("Avoid repeating characters");
  if (/^[a-zA-Z]+$/.test(password)) feedback.push("Mix letters with numbers");
  if (/^(123|abc|password|qwerty)/i.test(password)) feedback.push("Avoid common patterns");

  const labels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
  const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-lime-500", "bg-green-500"];
  const crackTimes = ["Instant", "Minutes", "Hours", "Days", "Years"];

  const normalizedScore = Math.min(Math.floor(score / 1.5), 4);

  return {
    score: normalizedScore,
    feedback,
    crackTime: crackTimes[normalizedScore],
    label: labels[normalizedScore],
    color: colors[normalizedScore],
  };
}
