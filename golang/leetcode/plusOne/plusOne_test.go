package plusone

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
	Case{[]int{4, 3, 2, 1}, []int{4, 3, 2, 2}},
	Case{[]int{9, 9, 9, 9}, []int{1, 0, 0, 0, 0}},
	Case{[]int{9, 9, 1, 9}, []int{9, 9, 2, 0}},
	Case{[]int{7, 2, 8, 5, 0, 9, 1, 2, 9, 5, 3, 6, 6, 7, 3, 2, 8, 4, 3, 7, 9, 5, 7, 7, 4, 7, 4, 9, 4, 7, 0, 1, 1, 1, 7, 4, 0, 0, 6}, []int{7, 2, 8, 5, 0, 9, 1, 2, 9, 5, 3, 6, 6, 7, 3, 2, 8, 4, 3, 7, 9, 5, 7, 7, 4, 7, 4, 9, 4, 7, 0, 1, 1, 1, 7, 4, 0, 0, 7}},
}

func TestPlusOne(t *testing.T) {
	for i, c := range cases {
		fmt.Println(i)
		result := plusOne(c.nums1)
		if !mcommon.IsEqual(result, c.expect) {
			t.Errorf("Error intersect :index=%d,result=%v,expect=%v", i, result, c.expect)
		}
	}
}
