package containsduplicate

import (
	"testing"
)

type Case struct {
	nums   []int
	expect bool
}

var cases = []Case{
	Case{[]int{1, 2, 3, 4, 5, 6, 7}, false},
	Case{[]int{1}, false},
	Case{[]int{1, 2, 3, 4, 5, 6, 7}, false},
	Case{[]int{1, 2, 3}, false},
	Case{[]int{1, 2, 3, 3}, true},
	Case{[]int{1, 2, 3, 2}, true},
	Case{[]int{1, 1, 1, 2}, true}}

func TestContainsDuplicate(t *testing.T) {
	for i, c := range cases {
		result := containsDuplicate(c.nums)
		if result != c.expect {
			t.Errorf("Error ContainsDuplicate：index=%d,result=%v,expect=%v", i, result, c.expect)
		}
	}
}
