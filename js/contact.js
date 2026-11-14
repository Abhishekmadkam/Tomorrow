
/* =====================================================
   TOMORROW — MEMBERSHIP ENQUIRY EMAIL INTEGRATION
   Destination: abhishekmadkam01@gmail.com
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("membership-enquiry");

    if (!form) return;

    const submitButton = document.getElementById("membership-submit");
    const statusMessage = document.getElementById("form-status");

    const emailEndpoint =
        "https://formsubmit.co/ajax/abhishekmadkam01@gmail.com";

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        if (!form.reportValidity()) return;

        const originalButtonText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = "Sending Enquiry...";

        statusMessage.textContent = "Please wait while we send your enquiry.";
        statusMessage.style.color = "inherit";

        const formData = new FormData(form);

        const data = Object.fromEntries(formData.entries());

        data._subject = "New Tomorrow Membership Enquiry";
        data._template = "table";
        data._url = window.location.href;

        try {

            const response = await fetch(emailEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok || result.success === "false" || result.success === false) {
                throw new Error(
                    result.message || "Unable to send your enquiry."
                );
            }

            statusMessage.textContent =
                "Thank you! Your membership enquiry has been sent successfully. Our team will contact you soon.";

            statusMessage.style.color = "#397B62";

            form.reset();

        } catch (error) {

            console.error("Membership enquiry error:", error);

            statusMessage.textContent =
                "We couldn't send your enquiry right now. Please try again or contact us directly.";

            statusMessage.style.color = "#B42318";

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;

        }

    });

});
