package main

import (
	. "github.com/smartystreets/goconvey/convey"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestAddObservationHttp(t *testing.T) {
	req, _ := http.NewRequest("POST", "/", nil)
	req.Header.Set("X-API-SESSION", "00TK6wuwwj1DmVDtn8mmveDMVYKxAJKLVdghTynDXBd62wDqGUGlAmEykcnaaO66")
	res := httptest.NewRecorder()
	Convey("Should add observation", t, func() {
		params := map[string]string{}
		params["vid"] = "188"
		params["uid"] = "1"
		params["comment"] = "test comment"
		params["x"] = "xxxxxx"
		params["y"] = "yyyyyy"
		result := AddObservationHttp(res, req, params)
		So(result, ShouldEqual, "692")
	})
}

func TestGetObservationsQ(t *testing.T) {
	Convey("Should get observations", t, func() {
		params := map[string]string{}
		params["vid"] = "0"
		result := GetObservationsQ(params)
		So(result, ShouldEqual, "Observations could not be retrieved")
	})
}

func TestGetObservationsHttp(t *testing.T) {
	req, _ := http.NewRequest("GET", "/", nil)
	req.Header.Set("X-API-SESSION", "00TK6wuwwj1DmVDtn8mmveDMVYKxAJKLVdghTynDXBd62wDqGUGlAmEykcnaaO66")
	res := httptest.NewRecorder()
	Convey("Should get observations", t, func() {
		params := map[string]string{}
		params["vid"] = "11"
		result := GetObservationsHttp(res, req, params)
		So(result, ShouldNotBeBlank)
	})
}
