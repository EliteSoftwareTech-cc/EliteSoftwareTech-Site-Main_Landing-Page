/**
 * Cloudflare Pages Function: /api/contact
 * Sends Direct Liaison messages via Resend (elitesoftwaretech.cc verified DKIM/SPF)
 * to support@elitesoftwaretech.cc.
 *
 * Required Cloudflare Pages secret (Environment Variable):
 *   RESEND_API_KEY
 */
export async function onRequestPost(context) {
    const { request, env } = context;

    const jsonHeaders = {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
    };

    try {
        const body = await request.json();
        const name = String(body.operator || "").trim().slice(0, 120);
        const replyEmail = String(body.relay || "").trim().slice(0, 180);
        const priority = String(body.priority || "routine").trim().toUpperCase();
        const message = String(body.content || "").trim().slice(0, 5000);

        if (!name || !replyEmail || !message) {
            return new Response(JSON.stringify({
                ok: false,
                error: "Name, reply email, and message are required."
            }), { status: 400, headers: jsonHeaders });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(replyEmail)) {
            return new Response(JSON.stringify({
                ok: false,
                error: "Please provide a valid email address."
            }), { status: 400, headers: jsonHeaders });
        }

        if (!env.RESEND_API_KEY) {
            return new Response(JSON.stringify({
                ok: false,
                code: "NOT_CONFIGURED",
                error: "Email relay secret (RESEND_API_KEY) is not configured on Cloudflare Pages yet."
            }), { status: 501, headers: jsonHeaders });
        }

        const fromAddress = env.CONTACT_FROM_EMAIL || "EliteSoftware Liaison <noreply@elitesoftwaretech.cc>";
        const toAddress = env.CONTACT_TO_EMAIL || "support@elitesoftwaretech.cc";

        const resendResp = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${env.RESEND_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: fromAddress,
                to: [toAddress],
                reply_to: replyEmail,
                subject: `[${priority}] EliteSoftwareTech.cc Liaison from ${name}`,
                text: [
                    `Operator: ${name}`,
                    `Reply-To: ${replyEmail}`,
                    `Priority: ${priority}`,
                    `Timestamp: ${new Date().toISOString()}`,
                    "",
                    "Message:",
                    message
                ].join("\n")
            })
        });

        const resendData = await resendResp.json().catch(() => ({}));
        if (!resendResp.ok) {
            return new Response(JSON.stringify({
                ok: false,
                error: resendData.message || "Upstream mail provider rejected the request."
            }), { status: 502, headers: jsonHeaders });
        }

        return new Response(JSON.stringify({
            ok: true,
            id: resendData.id || null
        }), { status: 200, headers: jsonHeaders });
    } catch (err) {
        return new Response(JSON.stringify({
            ok: false,
            error: "Malformed request payload."
        }), { status: 400, headers: jsonHeaders });
    }
}
