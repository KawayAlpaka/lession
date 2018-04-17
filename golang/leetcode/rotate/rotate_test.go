package rotate

import (
	"testing"

	"../mcommon"
)

type Case struct {
	nums   []int
	k      int
	expect []int
}

var cases = []Case{
	Case{[]int{1, 2, 3, 4, 5, 6, 7}, 3, []int{5, 6, 7, 1, 2, 3, 4}},
	Case{[]int{1}, 0, []int{1}},
	Case{[]int{1, 2, 3, 4, 5, 6, 7}, 4, []int{4, 5, 6, 7, 1, 2, 3}},
	Case{[]int{1, 2, 3}, 0, []int{1, 2, 3}}}

func TestRotate(t *testing.T) {
	for i, c := range cases {
		rotate(c.nums, c.k)
		if !mcommon.IsEqual(c.nums, c.expect) {
			t.Errorf("Error TestRotate：index=%d,result=%v,expect=%v", i, c.nums, c.expect)
		}
	}
}
