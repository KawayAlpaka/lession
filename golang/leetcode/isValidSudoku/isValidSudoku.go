package isvalidsudoku

func isValidSudoku(board [][]byte) bool {
	//判断一整行中是否有相同的数字
	for i := 0; i < 9; i++ {
		m := make(map[byte]int)
		for j := 0; j < 9; j++ {
			if board[i][j] != ([]byte("."))[0] {
				if m[board[i][j]] > 0 {
					return false
				}
				m[board[i][j]]++
			}
		}
	}
	//判断一整列中是否有相同的数字
	for i := 0; i < 9; i++ {
		m := make(map[byte]int)
		for j := 0; j < 9; j++ {
			if board[j][i] != ([]byte("."))[0] {
				if m[board[j][i]] > 0 {
					return false
				}
				m[board[j][i]]++
			}
		}
	}

	//判断9个3X3区块中是否有重复
	ia := []int{0, 3, 6}
	ja := []int{0, 3, 6}
	for _, initi := range ia {
		for _, initj := range ja {
			m := make(map[byte]int)
			for i := initi; i < initi+3; i++ {
				for j := initj; j < initj+3; j++ {
					if board[i][j] != '.' {
						if m[board[i][j]] > 0 {
							return false
						}
						m[board[i][j]]++
					}
				}
			}
		}
	}
	return true
}
