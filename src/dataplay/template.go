package main

import (
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
)

type Page struct {
	Header template.HTML
	Navbar template.HTML
	Footer template.HTML
	Custom map[string]string
}

var h template.HTML // Header
var n template.HTML // Navbar
var f template.HTML // Footer

// Not actually sure if this function is used a great deal. Going though the application with
// a coverage util makes it seems like there is no code that calls it.
func ApplyTemplate(FileName string, Inject string, res http.ResponseWriter) {
	b, _ := ioutil.ReadFile(FileName)
	t := template.New("TPage") // Not sure why we have to name these, but we are basically forced to.
	t.Parse(string(b))
	t.Execute(res, Inject)
}

func RenderTemplate(fileName string, custom map[string]string, res http.ResponseWriter) {
	p := &Page{
		Header: h,
		Navbar: n,
		Footer: f,
		Custom: custom,
	}
	t, e := template.ParseFiles(fileName)
	if e != nil {
		fmt.Println("[template] ParseFile Error:", e)
		return
	}
	t.Execute(res, p)
}

// GoTemplates need to be compiled. We do this on start so we don't have to read them over and over,
// this does mean however that you need to restart the server when you make changes to the below templates
// * public/templates/header.html
// * public/templates/navbar.html
// * public/templates/footer.html
func initTemplates() {
	hf, _ := ioutil.ReadFile("public/templates/header.html")
	h = template.HTML(hf)
	nf, _ := ioutil.ReadFile("public/templates/navbar.html")
	n = template.HTML(nf)
	ff, _ := ioutil.ReadFile("public/templates/footer.html")
	f = template.HTML(ff)
}