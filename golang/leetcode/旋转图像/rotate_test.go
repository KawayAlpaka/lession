package rotate

import (
	"testing"

	"../mcommon"
)

type Case struct {
	input  [][]int
	expect [][]int
}

var cases = []Case{
	Case{[][]int{
		[]int{1, 2, 3},
		[]int{4, 5, 6},
		[]int{7, 8, 9},
	},
		[][]int{
			[]int{7, 4, 1},
			[]int{8, 5, 2},
			[]int{9, 6, 3},
		},
	},
	Case{[][]int{
		[]int{1, 2, 3, 4},
		[]int{5, 6, 7, 8},
		[]int{9, 10, 11, 12},
		[]int{13, 14, 15, 16},
	},
		[][]int{
			[]int{13, 9, 5, 1},
			[]int{14, 10, 6, 2},
			[]int{15, 11, 7, 3},
			[]int{16, 12, 8, 4},
		},
	}}

func TestRotate(t *testing.T) {
	for i, c := range cases {
		rotate(c.input)
		if !mcommon.Is2Equal(c.input, c.expect) {
			t.Errorf("Error Rotate :index=%d,result=%v,expect=%v", i, c.input, c.expect)
		}
	}
}

