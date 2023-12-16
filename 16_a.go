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
	cache := make(map[string]int)
	findPaths(arr, "L", 0, 0, cache)
	log.Println("CACHE :: ", len(cache))
}

func findPaths(arr [][]string, dir string, i, j int, cache map[string]int) {
	if i >= len(arr) || i < 0 {
		return
	}
	if j >= len(arr[0]) || j < 0 {
		return
	}

	if cache[fmt.Sprintf("%d-%d", i, j)] == 2000 {
		return
	}

	cache[fmt.Sprintf("%d-%d", i, j)]++

	//	log.Println("i :: ", i, " j ::", j, " dir::", dir, " cache::", cache)

	switch dir {
	case "L":
		switch arr[i][j] {
		case ".":
			findPaths(arr, dir, i, j+1, cache)
		case "-":
			findPaths(arr, dir, i, j+1, cache)
		case "\\":
			findPaths(arr, "U", i+1, j, cache)
		case "/":
			findPaths(arr, "D", i-1, j, cache)
		case "|":
			findPaths(arr, "D", i-1, j, cache)
			findPaths(arr, "U", i+1, j, cache)
		}
	case "R":
		switch arr[i][j] {
		case ".":
			findPaths(arr, dir, i, j-1, cache)
		case "-":
			findPaths(arr, dir, i, j-1, cache)
		case "\\":
			findPaths(arr, "D", i-1, j, cache)
		case "/":
			findPaths(arr, "U", i+1, j, cache)
		case "|":
			findPaths(arr, "D", i-1, j, cache)
			findPaths(arr, "U", i+1, j, cache)
		}
	case "D":
		switch arr[i][j] {
		case ".":
			findPaths(arr, dir, i-1, j, cache)
		case "|":
			findPaths(arr, dir, i-1, j, cache)
		case "\\":
			findPaths(arr, "R", i, j-1, cache)
		case "/":
			findPaths(arr, "L", i, j+1, cache)
		case "-":
			findPaths(arr, "R", i, j-1, cache)
			findPaths(arr, "L", i, j+1, cache)
		}
	case "U":
		switch arr[i][j] {
		case ".":
			findPaths(arr, dir, i+1, j, cache)
		case "|":
			findPaths(arr, dir, i+1, j, cache)
		case "\\":
			findPaths(arr, "L", i, j+1, cache)
		case "/":
			findPaths(arr, "R", i, j-1, cache)
		case "-":
			findPaths(arr, "L", i, j+1, cache)
			findPaths(arr, "R", i, j-1, cache)
		}
	}
}
