index.html: $(wildcard *.adoc) $(wildcard assets/*) jandot.css $(wildcard svelte-components/src/*)
	cd svelte-components ; npm run build ; cd .. ; asciidoctor -r asciidoctor-multipage -b multipage_html5 --out-file index.html index.adoc

datavis.pdf: $(wildcard *.adoc) $(wildcard assets/*)
	asciidoctor-pdf --out-file datavis.pdf index.adoc

push: $(wildcard _*.html) index.html jandot.css
	make index.html ; git add . ; git commit -a -m "Incremental" ; git push

clean:
	rm -f _*.html
	rm -f datavis.pdf
	rm -f index.html
