#!/usr/bin/env python3
"""Content-preservation audit for the RBSoft redesign.

Extracts the visible text of index.html (plus image alt attributes, which
carry the logo wording) and verifies that every line of the verbatim original
capture (docs/original-content.txt) is present, unchanged.
Exit code 0 = 100 % of the original copy preserved.
"""
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKIP_TAGS = {"script", "style", "head"}
BLOCK_TAGS = {"p", "h1", "h2", "h3", "li", "br", "div", "section", "article", "header", "footer", "nav", "ul"}


class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts = []
        self.skip = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in SKIP_TAGS or a.get("aria-hidden") == "true":
            self.skip.append(tag)
        if "alt" in a and a["alt"]:
            self.parts.append(" " + a["alt"] + " ")
        if tag in BLOCK_TAGS:
            self.parts.append("\n")

    def handle_endtag(self, tag):
        if self.skip and self.skip[-1] == tag:
            self.skip.pop()
        if tag in BLOCK_TAGS:
            self.parts.append("\n")

    def handle_data(self, data):
        if not self.skip:
            self.parts.append(data)


def norm(s: str) -> str:
    return re.sub(r"\s+", " ", s).strip()


def main() -> int:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    ex = TextExtractor()
    ex.feed(html)
    page = norm("".join(ex.parts))

    raw = (ROOT / "docs" / "original-content.txt").read_text(encoding="utf-8")
    failures = []
    checked = 0
    for line in raw.splitlines():
        line = line.strip()
        if not line or line.startswith(("[", "RBSoft (", "Captured", "This file", "----------", "assets/img", "(see")):
            continue
        checked += 1
        if norm(line) not in page:
            failures.append(line)

    print(f"checked strings : {checked}")
    print(f"preserved       : {checked - len(failures)}")
    print(f"missing/changed : {len(failures)}")
    for f in failures:
        print("  MISSING:", f)
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
