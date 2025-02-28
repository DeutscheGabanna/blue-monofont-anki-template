// This script deduplicates Anki tags.
// For example:
// RAW ANKI TAGS: tech::linux::arch tech::linux::bash
// WHAT IS SHOWN ON THE CARD: tech linux arch bash
// Notice that tech & linux tags aren't shown twice.

(function() {
    // Select the <em> element inside <footer> that contains the tags
    let element = document.querySelector("footer em");
    if (element && !element.dataset.processed) {
        // Get and trim the inner text from the element
        let tagText = element.innerText.trim();
        if (!tagText) return;

        // Split the raw tag string on whitespace, then split each tag by "::"
        let tagArray = tagText.split(/\s+/);
        let allParts = tagArray.flatMap(tag => tag.split("::"));

        // Remove duplicates while preserving the order
        let discreteParts = [];
        allParts.forEach(part => {
            if (!discreteParts.includes(part)) {
                discreteParts.push(part);
            }
        });

        // Update the element's innerText with the discrete values
        element.innerText = discreteParts.join(" ");
        element.dataset.processed = "true"; // Prevent multiple executions
    }
})();
