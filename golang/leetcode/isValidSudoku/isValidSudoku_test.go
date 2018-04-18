package isvalidsudoku

import (
	"fmt"
	"testing"
)

type Case struct {
	input  [][]byte
	expect bool
}

var cases = []Case{
	Case{[][]byte{
		[]byte("53..7...."),
		[]byte("6..195..."),
		[]byte(".98....6."),
		[]byte("8...6...3"),
		[]byte("4..8.3..1"),
		[]byte("7...2...6"),
		[]byte(".6....28."),
		[]byte("...419..5"),
		[]byte("....8..79"),
	}, true},
	//第1行有重复
	Case{[][]byte{
		[]byte("53..7...7"),
		[]byte("6..195..."),
		[]byte(".98....6."),
		[]byte("8...6...3"),
		[]byte("4..8.3..1"),
		[]byte("7...2...6"),
		[]byte(".6....28."),
		[]byte("...419..5"),
		[]byte("....8..79"),
	}, false},
	//第9行有重复
	Case{[][]byte{
		[]byte("53..7...."),
		[]byte("6..195..."),
		[]byte(".98....6."),
		[]byte("8...6...3"),
		[]byte("4..8.3..1"),
		[]byte("7...2...6"),
		[]byte(".6....28."),
		[]byte("...419..5"),
		[]byte("9...8..79"),
	}, false},
	//第1列有重复
	Case{[][]byte{
		[]byte("53..7...."),
		[]byte("6..195..."),
		[]byte(".98....6."),
		[]byte("8...6...3"),
		[]byte("4..8.3..1"),
		[]byte("7...2...6"),
		[]byte(".6....28."),
		[]byte("...419..5"),
		[]byte("4...8..79"),
	}, false},
	//第一个3x3中有重复
	Case{[][]byte{
		[]byte("53..7...."),
		[]byte("6.8195..."),
		[]byte(".98....6."),
		[]byte("8...6...3"),
		[]byte("4..8.3..1"),
		[]byte("7...2...6"),
		[]byte(".6....28."),
		[]byte("...419..5"),
		[]byte("....8..79"),
	}, false},
}

func TestIsValidSudoku(t *testing.T) {
	for i, c := range cases {
		fmt.Println(i)
		result := isValidSudoku(c.input)
		if result != c.expect {
			t.Errorf("Error intersect :index=%d,result=%v,expect=%v", i, result, c.expect)
		}
	}
}
