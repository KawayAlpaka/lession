package singlenumber

import (
	"testing"
)

type Case struct {
	nums   []int
	expect int
}

var cases = []Case{
	Case{[]int{1, 1, 2, 2, 3}, 3},
	Case{[]int{1, 2, 2, 3, 3}, 1},
	Case{[]int{1, 1, 2, 3, 3}, 2}}

func TestSinglenumber(t *testing.T) {
	for i, c := range cases {
		result := singleNumber2(c.nums)
		if result != c.expect {
			t.Errorf("Error singleNumber：index=%d,result=%v,expect=%v", i, result, c.expect)
		}
	}
}
