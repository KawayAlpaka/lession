package intersect

import (
	"fmt"
	"testing"

	"../mcommon"
)

type Case struct {
	nums1  []int
	nums2  []int
	expect []int
}

var cases = []Case{
	Case{[]int{1, 1, 2, 2, 3}, []int{1, 1, 2, 2, 3}, []int{1, 1, 2, 2, 3}},
	Case{[]int{1, 2, 2, 1}, []int{2, 2}, []int{2, 2}},
	Case{[]int{1, 1, 2, 3, 3}, []int{2, 2}, []int{2}},
	Case{[]int{2, 1}, []int{1, 1}, []int{1}},
	Case{[]int{2, 1}, []int{1, 2}, []int{2, 1}},
	Case{[]int{1, 2, 3}, []int{1, 2, 3, 4}, []int{1, 2, 3}}}

func TestIntersect(t *testing.T) {
	for i, c := range cases {
		fmt.Println(i)
		result := intersect(c.nums1, c.nums2)
		if !mcommon.IsEqual(result, c.expect) {
			t.Errorf("Error intersect :index=%d,result=%v,expect=%v", i, result, c.expect)
		}
	}
}
