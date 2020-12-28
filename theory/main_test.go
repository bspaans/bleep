package theory_test

import (
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
)

const (
	C3  = 48
	Db4 = 61
)

func tearup() {
}

func teardown() {
}

func TestMain(m *testing.M) {
	tearup()
	code := m.Run()
	teardown()
	os.Exit(code)
}

func noErrAsDefault(e assert.ErrorAssertionFunc) assert.ErrorAssertionFunc {
	if e == nil {
		return assert.NoError
	}

	return e
}
