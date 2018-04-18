package movezeroes

import (
	"fmt"
	"testing"

	"../mcommon"
)

type Case struct {
	nums1  []int
	expect []int
}

var cases = []Case{
	Case{[]int{0, 1, 0, 3, 12}, []int{1, 3, 12, 0, 0}},
	Case{[]int{1, 3, 0, 0}, []int{1, 3, 0, 0}},
	Case{[]int{3, 0, 5, 0}, []int{3, 5, 0, 0}},
	Case{[]int{0, 0, 0, 0}, []int{0, 0, 0, 0}},
	Case{[]int{0, 0, 0, 1}, []int{1, 0, 0, 0}},
	Case{[]int{0, 0, 1, 0}, []int{1, 0, 0, 0}},
}

func TestMoveZeroes(t *testing.T) {
	for i, c := range cases {
		fmt.Println(i)
		moveZeroes(c.nums1)
		if !mcommon.IsEqual(c.nums1, c.expect) {
			t.Errorf("Error intersect :index=%d,result=%v,expect=%v", i, c.nums1, c.expect)
		}
	}
}
