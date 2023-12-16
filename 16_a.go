package main

import (
	"fmt"
	"log"
	"os"
	"strings"
)

func main() {
	b, err := os.ReadFile("16.txt")
	if err != nil {
		log.Fatal(err)
	}

	input := string(b)
	arr := [][]string{}

	lines := strings.Split(input, "\n")
	for _, line := range lines {
		row := []string{}
		values := strings.Split(line, "")
		for _, value := range values {
			row = append(row, value)
		}
		arr = append(arr, row)
	}

	// direction, i, j, cache
	cache := make(map[string]bool)
	ans := make(map[string]bool)
	findPaths(arr, "L", 0, 0, cache, ans)
	//	for key, value := range cache {
	//		log.Println("KEY :: ", key, " VALUE :: ", value)
	//	}
	log.Println("CACHE :: ", len(ans))
}

func findPaths(arr [][]string, dir string, i, j int, cache, ans map[string]bool) {
	if cache[fmt.Sprintf("%d-%d-%s", i, j, dir)] {
		return
	}

	cache[fmt.Sprintf("%d-%d-%s", i, j, dir)] = true
	ans[fmt.Sprintf("%d-%d", i, j)] = true

	nextDir := findNextDir(arr[i][j], dir)

	for _, nDir := range nextDir {
		x, y := moves(i, j, nDir)

		if x >= len(arr) || x < 0 {
			return
		}
		if y >= len(arr[0]) || y < 0 {
			return
		}

		findPaths(arr, nDir, x, y, cache, ans)
	}

	return
}

func findNextDir(curr string, dir string) []string {
	points := map[string]map[string][]string{
		".": {
			"R": []string{"R"},
			"L": []string{"L"},
			"U": []string{"U"},
			"D": []string{"D"},
		},
		"|": {
			"R": []string{"U", "D"},
			"L": []string{"U", "D"},
			"U": []string{"U"},
			"D": []string{"D"},
		},
		"-": {
			"R": []string{"R"},
			"L": []string{"L"},
			"U": []string{"R", "L"},
			"D": []string{"R", "L"},
		},
		"/": {
			"R": []string{"U"},
			"L": []string{"D"},
			"U": []string{"R"},
			"D": []string{"L"},
		},
		"\\": {
			"R": []string{"D"},
			"L": []string{"U"},
			"U": []string{"L"},
			"D": []string{"R"},
		},
	}

	return points[curr][dir]
}

func moves(i, j int, dir string) (int, int) {
	if dir == "R" {
		return i, j - 1
	} else if dir == "L" {
		return i, j + 1
	} else if dir == "U" {
		return i + 1, j
	} else if dir == "D" {
		return i - 1, j
	} else {
		return -1, -1
	}
}
