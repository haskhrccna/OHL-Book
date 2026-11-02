# OHL-Book

Unofficial interactive study notes for *Overhead Power Lines* (Kiessling, Nefzger, Nolasco, Kaintzyk; Springer, 2003). All 17 chapters have a summary, charts and calculators where the material allows, a study guide and a quiz. Quiz progress is saved in the browser.

These are personal study notes, not a substitute for the book, and they are not affiliated with its authors or publisher. Check calculator results against the book and the applicable standards before using them for real design work.

## Build

Requires Python 3 and Node.js (Node checks the JavaScript syntax).

```sh
python3 build.py
```

This writes the site to `dist/index.html`. Open that file in a browser to view it.

## Deploy

Every push to `main` runs `.github/workflows/deploy-pages.yml`, which builds the site and publishes `dist/` to GitHub Pages. You can also start it by hand from the Actions tab.

## Test

```sh
uv run -q --with playwright python test.py        # all chapters
uv run -q --with playwright python test.py 3 7    # chosen chapters
```

## Layout

- `src/engine.js`: chapter engine, quiz, and chart and calculator helpers
- `src/shell.html`, `src/shell.css`: page frame and styles
- `src/chNN.js`, `src/chNN.html`: content for each chapter
- `build.py`: joins everything into one page
- `test.py`: browser test at desktop and phone widths
- `pg.py`: finds which page of a chapter PDF contains a pattern; set `OHL_CHAPTERS_DIR` to the folder of chapter PDFs
