package main

import "testing"

func TestMain(t *testing.T) {
	go func() {
		main()
	}()
}