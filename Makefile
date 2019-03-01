
.PHONY: go-test run
go-test:
	go test -v ./...

run:
	go run main.go
