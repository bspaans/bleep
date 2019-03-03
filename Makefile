
.PHONY: go-test run record

go-test:
	go test -v ./...

run:
	go run main.go

record:
	go run main.go --record
