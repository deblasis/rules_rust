// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
var sidebarScrollbox = document.querySelector("#sidebar .sidebar-scrollbox");
sidebarScrollbox.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="index.html">Introduction</a></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded "><a href="rules.html"><strong aria-hidden="true">1.</strong> Rules</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="rust.html"><strong aria-hidden="true">1.1.</strong> rust</a></li><li class="chapter-item expanded "><a href="rust_doc.html"><strong aria-hidden="true">1.2.</strong> rustdoc</a></li><li class="chapter-item expanded "><a href="rust_clippy.html"><strong aria-hidden="true">1.3.</strong> clippy</a></li><li class="chapter-item expanded "><a href="rust_fmt.html"><strong aria-hidden="true">1.4.</strong> rustfmt</a></li><li class="chapter-item expanded "><a href="rust_proto.html"><strong aria-hidden="true">1.5.</strong> proto</a></li><li class="chapter-item expanded "><a href="rust_bindgen.html"><strong aria-hidden="true">1.6.</strong> bindgen</a></li><li class="chapter-item expanded "><a href="rust_wasm_bindgen.html"><strong aria-hidden="true">1.7.</strong> wasm_bindgen</a></li><li class="chapter-item expanded "><a href="cargo.html"><strong aria-hidden="true">1.8.</strong> cargo</a></li><li class="chapter-item expanded "><a href="rust_analyzer.html"><strong aria-hidden="true">1.9.</strong> rust_analyzer</a></li><li class="chapter-item expanded "><a href="flatten.html"><strong aria-hidden="true">1.10.</strong> all symbols</a></li></ol></li><li class="chapter-item expanded "><a href="external_crates.html"><strong aria-hidden="true">2.</strong> External Crates</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="crate_universe_bzlmod.html"><strong aria-hidden="true">2.1.</strong> crate_universe (bzlmod)</a></li><li class="chapter-item expanded "><a href="crate_universe.html"><strong aria-hidden="true">2.2.</strong> crate_universe (WORKSPACE)</a></li></ol></li><li class="chapter-item expanded "><a href="upstream_tooling.html"><strong aria-hidden="true">3.</strong> Upstream Tooling</a></li></ol>';
(function() {
    let current_page = document.location.href.toString();
    if (current_page.endsWith("/")) {
        current_page += "index.html";
    }
    var links = sidebarScrollbox.querySelectorAll("a");
    var l = links.length;
    for (var i = 0; i < l; ++i) {
        var link = links[i];
        var href = link.getAttribute("href");
        if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
            link.href = path_to_root + href;
        }
        // The "index" page is supposed to alias the first chapter in the book.
        if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
            link.classList.add("active");
            var parent = link.parentElement;
            while (parent) {
                if (parent.tagName === "LI" && parent.previousElementSibling) {
                    if (parent.previousElementSibling.classList.contains("chapter-item")) {
                        parent.previousElementSibling.classList.add("expanded");
                    }
                }
                parent = parent.parentElement;
            }
        }
    }
})();

// Track and set sidebar scroll position
sidebarScrollbox.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        sessionStorage.setItem('sidebar-scroll', sidebarScrollbox.scrollTop);
    }
}, { passive: true });
var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
sessionStorage.removeItem('sidebar-scroll');
if (sidebarScrollTop) {
    // preserve sidebar scroll position when navigating via links within sidebar
    sidebarScrollbox.scrollTop = sidebarScrollTop;
} else {
    // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
    var activeSection = document.querySelector('#sidebar .active');
    if (activeSection) {
        activeSection.scrollIntoView({ block: 'center' });
    }
}